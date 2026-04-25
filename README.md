# INTERVIEW.AI - AI-Powered Interview Coach

INTERVIEW.AI is a high-end, production-grade interview practice platform that uses the Gemini 3 Flash model to provide deep, analytical feedback on your interview performance.

## 🚀 Features

- **Real-time Voice/Text Practice**: Conduct mock interviews using your microphone or keyboard.
- **Deep AI Analysis**: Get detailed feedback on "substance vs fluff", weaknesses, and a STAR-method improved version of your answers.
- **Career Consultant Verdict**: A final report with job fit prediction, growth areas, and a personalized improvement plan.
- **Session History**: Securely save all your practice sessions via Firebase to track your progress over time.
- **Modern UI**: A polished, responsive interface built with Tailwind CSS and Motion for smooth transitions.

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Motion (Framer Motion)
- **Backend Proxy**: Express.js (for serving questions and assets)
- **AI Engine**: Google Gemini API (`gemini-3-flash-preview`)
- **Database & Auth**: Firebase Firestore & Google Authentication

## 🔑 Environment Variables

To run this application, you need to configure the following secrets in your environment:

```env
# Required for AI analysis
GEMINI_API_KEY=your_api_key_here




## 📦 Installation & Setup

1. **Clone the repository.**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure Secrets**: Add your `GEMINI_API_KEY` to the project secrets.
4. **Run Development Server**:
   ```bash
   npm run dev
   ```

## 📖 How to Practice

1. **Personalize**: Choose your target Role (e.g., Software Engineer) and Level (e.g., Senior).
2. **Interview**: Answer 5 generated behavioral and technical questions. You can use **Voice Mode** for a more realistic feel.
3. **Analyze**: Once finished, wait a few seconds for the AI to "bulk evaluate" your entire session.
4. **Review**: Check your individual answer scores and the final "Consultant Verdict" in the History tab.

---
Built with ❤️ using Google AI Studio.
