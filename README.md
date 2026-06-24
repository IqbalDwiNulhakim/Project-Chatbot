# 🤖 AI Chatbot — Multi-Provider

Chatbot AI berbasis web yang mendukung **4 provider AI** dalam satu aplikasi: **Google Gemini · OpenAI · DeepSeek · Ollama (lokal)**. Dibangun dengan Node.js + Express.js + EJS.

> **Contoh di project ini menggunakan Ollama** — berjalan 100% lokal, gratis, tanpa perlu internet atau biaya API.

---

## ✨ Fitur Utama

- 🔄 **Multi-provider** — ganti provider AI (Gemini, OpenAI, DeepSeek, Ollama) langsung dari sidebar tanpa reload
- 💬 **Multi-turn conversation** — AI mengingat seluruh konteks percakapan dalam satu sesi
- 🎯 **System prompt kustom** — atur kepribadian atau peran AI (misal: asisten toko, tutor, customer service)
- 🗑️ **Hapus percakapan** — reset riwayat chat dengan satu klik
- ⌨️ **Keyboard shortcut** — `Enter` untuk kirim, `Shift+Enter` untuk baris baru
- 🌙 **Dark mode UI** — tampilan gelap yang nyaman
- ❌ **Error handling** — pesan error jelas jika API key salah atau provider tidak tersedia

---

## 📁 Struktur Proyek

```
project2-chatbot/
│
├── app.js                  # Entry point — server Express + route POST /api/chat
│
├── views/
│   └── index.ejs           # Halaman utama chatbot (sidebar + chat window)
│
├── public/
│   ├── css/
│   │   └── chat.css        # Stylesheet — dark mode UI
│   └── js/
│       └── chat.js         # Logic frontend: kirim pesan, render bubble, ganti provider
│
├── .env.example            # Template konfigurasi (salin menjadi .env)
├── .gitignore              # Mengecualikan .env dan node_modules
├── package.json
└── README.md
```

---

## 🖥️ Prasyarat

| Software | Versi Minimum | Cara Cek |
|----------|--------------|----------|
| Node.js  | v18+         | `node -v` |
| npm      | v8+          | `npm -v` |

Untuk provider **Ollama** (lokal), tambahan:

| Software | Keterangan | Link |
|----------|------------|------|
| Ollama   | Runtime model AI lokal | https://ollama.ai/download |

---

## 🚀 Instalasi & Menjalankan

### 1. Clone repositori

```bash
git clone https://github.com/USERNAME/project2-chatbot.git
cd project2-chatbot
```

### 2. Install dependensi

```bash
npm install
```

| Package | Fungsi |
|---------|--------|
| `express` | Web framework |
| `ejs` | Template engine |
| `node-fetch` | HTTP client untuk memanggil API AI |
| `body-parser` | Parse JSON dari request frontend |
| `dotenv` | Membaca konfigurasi dari file `.env` |

### 3. Buat file `.env`

```bash
# Linux / macOS
cp .env.example .env

# Windows (Command Prompt)
copy .env.example .env
```

Kemudian buka file `.env` dan isi API key sesuai provider yang digunakan (lihat bagian [Cara Mendapatkan API Key](#-cara-mendapatkan-api-key)).

### 4. Jalankan server

```bash
npm start
```

Output yang diharapkan:

```
🤖 Chatbot running at http://localhost:3001
```

### 5. Buka browser

```
http://localhost:3001
```

---

## 🦙 Contoh Penggunaan dengan Ollama (Lokal)

Berikut adalah cara menjalankan chatbot ini **tanpa API key berbayar** menggunakan Ollama.

### Step 1 — Install Ollama

**Linux:**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

**macOS:**
```bash
brew install ollama
```

**Windows:**
Download installer dari https://ollama.ai/download dan jalankan.

---

### Step 2 — Download model llama3

```bash
ollama pull llama3
```

Proses download sekitar 4.7 GB (hanya perlu dilakukan sekali). Tunggu hingga selesai:

```
pulling manifest
pulling 6a0746a1ec1a...  100% ▕████████████████▏ 4.7 GB
pulling 4fa551d4f938...  100% ▕████████████████▏  12 KB
verifying sha256 digest
writing manifest
success
```

Verifikasi model sudah tersedia:

```bash
ollama list
# NAME            ID              SIZE    MODIFIED
# llama3:latest   365c0bd3c000    4.7 GB  2 minutes ago
```

> Model lain yang bisa dicoba: `mistral`, `phi3`, `gemma2`, `codellama`

---

### Step 3 — Jalankan Ollama service

```bash
ollama serve
```

Output:
```
Listening on 127.0.0.1:11434 (version 0.x.x)
```

> Biarkan terminal ini tetap terbuka. Ollama harus berjalan selama chatbot digunakan.

Verifikasi Ollama aktif:
```bash
curl http://localhost:11434/api/tags
# {"models":[{"name":"llama3:latest",...}]}
```

---

### Step 4 — Konfigurasi `.env`

Buka file `.env` dan pastikan baris Ollama terisi:

```env
PORT=3001
OLLAMA_URL=http://localhost:11434/v1
OLLAMA_MODEL=llama3
```

Provider lain (Gemini, OpenAI, DeepSeek) bisa dikosongkan jika belum punya API key — tidak akan error selama tidak dipilih di UI.

---

### Step 5 — Jalankan chatbot

Di terminal baru (terpisah dari terminal Ollama):

```bash
npm start
# 🤖 Chatbot running at http://localhost:3001
```

---

### Step 6 — Mulai percakapan

1. Buka `http://localhost:3001` di browser
2. Di sidebar kiri, klik **"Ollama (Local)"** — tombol berubah menjadi aktif (ungu)
3. (Opsional) Ubah System Prompt di sidebar, contoh:
   ```
   Kamu adalah asisten IT yang menjelaskan konsep teknis dengan bahasa sederhana dan mudah dipahami oleh pemula.
   ```
4. Ketik pesan di kotak input bawah → tekan `Enter`

**Contoh percakapan nyata dengan Ollama (llama3):**

```
Anda   : Apa itu REST API?

Ollama : REST API (Representational State Transfer) adalah standar
         arsitektur komunikasi antar aplikasi melalui protokol HTTP.

         Cara kerjanya:
         - Client mengirim request ke URL tertentu (endpoint)
         - Server memproses dan mengembalikan response (biasanya JSON)

         Contoh endpoint:
         GET  /products       → ambil semua produk
         GET  /products/1     → ambil produk dengan ID 1
         POST /products       → tambah produk baru
         PUT  /products/1     → update produk ID 1
         DELETE /products/1   → hapus produk ID 1

Anda   : Bedanya sama GraphQL apa?

Ollama : Perbedaan utama REST vs GraphQL:

         REST:
         ✓ Sederhana, sudah sangat umum digunakan
         ✓ Setiap endpoint punya satu fungsi jelas
         ✗ Bisa over-fetching (data yang dikembalikan terlalu banyak)
         ✗ Butuh banyak endpoint untuk data berbeda

         GraphQL:
         ✓ Client bisa request field yang dibutuhkan saja
         ✓ Satu endpoint untuk semua operasi
         ✗ Kurva belajar lebih tinggi
         ✗ Lebih kompleks untuk kasus sederhana

         Untuk project skala kecil-menengah, REST biasanya sudah cukup.
```

> AI mengingat konteks — pertanyaan "Bedanya sama GraphQL apa?" dipahami sebagai lanjutan dari diskusi REST API sebelumnya.

---

## 🔑 Cara Mendapatkan API Key

> Pilih **minimal satu provider**. Provider yang tidak diisi API key-nya tidak akan error — hanya tidak bisa dipilih di UI.

---

### ⚫ Ollama — Gratis, Lokal (Tidak perlu API key)

Lihat panduan lengkap di bagian [Contoh Penggunaan dengan Ollama](#-contoh-penggunaan-dengan-ollama-lokal) di atas.

---

### 🟦 Google Gemini — Gratis (1.500 request/hari)

1. Buka https://aistudio.google.com/app/apikey
2. Login dengan akun Google
3. Klik **"Create API Key"**
4. Pilih project Google Cloud (atau buat baru) → **"Create API key in existing project"**
5. Salin API key (format: `AIzaSy...`)
6. Isi di `.env`:

```env
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXX
```

---

### 🟩 OpenAI (GPT) — Berbayar

1. Buka https://platform.openai.com/api-keys
2. Login / daftar akun OpenAI
3. Klik **"Create new secret key"** → beri nama → **"Create secret key"**
4. **Salin segera** — key hanya ditampilkan sekali (format: `sk-proj-...`)
5. Pastikan ada saldo/billing aktif di https://platform.openai.com/account/billing
6. Isi di `.env`:

```env
OPENAI_API_KEY=sk-proj-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
OPENAI_MODEL=gpt-4o-mini
```

> Model `gpt-4o-mini` adalah pilihan paling hemat biaya.

---

### 🟧 DeepSeek — Harga Terjangkau

1. Buka https://platform.deepseek.com
2. Daftar akun (email atau GitHub)
3. Masuk ke menu **API Keys** di dashboard
4. Klik **"Create new API Key"** → salin key (format: `sk-...`)
5. Isi di `.env`:

```env
DEEPSEEK_API_KEY=sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
DEEPSEEK_MODEL=deepseek-chat
```

---

## ⚙️ Konfigurasi `.env` Lengkap

```env
# ─────────────────────────────────────────────────
# PORT SERVER
# ─────────────────────────────────────────────────
PORT=3001

# ─────────────────────────────────────────────────
# GOOGLE GEMINI — GRATIS
# Daftar: https://aistudio.google.com/app/apikey
# ─────────────────────────────────────────────────
GEMINI_API_KEY=your_gemini_api_key_here

# ─────────────────────────────────────────────────
# OPENAI — BERBAYAR
# Daftar: https://platform.openai.com/api-keys
# Model: gpt-4o, gpt-4o-mini, gpt-3.5-turbo
# ─────────────────────────────────────────────────
OPENAI_API_KEY=sk-proj-your_key_here
OPENAI_MODEL=gpt-4o-mini

# ─────────────────────────────────────────────────
# DEEPSEEK — TERJANGKAU
# Daftar: https://platform.deepseek.com
# Model: deepseek-chat, deepseek-coder
# ─────────────────────────────────────────────────
DEEPSEEK_API_KEY=sk-your_key_here
DEEPSEEK_MODEL=deepseek-chat

# ─────────────────────────────────────────────────
# OLLAMA — GRATIS, LOKAL (tidak perlu API key)
# Install: https://ollama.ai
# Jalankan: ollama serve
# Download model: ollama pull llama3
# Model lain: mistral, phi3, gemma2, codellama
# ─────────────────────────────────────────────────
OLLAMA_URL=http://localhost:11434/v1
OLLAMA_MODEL=llama3
```

---

## 🔌 Arsitektur Aplikasi

```
┌─────────────────────────────────────────────────────┐
│                   BROWSER (Client)                  │
│                                                     │
│   Sidebar                  Chat Window              │
│   ├─ Pilih Provider        ├─ Bubble pesan user     │
│   ├─ System Prompt         ├─ Bubble balasan AI     │
│   └─ Hapus Percakapan      ├─ Typing indicator      │
│                            └─ Input + Kirim         │
│                  │                                  │
│          chat.js → fetch POST /api/chat             │
└──────────────────┬──────────────────────────────────┘
                   │ HTTP POST
                   │ { messages, provider }
                   ▼
┌─────────────────────────────────────────────────────┐
│              EXPRESS SERVER (app.js)                │
│                                                     │
│   POST /api/chat                                    │
│   ├── provider = "gemini"    → Gemini REST API      │
│   ├── provider = "openai"    → OpenAI REST API      │
│   ├── provider = "deepseek"  → DeepSeek REST API    │
│   └── provider = "ollama"    → localhost:11434      │
│                                                     │
│   Response: { ok: true, reply: "..." }              │
└──────┬─────────────┬──────────────┬─────────────────┘
       │             │              │            │
       ▼             ▼              ▼            ▼
  Gemini API    OpenAI API    DeepSeek API    Ollama
  (Google)      (OpenAI)      (DeepSeek)     (Lokal)
```

---

## ⚙️ Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Runtime | Node.js v18+ |
| Framework | Express.js |
| View Engine | EJS |
| HTTP Client | node-fetch |
| Config | dotenv |
| Frontend | Vanilla JavaScript (ES6+) |
| Styling | CSS Custom — dark mode |
| Icons | Font Awesome 6 (CDN) |
| AI Providers | Google Gemini · OpenAI · DeepSeek · Ollama |

---

## 🛠️ Troubleshooting

**❌ Error: "Ollama tidak bisa dihubungi" / Connection refused**
```bash
# Pastikan Ollama service sedang berjalan
ollama serve

# Cek apakah port 11434 aktif
curl http://localhost:11434/api/tags

# Pastikan model sudah didownload
ollama list
```

**❌ Error: "GEMINI_API_KEY tidak diset di .env"**
- Pastikan file `.env` ada (bukan hanya `.env.example`)
- Tidak boleh ada spasi di sekitar `=` dalam file `.env`
- Restart server setelah mengubah `.env`

**❌ Error 401 dari OpenAI / DeepSeek**
- API key salah, expired, atau belum ada saldo
- Cek saldo OpenAI: https://platform.openai.com/usage

**❌ Port 3001 sudah dipakai**
```bash
# Ganti port di .env
PORT=3002
```

---

## 👨‍💻 Author

**Muhammad Iqbal**
Informatika · Universitas Jenderal Achmad Yani
#   P r o j e c t - C h a t b o t  
 #   P r o j e c t - C h a t b o t  
 