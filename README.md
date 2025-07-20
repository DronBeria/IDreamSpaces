# IDreamSpaces - Interior Design Portfolio

A professional portfolio and business website for Disha Beria's interior design service "IDreamSpaces".

## Features

- **Professional Portfolio**: Showcase of interior design projects with filtering capabilities
- **Service Offerings**: Detailed information about design services
- **About Section**: Personal story and design philosophy
- **Contact Form**: Client inquiry system with project details
- **Responsive Design**: Optimized for all devices
- **Modern UI**: Clean, sophisticated design with smooth animations

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Netlify/Vercel/GitHub Pages

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/idreamspaces.git
cd idreamspaces
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration

### GitHub Pages
1. Enable GitHub Pages in repository settings
2. Use GitHub Actions workflow (included in `.github/workflows/deploy.yml`)

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   ├── About.tsx       # About section
│   ├── Services.tsx    # Services showcase
│   ├── Portfolio.tsx   # Project portfolio
│   ├── Contact.tsx     # Contact form
│   └── Footer.tsx      # Footer
├── App.tsx             # Main app component
├── main.tsx           # Entry point
└── index.css          # Global styles
```

## Contact

**Disha Beria**  
Interior Designer & Founder of IDreamSpaces

- Email: dishaberia.com@gmail.com
- Phone: +91 7086218645
- Instagram: [@_idreamspaces_](https://www.instagram.com/_idreamspaces_?igsh=MTRtMTVqbmgyZ2s1NA==)

## License

This project is private and proprietary to IDreamSpaces.