// === STATE ===
let conversationHistory = []; // [{role, content}]
let currentProvider = "ollama";
let isLoading = false;

const PROVIDER_LABELS = {
  ollama: "Ollama (Local)",
  gemini: "Google Gemini",
  openai: "OpenAI (GPT)",
  deepseek: "DeepSeek",
};

// === INIT ===
document.addEventListener("DOMContentLoaded", () => {
  // Set welcome time
  const welcomeTime = document.getElementById("welcome-time");
  if (welcomeTime) {
    welcomeTime.textContent = getTime();
  }

  // Provider buttons
  document.querySelectorAll(".provider-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".provider-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentProvider = btn.dataset.provider;
      document.getElementById("active-provider-label").textContent =
        PROVIDER_LABELS[currentProvider];

      // Tampilkan peringatan jika provider butuh API key
      const warning = document.getElementById("api-warning");
      if (currentProvider === "ollama") {
        warning.style.display = "none";
      } else {
        warning.style.display = "block";
        warning.textContent = `⚠️ Pastikan API Key untuk ${PROVIDER_LABELS[currentProvider]} sudah diisi di file .env`;
      }
    });
  });

  // Clear button
  document.getElementById("clear-btn").addEventListener("click", () => {
    if (conversationHistory.length === 0) return;
    if (!confirm("Hapus semua percakapan?")) return;
    conversationHistory = [];
    const msgs = document.getElementById("messages");
    msgs.innerHTML = `
      <div class="msg msg-ai">
        <div class="msg-avatar"><i class="fas fa-robot"></i></div>
        <div class="msg-bubble">
          <p>🧹 Percakapan telah dihapus. Mulai percakapan baru!</p>
          <span class="msg-time">${getTime()}</span>
        </div>
      </div>`;
    updateMsgCount();
  });

  // Auto-resize textarea
  const input = document.getElementById("user-input");
  input.addEventListener("input", () => {
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 140) + "px";
  });

  // Keyboard shortcut: Ctrl+Enter untuk kirim
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  updateMsgCount();
});

// === SEND MESSAGE ===
async function sendMessage() {
  if (isLoading) return;

  const input = document.getElementById("user-input");
  const text = input.value.trim();
  if (!text) return;

  // Add user message to UI
  appendMessage("user", text);
  input.value = "";
  input.style.height = "auto";

  // Add to history
  conversationHistory.push({ role: "user", content: text });

  // Build messages with system prompt
  const systemPrompt = document.getElementById("system-prompt").value.trim();
  const messages = [];
  if (systemPrompt && currentProvider !== "ollama") {
    // Ollama beberapa versi tidak support system prompt
    messages.push({ role: "system", content: systemPrompt });
  }
  messages.push(...conversationHistory);

  // Show typing
  setLoading(true);

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, provider: currentProvider }),
    });

    const data = await res.json();

    if (data.ok) {
      appendMessage("ai", data.reply);
      conversationHistory.push({ role: "assistant", content: data.reply });
    } else {
      appendMessage("ai", `❌ Error: ${data.error}`, true);
    }
  } catch (err) {
    appendMessage("ai", `❌ Gagal terhubung ke server: ${err.message}`, true);
  } finally {
    setLoading(false);
  }
}

// === HELPERS ===
function appendMessage(role, text, isError = false) {
  const msgs = document.getElementById("messages");
  const div = document.createElement("div");
  div.className = `msg msg-${role === "user" ? "user" : "ai"}${isError ? " msg-error" : ""}`;

  const icon = role === "user" ? "fa-user" : "fa-robot";
  div.innerHTML = `
    <div class="msg-avatar"><i class="fas ${icon}"></i></div>
    <div class="msg-bubble">
      <p>${escapeHtml(text)}</p>
      <span class="msg-time">${getTime()}</span>
    </div>`;

  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  updateMsgCount();
}

function setLoading(val) {
  isLoading = val;
  const typing = document.getElementById("typing");
  typing.style.display = val ? "flex" : "none";
  document.getElementById("send-btn").disabled = val;

  const label = document.getElementById("typing-label");
  label.textContent = PROVIDER_LABELS[currentProvider] + " sedang mengetik...";

  if (!val) {
    const msgs = document.getElementById("messages");
    msgs.scrollTop = msgs.scrollHeight;
  }
}

function handleKey(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

function getTime() {
  return new Date().toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function updateMsgCount() {
  const count = conversationHistory.length;
  const el = document.getElementById("msg-count");
  if (el) {
    el.textContent = count === 0 ? "0 pesan" : `${count} pesan`;
  }
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\n/g, "<br>");
}
