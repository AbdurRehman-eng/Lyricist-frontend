import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import AudioSearch from './Audio';
import Splash from './Splash';
import './index.css';
import AboutPage from './About';
import AddSongForm from './form';
import PrivacyPage from './Privacy';
import TermsPage from './Terms';
import ArchivePage from './Archive';
import { ThemeProvider } from './ThemeContext';

function Main() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/main" element={<App />} />
          <Route path="/audio-search" element={<AudioSearch />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/form" element={<AddSongForm />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/archive" element={<ArchivePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Main />);
