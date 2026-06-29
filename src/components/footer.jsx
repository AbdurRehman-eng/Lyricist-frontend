import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-stack-md px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center max-w-container-max mx-auto bg-surface border-t border-[#E2E1DC] mt-auto">
      <span className="font-label-caps text-label-caps text-primary mb-4 md:mb-0">
        <Link to="/main" className="hover:opacity-80 transition-opacity">Lyricist</Link>
      </span>
      <div className="flex space-x-6 mb-4 md:mb-0">
        <Link to="/privacy" className="font-metadata text-metadata text-secondary hover:underline transition-all">Privacy</Link>
        <Link to="/terms" className="font-metadata text-metadata text-secondary hover:underline transition-all">Terms</Link>
        <Link to="/archive" className="font-metadata text-metadata text-secondary hover:underline transition-all">Archive</Link>
      </div>
      <span className="font-metadata text-metadata text-secondary">
        © {currentYear} Lyricist Editorial. All rights reserved.
      </span>
    </footer>
  );
}
