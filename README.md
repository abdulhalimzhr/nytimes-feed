# NY Times Article Search SPA

A modern, responsive Single Page Application built with Next.js and TypeScript that allows users to search and browse articles from The New York Times using their Article Search API.

## 🚀 Live Demo

[https://nytimes-feed.vercel.app/](https://nytimes-feed.vercel.app/)

## ✨ Features

### Core Functionality
- **Article Search**: Search NY Times articles by keyword
- **Rich Article Display**: Shows article title, author, publication date, and snippet
- **External Links**: Click articles to open original NYT articles in new tab
- **Real-time Search**: Instant search results with loading states

### UI/UX Features
- **Mobile-First Design**: Optimized for all screen sizes
- **Dark/Light Mode**: Toggle between themes with system preference detection
- **Professional Styling**: NY Times-inspired design with Playfair Display font
- **Loading States**: Skeleton placeholders during data fetching
- **Error Handling**: User-friendly error messages

### Technical Features
- **TypeScript**: Full type safety with proper API modeling
- **Smart Caching**: TanStack Query for request deduplication and caching
- **Pagination**: Infinite scroll with page-based navigation
- **Request Optimization**: Automatic retry logic and error handling
- **Reusable Components**: Modular architecture with clean separation
- **Service Layer**: Dedicated API service with error handling
- **Responsive Grid**: Dynamic layout adapting to screen sizes
- **SEO Optimized**: Next.js App Router with proper meta tags

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Data Fetching**: TanStack Query (React Query)
- **API**: NY Times Article Search API
- **Deployment**: Ready for Vercel/Netlify

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd nytimes-feed
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Add your NY Times API key:
   ```env
   NEXT_PUBLIC_NYT_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Getting NY Times API Key

1. Visit [NY Times Developer Portal](https://developer.nytimes.com/get-started)
2. Sign up for a free account
3. Create a new app
4. Enable the "Article Search API"
5. Copy your API key to `.env.local`
