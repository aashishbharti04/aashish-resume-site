# Aashish Resume Site (Vite + React + Tailwind)

A polished resume website built with React, TailwindCSS, Framer Motion, and lucide-react icons.

## 1) Run on your PC

```bash
# Install Node.js 18+ first: https://nodejs.org
npm install
npm run dev
```

Then open the URL shown in the terminal (usually http://localhost:5173).

## 2) Build
```bash
npm run build
npm run preview
```

## 3) Deploy to GitHub Pages (gh-pages)

- Create a new GitHub repository, for example: `aashish-resume-site`
- In `vite.config.js`, set:
  ```js
  base: '/aashish-resume-site/'
  ```
- Push your code to GitHub, then run:
  ```bash
  npm run deploy
  ```
- In your repo settings → Pages, choose the `gh-pages` branch (if needed).
- Your site will be at: `https://<your-username>.github.io/aashish-resume-site/`

## PDF
Place your resume PDF at `public/AAshish.pdf` (already included). The download button uses this path.
