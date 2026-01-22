# 🛍️ Hola Fushion

A modern, premium e-commerce platform built with React, TypeScript, and Tailwind CSS. Features a beautiful glassmorphism UI, full RTL/LTR internationalization support, and responsive design.

![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?style=flat&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=flat&logo=vite)

---

## ✨ Features

### Core Functionality

- 🛒 **Shopping Cart** - Add/remove products, quantity management, persistent state
- 📦 **Product Catalog** - Dynamic filtering by category and price range
- 🔍 **Product Details** - Image zoom, related products, ratings
- 👤 **User Authentication** - Login/Register with local storage persistence
- 🛡️ **Admin Dashboard** - User management and product administration

### Design & UX

- 🎨 **Premium UI** - Glassmorphism effects, gradient accents, micro-animations
- 🌙 **Dark/Light Mode** - Theme toggle with system preference detection
- 🌍 **Internationalization** - Full Arabic (RTL) and English (LTR) support
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **Smooth Transitions** - Page transitions, hover effects, loading states

---

## 🛠️ Tech Stack

| Category          | Technologies                    |
| ----------------- | ------------------------------- |
| **Framework**     | React 19.2 with React Compiler  |
| **Language**      | TypeScript 5.9                  |
| **Styling**       | Tailwind CSS 4.1, CSS Variables |
| **State**         | Redux Toolkit 2.11              |
| **Routing**       | React Router 7.12               |
| **Build**         | Vite 7.2                        |
| **UI Components** | Radix UI Primitives             |

---

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/              # Base components (Button, Card, Input, etc.)
│   ├── Navbar.tsx       # Glassmorphism navigation
│   ├── Footer.tsx       # Site footer
│   └── ProductCard.tsx  # Product display card
├── pages/
│   ├── user/            # User-facing pages (Home, Products, Cart, etc.)
│   └── admin/           # Admin dashboard pages
├── layouts/             # Page layouts (UserLayout, AdminLayout)
├── redux/
│   ├── userSlices/      # User state (products, cart, theme, language)
│   └── adminSlices/     # Admin state (flags, user management)
├── hooks/               # Custom hooks (useTranslation)
├── i18n/                # Translation files (ar.json, en.json)
├── lib/                 # Utilities and API clients
└── types/               # TypeScript type definitions
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/BelalWaheed/bel.git
cd commerce

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Available Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start development server with HMR |
| `npm run build`   | Build for production              |
| `npm run preview` | Preview production build          |
| `npm run lint`    | Run ESLint                        |

---

## 🎨 Design System

### Color Palette

| Token      | Light              | Dark      |
| ---------- | ------------------ | --------- |
| Primary    | `#6366f1` (Indigo) | `#818cf8` |
| Accent     | `#ec4899` (Pink)   | `#f472b6` |
| Background | `#f8fafc`          | `#0f172a` |
| Surface    | `#ffffff`          | `#1e293b` |

### Typography

- **Headings**: Inter (700 weight)
- **Body**: Outfit (400-500 weight)

### Key CSS Classes

```css
.glass          /* Glassmorphism effect */
.gradient-primary   /* Primary gradient background */
.gradient-text      /* Gradient text effect */
.card-premium       /* Premium card styling */
.btn-premium        /* Gradient button with shine effect */
.hover-lift         /* Lift animation on hover */
```

---

## 🌍 Internationalization

The app supports Arabic (RTL) and English (LTR) with automatic layout switching.

```tsx
import { useTranslation } from "@/hooks/useTranslation";

function Component() {
  const { t, language, isRTL } = useTranslation();

  return <h1>{t("common.welcome")}</h1>;
}
```

Translation files located in `src/i18n/`:

- `ar.json` - Arabic translations
- `en.json` - English translations

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file for environment-specific configuration:

```env
VITE_API_URL=your_api_url
```

### Theme Customization

Modify CSS variables in `src/index.css` under `:root` and `.dark` selectors.

---

## 📄 License

This project is private and proprietary.

---

## 👨‍💻 Author

**Belal Waheed**

- GitHub: [@BelalWaheed](https://github.com/BelalWaheed)
