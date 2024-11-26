# UIMS Platform

A decentralized identity management system built with React, Vite, and blockchain technology.

## Deployment Guide

### Prerequisites
- Node.js 16.x or later
- npm 7.x or later
- Git

### Local Development
1. Clone the repository
```bash
git clone <repository-url>
cd uims-platform
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file with the following variables:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server
```bash
npm run dev
```

### Deployment on Vercel

1. Push your code to a GitHub repository

2. Visit [Vercel](https://vercel.com) and sign up/login

3. Click "New Project" and import your GitHub repository

4. Configure the following environment variables in Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

5. Deploy settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

6. Click "Deploy"

### Important Notes

- Ensure all environment variables are properly set in Vercel
- The project uses client-side routing, which is handled by the vercel.json configuration
- Production builds are optimized for performance with Vite's build process

## Features

- Decentralized Identity Management
- Cross-Chain Compatibility
- Privacy-First Approach
- Global Standards Compliance
- User-Friendly Interface
- Animated UI Components

## Tech Stack

- React
- TypeScript
- Vite
- Framer Motion
- Tailwind CSS
- Wagmi
- Web3Modal
- Supabase
- Hardhat
