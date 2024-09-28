# GitHub Commit Heatmap Visualizer

[demo](https://git-me-up-rho.vercel.app/?usernames=inhyejeong)

A tool to visualize GitHub commit activity using 3D cubes. Users can input multiple GitHub accounts to see their commit activity represented as 3D cubes.

## Features

- Input multiple GitHub usernames
- Visualize commit activity as floating 3D cubes
- Interactive heatmap with adjustable year

## Tech Stack

- **Frontend**: 
  - **Next.js**: React framework for server-side rendering and static site generation.
  - **Tailwind CSS**: Utility-first CSS framework for styling.
  - **TypeScript**: Static type checking for JavaScript.
  - **@react-three/fiber**: React renderer for Three.js to handle 3D rendering.
- **Backend**:
  - **GitHub API**: Fetch GitHub data for profiles and repositories.
- **Deployment**:
  - **Vercel**: Deployment platform for static sites and serverless functions.

## Installation

To get started with the project, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/InhyeJeong/git-me-up.git
   cd git-me-up

2. **Install dependencies**:
   ```bash
   yarn install
3. **Run the development server**:
   ```bash
     yarn dev
   ```

Open http://localhost:3000 in your browser to see the application.
