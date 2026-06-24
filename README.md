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

Muhammad Iqbal
Informatika - Universitas Jenderal Achmad Yani
