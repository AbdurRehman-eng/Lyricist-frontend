import React from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col font-body-md text-primary antialiased bg-[#F7F6F3]">
      <Navbar />

      <main className="flex-grow pt-[120px] pb-stack-lg px-margin-mobile md:px-margin-desktop flex justify-center min-h-screen">
        <article className="w-full max-w-[520px] mx-auto text-left flex flex-col gap-stack-lg">
          {/* Header Section */}
          <header className="flex flex-col gap-stack-sm">
            <p className="font-label-caps text-label-caps text-secondary tracking-widest uppercase mb-unit">PRIVACY POLICY</p>
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary tracking-tight">
              Data practice,<br />
              in <span className="italic font-light">plain print</span>.
            </h1>
            <div className="w-[32px] h-[1px] bg-primary mt-stack-md"></div>
          </header>

          {/* Body Content */}
          <section className="flex flex-col gap-stack-md font-body-md text-body-md text-secondary" style={{ fontSize: '15px', fontWeight: 300, lineHeight: 1.8 }}>
            <p>
              Lyricist values your privacy. This document outlines how we handle data and what information is processed when you search, record audio, or index new songs.
            </p>
            
            <h3 className="font-headline-md text-xl text-primary mt-4 font-semibold">1. Search Information</h3>
            <p>
              When you submit a text query, we count the term frequencies anonymously to track popular searches and suggest helpful topics on the homepage. We do not link searches to your IP address, browser cookie, or personal identifier.
            </p>

            <h3 className="font-headline-md text-xl text-primary mt-4 font-semibold">2. Audio Recordings</h3>
            <p>
              When you use our audio or voice query search, your microphone input is processed in one of two ways:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li><strong>Web Speech API:</strong> Transcripts are processed directly by your web browser's local synthesis engine. No audio files are sent or stored.</li>
              <li><strong>Local Audio Transcription:</strong> An in-memory audio chunk is sent to our transcription service. Once the speech is converted to text, the audio clip is immediately destroyed. We do not store raw voice files.</li>
            </ul>

            <h3 className="font-headline-md text-xl text-primary mt-4 font-semibold">3. Third Party Embeds</h3>
            <p>
              We integrate Spotify web player embeds to provide 30-second previews of matching tracks. Any interactions, logins, or cookie settings within these players are governed directly by Spotify's privacy policies.
            </p>

            <h3 className="font-headline-md text-xl text-primary mt-4 font-semibold">4. Open Source and Education</h3>
            <p>
              Lyricist is an educational search project. We do not run advertisements, monetize user data, or share query data with third-party tracking networks.
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
