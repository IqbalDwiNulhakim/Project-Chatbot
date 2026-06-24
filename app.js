require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ── Home page ──────────────────────────────────────────────
app.get("/", (req, res) => {
  res.render("index", { title: "AI Chatbot" });
});

// ── Chat endpoint (support multiple providers) ────────────
app.post("/api/chat", async (req, res) => {
  const { messages, provider } = req.body;
  // messages: [{ role: 'user'|'assistant'|'system', content: '...' }]

  try {
    let reply = "";

    // ── GEMINI ──────────────────────────────────────────────
    if (provider === "gemini") {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("GEMINI_API_KEY tidak diset di .env");

      const contents = messages
        .filter((m) => m.role !== "system")
        .map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        }));

      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents,
            generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
          }),
        },
      );

      if (!geminiRes.ok) {
        const err = await geminiRes.json();
        throw new Error(err.error?.message || "Gemini API error");
      }

      const data = await geminiRes.json();
      reply =
        data.candidates?.[0]?.content?.parts?.[0]?.text || "Tidak ada respons.";
    }

    // ── OLLAMA (Local - GRATIS) ──────────────────────────
    else if (provider === "ollama") {
      const baseUrl = process.env.OLLAMA_URL || "http://localhost:11434/v1";
      const model = process.env.OLLAMA_MODEL || "llama3.2";

      // Filter system prompt untuk Ollama (beberapa versi tidak support)
      const filteredMessages = messages.filter((m) => m.role !== "system");

      const ollamaRes = await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: model,
          messages: filteredMessages,
          temperature: 0.7,
          max_tokens: 1024,
          stream: false,
        }),
      });

      if (!ollamaRes.ok) {
        const err = await ollamaRes.json();
        throw new Error(err.error?.message || "Ollama API error");
      }

      const data = await ollamaRes.json();
      reply = data.choices?.[0]?.message?.content || "Tidak ada respons.";
    }

    // ── OPENAI / DEEPSEEK (OpenAI-compatible) ────────────
    else {
      let baseUrl, apiKey, model;

      if (provider === "openai") {
        baseUrl = "https://api.openai.com/v1";
        apiKey = process.env.OPENAI_API_KEY;
        model = process.env.OPENAI_MODEL || "gpt-4o-mini";
      } else if (provider === "deepseek") {
        baseUrl = "https://api.deepseek.com/v1";
        apiKey = process.env.DEEPSEEK_API_KEY;
        model = process.env.DEEPSEEK_MODEL || "deepseek-chat";
      } else {
        throw new Error("Provider tidak dikenal: " + provider);
      }

      if (!apiKey)
        throw new Error(`API key untuk ${provider} tidak diset di .env`);

      const chatRes = await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.7,
          max_tokens: 1024,
        }),
      });

      if (!chatRes.ok) {
        const err = await chatRes.json();
        throw new Error(err.error?.message || `${provider} API error`);
      }

      const data = await chatRes.json();
      reply = data.choices?.[0]?.message?.content || "Tidak ada respons.";
    }

    res.json({ ok: true, reply });
  } catch (err) {
    console.error("[CHAT ERROR]", err.message);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ── Start server ──────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🤖 Chatbot running at http://localhost:${PORT}`);
  console.log(
    `📡 Default provider: Ollama (${process.env.OLLAMA_MODEL || "llama3.2"})`,
  );
  console.log(`💡 Pastikan Ollama berjalan: ollama serve`);
});
