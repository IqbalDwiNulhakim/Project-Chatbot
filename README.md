# AI Chatbot - Multi-Provider

Chatbot AI berbasis web yang mendukung 4 provider sekaligus dalam satu aplikasi: Google Gemini, OpenAI, DeepSeek, dan Ollama (Lokal). Aplikasi ini dibuat menggunakan Node.js, Express.js, dan template engine EJS.

Secara default, contoh di proyek ini menggunakan Ollama supaya bisa berjalan 100% lokal di komputer sendiri, gratis, dan tanpa perlu koneksi internet atau API key.

---

## Fitur Utama

- Multi-provider: Bisa ganti AI (Gemini, OpenAI, DeepSeek, Ollama) langsung dari sidebar tanpa muat ulang halaman.
- Pengingat konteks: AI ingat seluruh alur obrolan sebelumnya dalam satu sesi chat.
- Custom system prompt: Bisa ganti peran atau kepribadian AI lewat sidebar (misal: jadi tutor, admin toko, dll).
- Reset chat: Hapus riwayat obrolan secara instan dengan satu klik.
- Shortcut keyboard: Tekan Enter untuk mengirim pesan, dan Shift+Enter untuk membuat baris baru.
- Interface dark mode: Tampilan gelap yang ramah di mata.
- Pesan error jelas: Muncul notifikasi informatif kalau API key salah atau service lokal mati.

---

## Prasyarat Sistem

1. Node.js (Minimal versi 18)
2. npm (Minimal versi 8)
3. Ollama Runtime (Khusus jika ingin pakai AI lokal tanpa API key)

---

## Panduan Instalasi dan Menjalankan

1. Clone repositori ini:
   git clone https://github.com/USERNAME/project2-chatbot.git
   cd project2-chatbot

2. Jalankan install dependensi:
   npm install

3. Buat file .env:
   Salin file .env.example menjadi .env (bisa pakai perintah "cp .env.example .env" di Linux/Mac atau "copy .env.example .env" di Windows).

4. Jalankan server:
   npm start

5. Buka browser dan akses:
   http://localhost:3001

---

## Cara Pakai dengan Ollama (Lokal & Gratis)

1. Download dan install Ollama dari situs resminya.
2. Buka terminal komputer, lalu download model Llama 3 dengan perintah:
   ollama pull llama3
3. Jalankan service Ollama di komputer:
   ollama serve
4. Buka file .env proyek ini, lalu pastikan settingannya seperti ini:
   PORT=3001
   OLLAMA_URL=http://localhost:11434/v1
   OLLAMA_MODEL=llama3
5. Buka aplikasi di browser, klik tombol "Ollama (Local)" di sidebar, dan silakan mulai chatting.

---

## Panduan Mengisi API Key Lain

Kamu tidak harus mengisi semua API key di file .env. Cukup isi yang ingin kamu pakai saja. Yang kosong tidak akan bikin aplikasi error, hanya saja fiturnya tidak bisa dipilih di web.

- Google Gemini: Ambil di Google AI Studio, masukkan ke GEMINI_API_KEY.
- OpenAI: Ambil di platform OpenAI, masukkan ke OPENAI_API_KEY.
- DeepSeek: Ambil di platform DeepSeek, masukkan ke DEEPSEEK_API_KEY.

---

## Solusi Masalah (Troubleshooting)

- Error "Ollama tidak bisa dihubungi": Pastikan kamu sudah ketik "ollama serve" di terminal dan biarkan terminal itu tetap terbuka selama aplikasi berjalan.
- Error "GEMINI_API_KEY tidak diset": Pastikan nama file sudah benar ".env" (bukan .env.example lagi) dan jangan beri spasi di sekitar tanda sama dengan (=).
- Port 3001 sudah dipakai: Buka file .env, lalu ganti PORT=3001 menjadi angka lain, misalnya PORT=3005.

---

## Penulis

<<<<<<< HEAD
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
=======
Iqbal Dwi Nulhakim
>>>>>>> 853af79a41b4b54fc0fa896b95f829165c55ccbe
#   P r o j e c t - C h a t b o t  
 