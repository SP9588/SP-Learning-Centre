import 'dotenv/config';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Google GenAI
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({});
  } catch (err) {
    console.warn('Gemini client init warning:', err);
  }
}

// AI Tutor endpoint
app.post('/api/ai-tutor', async (req, res) => {
  try {
    const { tutorType, message, history = [], language = 'en' } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    let systemInstruction = '';
    const langNote = language === 'hi'
      ? 'The user prefers responses in Hindi (Devanagari script or Hinglish where technical terms apply) along with clear English context.'
      : 'Respond in clear, encouraging English with Hindi translations where helpful.';

    if (tutorType === 'english') {
      systemInstruction = `You are the expert English Tutor at "SP SOLUTIONS" (English, Computer & Hindi Bollywood Vocal Learning Centre, located in Baloda, Chhattisgarh & Online).
Your goal is to help students learn English grammar, build vocabulary, improve sentence construction, practice spoken conversation, and develop personality & interview skills.
Always give clear explanations, point out corrections politely, provide examples, and suggest a 1-sentence practice drill.
${langNote}`;
    } else if (tutorType === 'computer') {
      systemInstruction = `You are the expert Computer & Technology Tutor at "SP SOLUTIONS" (Baloda, Chhattisgarh & Online).
Your subjects include: Basic Computer (Windows, Office, Word, Excel, PowerPoint), DCA & ADCA certificates, Typing techniques, Programming (Python, C, C++, JavaScript, TypeScript), Web Development (HTML, CSS, JS, Tailwind), Relational Databases & SQL, and AI / Prompt Engineering / No-code tools.
Provide concise, practical explanations, step-by-step code snippets with clear comments, and beginner-friendly advice.
${langNote}`;
    } else if (tutorType === 'singing') {
      systemInstruction = `You are the Hindi Bollywood Vocal & Singing Practice Assistant at "SP SOLUTIONS" (Baloda, Chhattisgarh & Online).
Focus strictly on Hindi Bollywood songs, film songs, romantic melodies, devotional bhajans, and vocal technique (pitch awareness, breath support, rhythm/taal, riyaz routines, microphone technique, stage confidence).
IMPORTANT COMPLIANCE RULE: Classical singing is strictly excluded from this offering.
IMPORTANT LEGAL RULE: Do not reproduce entire copyrighted song lyrics or sheet music. Mention brief reference phrases for practice only.
IMPORTANT DISCLAIMER: Always remind the student that your feedback is an educational practice aid and not a professional certification.
${langNote}`;
    } else {
      systemInstruction = `You are the student advisor and learning assistant at SP SOLUTIONS Learning Centre. Guide the student regarding courses, practice, and admissions. ${langNote}`;
    }

    if (aiClient) {
      try {
        // Format prompt with recent history
        const formattedPrompt = history.length > 0
          ? `Conversation history:\n${history.map((h: { role: string; text: string }) => `${h.role}: ${h.text}`).join('\n')}\n\nStudent: ${message}`
          : message;

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: formattedPrompt,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });

        const replyText = response.text || 'Thank you for your question! Keep practicing daily.';
        return res.json({ reply: replyText });
      } catch (geminiError: any) {
        console.error('Gemini API Error:', geminiError?.message || geminiError);
        // Fall back to rule-based contextual reply
      }
    }

    // Fallback educational response if API key is not yet set or during offline/preview
    let fallbackReply = '';
    const lower = message.toLowerCase();

    if (tutorType === 'english') {
      if (lower.includes('grammar') || lower.includes('tense')) {
        fallbackReply = `English Grammar Tip from SP SOLUTIONS: Remember the rule for Present Perfect (Subject + has/have + V3). Example: "I have completed my assignment." Try writing a sentence using "has worked" or "have learned" below!`;
      } else if (lower.includes('vocab') || lower.includes('word')) {
        fallbackReply = `Vocabulary Booster: "Eloquent" (/ˈeləkwənt/) means fluent or persuasive in speaking or writing. Hindi: सुवक्ता / प्रभावोत्पादक. Practice using "eloquent" in a sentence!`;
      } else {
        fallbackReply = `Welcome to the SP SOLUTIONS English Tutor! You asked: "${message}". Practice tip: Read this aloud 3 times with steady pace. At SP SOLUTIONS Baloda & Online, we emphasize daily conversation practice!`;
      }
    } else if (tutorType === 'computer') {
      if (lower.includes('python') || lower.includes('loop')) {
        fallbackReply = `Computer & Coding Tip: In Python, you can iterate over a sequence easily: \n\`\`\`python\nfor item in ['HTML', 'Python', 'SQL']:\n    print(f"Learning {item} at SP SOLUTIONS")\n\`\`\`\nTry writing this in your practice editor!`;
      } else {
        fallbackReply = `SP SOLUTIONS Technology Lab: You asked about "${message}". In our DCA/ADCA and Web Development modules, we focus on hands-on practicals. Let us know if you need help with Windows, Office, or Coding!`;
      }
    } else {
      fallbackReply = `SP SOLUTIONS Singing Assistant: For Hindi Bollywood singing, proper breath support (belly breathing / diaphragm) is key before vocalizing. Practice doing 'Sa - Pa' sustained tone for 10 seconds. Note: Classical singing is excluded; we focus on Bollywood melody, expression, and mic technique!`;
    }

    return res.json({ reply: fallbackReply });
  } catch (error: any) {
    console.error('Server error in /api/ai-tutor:', error);
    res.status(500).json({ error: 'Internal server error processing learning prompt' });
  }
});

// App configuration and health
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    name: 'SP SOLUTIONS SaaS Platform',
    version: '1.0.0',
    location: 'Village Baloda, Hasuwa, House No. 359, Chhattisgarh',
    contact: '9279120271',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Setup Vite in Dev or Static files in Prod
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SP SOLUTIONS Platform server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
