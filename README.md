# Lyricist Frontend

The client interface for Lyricist, a song lyrics search engine. Built with React and Vite, the interface features a theme-responsive editorial brutalist layout, high-contrast typography, audio recording integration, and search engine optimization.

## Demo Links

- **Live Frontend**: [lyricist-frontend.vercel.app](https://lyricist-frontend.vercel.app)
- **Live Backend API**: [lyricist-backend-i4iy.onrender.com](https://lyricist-backend-i4iy.onrender.com)

## Features

- **Editorial Brutalist Design**: Layout using thin, structural borders, clean grids, and solid high-contrast borders.
- **Theme Switcher**: Transitions between high-contrast dark and light modes.
- **Voice Search Integration**: Uses the browser's WebRTC and Web Audio APIs to record and stream audio queries.
- **Search History & Popular Queries**: Fetches popular search terms and caches previous local searches.
- **Spotify Embedded Players**: Displays embeddable Spotify players directly in search results.
- **Dynamic SEO Hook**: Custom React hook `useSEO` dynamically syncs page metadata, Canonical links, Open Graph, and Twitter Cards on page change.
- **Responsive Layout**: Optimized for desktop, tablet, and mobile viewports.

## Project Layout

The codebase follows a modular React component structure:

```text
├── public/                      # Static assets
│   ├── favicon.ico              # Multi-size brand favicon
│   ├── sitemap.xml              # Search engine sitemap
│   └── robots.txt               # Crawler instructions
│
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── navbar.jsx           # Top navigation bar
│   │   ├── footer.jsx           # Unified footer component
│   │   └── ThemeToggle.jsx      # Theme toggle button
│   │
│   ├── pages/                   # Application route views
│   │   ├── About.jsx            # Project details
│   │   ├── Archive.jsx          # Database search song archive
│   │   ├── Audio.jsx            # Voice query recording page
│   │   ├── Form.jsx             # Song addition form
│   │   ├── Privacy.jsx          # Privacy policy
│   │   └── Terms.jsx            # Terms of service
│   │
│   ├── lib/                     # Client helper libraries
│   │   └── useSEO.js            # Dynamic SEO page management hook
│   │
│   ├── config.js                # API client base configurations
│   ├── index.css                # Global variables and Tailwind utilities
│   ├── App.jsx                  # Root shell and search results layout
│   └── main.jsx                 # Client entry point
```

## Development & Scripts

### Getting Started

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment variables**:
   Create a `.env.development` or `.env.production` file to set your API server location:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. **Launch development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

## Deployment

The frontend is configured for deployment on Vercel via `vercel.json` to handle routing for Single Page Applications (SPA):
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## License

Distributed under the MIT License. See `LICENSE` for more information.
