# 🚀 PGAGI DEMO: Personalized Content Dashboard

A modern, highly interactive, and fully responsive dashboard that aggregates real-time news, movie recommendations, and community posts into a unified, personalized feed. Built with Next.js, TypeScript, Tailwind CSS, and Redux Toolkit, this project demonstrates advanced frontend architecture, robust state management, and comprehensive testing.

🔗 **Live Demo:** https://pgagi-demo.vercel.app
📂 **Repository:** https://github.com/shahidali2303/pgagi_demo  
🎥 **Demo Video:**

---

## ✨ Key Features

### 🎨 Advanced UI/UX

- **Drag-and-Drop Reordering:** Intuitive card reordering using `@dnd-kit` with smooth Framer Motion animations.
- **Dark/Light Mode:** Fully persistent theme switching with seamless CSS transitions.
- **Responsive Design:** Mobile-first layout with a collapsible sidebar and adaptive grid systems.
- **Micro-interactions:** Custom skeleton loading states, hover effects, and custom-built toast notifications.

### ⚙️ Personalization & State Management

- **User Preferences:** Dynamic feed filtering based on user-selected categories (Technology, Entertainment, etc.), persisted via Redux Persist.
- **Mock Authentication:** Secure login flow with persistent user sessions and profile avatars.
- **Debounced Search:** Optimized, real-time search filtering across all content types (500ms debounce).
- **Favorites System:** Ability to save and view preferred content in a dedicated section.

### 🌍 Multi-language Support (i18n)

- Seamless English/Spanish translation toggle across the entire UI shell using `react-i18next`.

### 📡 Production-Safe API Integration

- **News:** Spaceflight News API (Real-time articles).
- **Recommendations:** TMDB API (Popular movies with real posters).
- **Social:** Dev.to API (Community tech posts with user avatars and tags).

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit (RTK), RTK Query, Redux Persist
- **Animations & DnD:** Framer Motion, `@dnd-kit`
- **Internationalization:** `react-i18next`
- **Testing:** Vitest, React Testing Library, Playwright (E2E)
- **Deployment:** Vercel

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone [Insert Your GitHub Repo Link Here]
   cd pgagi-demo
   ```
