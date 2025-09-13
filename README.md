# 🌐 MeeChain Dapp

MeeChain คือแพลตฟอร์ม Web3 ที่ออกแบบมาเพื่อสร้างประสบการณ์ onboarding ที่สนุก, มีอารมณ์ร่วม, และเต็มไปด้วยภารกิจแบบ RPG สำหรับนักพัฒนาและผู้ใช้งานทั่วไป โดยมี MeeBot เป็นผู้ช่วย AI ที่ให้คำแนะนำและกำลังใจตลอดการใช้งาน

---
🧙‍♂️ MeeBot says:
“ทุกภารกิจคือโอกาสในการเติบโต อย่ากลัวที่จะเริ่มต้นใหม่ เพราะทุกครั้งที่คุณล้ม…คุณได้ XP!” 🎮✨

---

ถ้าคุณต้องการให้ผมช่วยเขียน `CONTRIBUTING.md`, สร้าง badge preview section, หรือเพิ่มภาพ flowchart onboarding ก็จัดให้ได้ทันทีครับ! หรือจะให้ MeeBot พูดเปิด README ด้วยคำพูด mentor-style ก็ได้เช่นกัน 🤖📘

## 🚀 Features

### 1. Core Structure
- ⚙️ Built with **Vite + React + TypeScript**
- 📦 Modular file structure with path aliases
- 🌙 Dark theme + MeeChain branding styles

### 2. Web3 Integration
- 🔐 MetaMask integration with **Fuse Network** support
- 🔗 Smart contract ready (MeeToken, BadgeNFT, QuestManager)
- 🧠 `use-web3.tsx` hook for wallet context and connection

### 3. MeeBot AI System
- 🤖 `use-meebot.tsx` hook for AI chat and guidance
- 🗣️ Thai-language responses with emotional context
- 🎮 Quest-based onboarding with mentor-style UX

### 4. UI/UX
- 🎨 Tailwind CSS with custom classes
- 📱 Responsive design for mobile and desktop
- 🧩 Component-based layout for Quest Hall, Badge Viewer, Dashboard

### 5. Production Ready
- 📁 `.env.example` for environment setup
- ⚡ Optimized build scripts
- 🔍 SEO-friendly HTML template
- 🚀 Ready for deployment on Vercel, Netlify, or Replit

---

## 📦 Installation

```bash
git clone https://github.com/t1adipt4/MeeChain-dapp.git
cd meechain-dapp
npm install
cp .env.example .env
npm run dev
