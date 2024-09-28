# Git Me Up 🚀

![GitHub release (latest by date)](https://img.shields.io/github/v/release/InhyeJeong/git-me-up)
![GitHub last commit](https://img.shields.io/github/last-commit/InhyeJeong/git-me-up)
![GitHub](https://img.shields.io/github/license/InhyeJeong/git-me-up)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

A dynamic GitHub commit activity visualizer using 3D cubes. Input multiple GitHub usernames and watch their commit history come to life!

[View Demo](https://git-me-up-demo.vercel.app)

## ✨ Features

- 🔍 Multi-user GitHub activity tracking
- 🧊 3D cube visualization of commits
- 📅 Interactive heatmap with year selection
- 📊 Detailed repository and user statistics

## 🛠️ Tech Stack

- **Frontend**: 
  - [Next.js](https://nextjs.org/) - React framework for SSR and static generation
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
  - [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
  - [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/) - React renderer for Three.js
- **API**: 
  - [GitHub REST API](https://docs.github.com/en/rest) - Fetch user and repository data
- **Deployment**: 
  - [Vercel](https://vercel.com/) - Platform for static and serverless deployment

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/InhyeJeong/git-me-up.git
   cd git-me-up
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your GitHub token
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
git-me-up/
├── src/
│   ├── app/
│   │   └── api/           # API route handlers
│   ├── components/        # React components
│   ├── utils/             # Utility functions
│   └── types/             # TypeScript type definitions
├── public/                # Static assets
├── .github/
│   └── workflows/         # GitHub Actions workflows
└── package.json           # Project dependencies and scripts
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/InhyeJeong/git-me-up/issues).

## 🙏 Acknowledgements

- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [GitHub Octicons](https://primer.style/octicons/)
- [Heroicons](https://heroicons.com/)

---

Made with ❤️ by [Inhye Jeong](https://github.com/InhyeJeong)
