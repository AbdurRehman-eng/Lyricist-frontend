import React from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col font-body-md text-primary antialiased bg-[#F7F6F3]">
      <Navbar />

      <main className="flex-grow pt-[120px] pb-stack-lg px-margin-mobile md:px-margin-desktop flex justify-center min-h-screen">
        <article className="w-full max-w-[520px] mx-auto text-left flex flex-col gap-stack-lg">
          {/* Header Section */}
          <header className="flex flex-col gap-stack-sm">
            <p className="font-label-caps text-label-caps text-secondary tracking-widest uppercase mb-unit">TERMS OF SERVICE</p>
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary tracking-tight">
              Rules of usage,<br />
              in <span className="italic font-light">plain text</span>.
            </h1>
            <div className="w-[32px] h-[1px] bg-primary mt-stack-md"></div>
          </header>

          {/* Body Content */}
          <section className="flex flex-col gap-stack-md font-body-md text-body-md text-secondary" style={{ fontSize: '15px', fontWeight: 300, lineHeight: 1.8 }}>
            <p>
              Welcome to Lyricist. By accessing or using our search platform, you agree to comply with the terms and guidelines described below.
            </p>
            
            <h3 className="font-headline-md text-xl text-primary mt-4 font-semibold">1. Acceptable Use</h3>
            <p>
              Lyricist is provided as an open-source tool for personal research, educational study, and song lookup. You agree not to spam, scrape, or perform denial-of-service attacks on our search engine or indexing servers.
            </p>

            <h3 className="font-headline-md text-xl text-primary mt-4 font-semibold">2. Content & Copyright Owners</h3>
            <p>
              Lyricist maps song titles, artist descriptions, and lyric snippets to aid indexing and retrieval.
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>All song titles, album names, artist data, and album cover assets remain the intellectual property of their respective copyright owners.</li>
              <li>If you are a copyright holder and wish to request the removal of specific indexed lyrics or songs from our search index, please submit a request to our repository administrators. We will process all valid take-down requests promptly.</li>
            </ul>

            <h3 className="font-headline-md text-xl text-primary mt-4 font-semibold">3. Disclaimers</h3>
            <p>
              The search database is provided "as is" without warranties of completeness, availability, or accuracy of term mappings. Spelling correction suggestions and voice recognition transcripts are generated heuristically and may occasionally contain inaccuracies.
            </p>

            <h3 className="font-headline-md text-xl text-primary mt-4 font-semibold">4. Amendments</h3>
            <p>
              These terms may be updated occasionally. Continued use of the platform constitutes agreement to the updated rules.
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
