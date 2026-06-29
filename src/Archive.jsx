import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { API_BASE_URL } from './config';
import useSEO from './lib/useSEO';

// Compact Spotify Embed
const CompactSpotifyEmbed = ({ trackId }) => {
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  return (
    <div className="w-full h-[80px] bg-[#E2E1DC] relative overflow-hidden rounded-[2px] border border-[#E2E1DC] mt-2">
      {isIframeLoading && (
        <div className="absolute inset-0 flex items-center p-4 bg-[#F1EDEC] animate-pulse">
          <div className="w-10 h-10 bg-[#E2E1DC] rounded-[2px] mr-3"></div>
          <div className="flex-1 flex flex-col gap-2">
            <div className="w-2/3 h-3 bg-[#E2E1DC] rounded"></div>
            <div className="w-1/3 h-2 bg-[#E2E1DC] rounded"></div>
          </div>
        </div>
      )}
      <iframe
        src={`https://open.spotify.com/embed/track/${trackId}`}
        width="100%"
        height="80"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        className={`border-0 w-full transition-opacity duration-300 ${isIframeLoading ? 'opacity-0' : 'opacity-100'}`}
        style={{ border: 'none', overflow: 'hidden' }}
        loading="lazy"
        onLoad={() => setIsIframeLoading(false)}
      ></iframe>
    </div>
  );
};

const formatArtists = (artists) => {
  if (!artists) return '';
  if (Array.isArray(artists)) {
    return artists.join(', ');
  }
  if (typeof artists === 'string') {
    const trimmed = artists.trim();
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        const matches = [...trimmed.matchAll(/['"]([^'"]+)['"]/g)].map(m => m[1]);
        if (matches.length > 0) {
          return matches.join(', ');
        }
      } catch (e) {}
      return trimmed
        .replace(/^\[|\]$/g, '')
        .replace(/['"]/g, '')
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
        .join(', ');
    }
    return artists;
  }
  return String(artists);
};

export default function ArchivePage() {
  useSEO({
    title: 'Song Archive Catalog - Lyricist',
    description: 'Browse the complete indexed catalog of song titles, artists, and Spotify track links in the Lyricist database.',
    keywords: 'song archive, song list, database index, indexed tracks, song catalog',
  });

  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSongId, setExpandedSongId] = useState(null);
  
  // Pagination & Server stats
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSongsCount, setTotalSongsCount] = useState(0);
  const [uniqueArtistsCount, setUniqueArtistsCount] = useState(0);
  const [uniqueAlbumsCount, setUniqueAlbumsCount] = useState(0);
  
  const songsPerPage = 15;

  useEffect(() => {
    const fetchSongs = async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams({
          page: currentPage,
          limit: songsPerPage,
          search: searchTerm
        });
        const response = await fetch(`${API_BASE_URL}/songs?${queryParams.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to load songs from index database.');
        }
        const data = await response.json();
        
        if (data && typeof data === 'object' && !Array.isArray(data)) {
          setSongs(data.songs || []);
          setTotalSongsCount(data.total || 0);
          setTotalPages(data.pages || 1);
          setUniqueArtistsCount(data.unique_artists || 0);
          setUniqueAlbumsCount(data.unique_albums || 0);
        } else {
          // Fallback if backend returned plain list
          const list = data || [];
          const sorted = list.sort((a, b) => a.name.localeCompare(b.name));
          setSongs(sorted.slice((currentPage - 1) * songsPerPage, currentPage * songsPerPage));
          setTotalSongsCount(sorted.length);
          setTotalPages(Math.ceil(sorted.length / songsPerPage));
          
          const artists = new Set(sorted.map(s => formatArtists(s.artists).split(', ')[0])).size;
          const albums = new Set(sorted.map(s => s.album_name).filter(Boolean)).size;
          setUniqueArtistsCount(artists);
          setUniqueAlbumsCount(albums);
        }
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching songs:', err);
        setError('Unable to connect to the backend server. Please verify the server is running.');
        setIsLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchSongs();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [currentPage, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const toggleExpand = (docId) => {
    if (expandedSongId === docId) {
      setExpandedSongId(null);
    } else {
      setExpandedSongId(docId);
    }
  };

  const handleSearchLyrics = (songName) => {
    navigate('/main', { state: { initialQuery: songName } });
  };

  // Stats calculation
  const totalSongs = totalSongsCount;
  const uniqueArtists = uniqueArtistsCount;
  const uniqueAlbums = uniqueAlbumsCount;

  // Pagination Logic
  const paginatedSongs = songs;

  return (
    <div className="min-h-screen flex flex-col font-body-md text-primary antialiased bg-[#F7F6F3]">
      <Navbar />

      <main className="flex-grow pt-[120px] pb-stack-lg px-margin-mobile md:px-margin-desktop flex justify-center min-h-screen">
        <div className="w-full max-w-[800px] mx-auto text-left flex flex-col gap-stack-md mt-2">
          {/* Header Section */}
          <header className="flex flex-col gap-stack-sm mb-2">
            <p className="font-label-caps text-label-caps text-secondary tracking-widest uppercase mb-unit">SONG ARCHIVE</p>
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary tracking-tight">
              Indexed catalog,<br />
              at a <span className="italic font-light">glance</span>.
            </h1>
            <div className="w-[32px] h-[1px] bg-primary mt-4"></div>
          </header>

          {isLoading ? (
            <div className="flex flex-col items-center py-16 gap-4">
              <span className="material-symbols-outlined text-[48px] text-secondary animate-spin">sync</span>
              <p className="font-label-caps text-secondary uppercase tracking-widest text-xs">Loading Archive Index...</p>
            </div>
          ) : error ? (
            <div className="p-6 border border-error bg-[#ffdad6] text-error rounded-sm text-center">
              <p className="font-body-md font-semibold mb-2">{error}</p>
            </div>
          ) : (
            <>
              {/* Stats Panel */}
              <section className="grid grid-cols-3 border-t border-b border-[#E2E1DC] divide-x divide-[#E2E1DC] py-4 my-2">
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="font-headline-md text-[28px] leading-none text-primary mb-1">{totalSongs}</span>
                  <span className="font-label-caps text-[9px] tracking-wider text-secondary">TOTAL SONGS</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="font-headline-md text-[28px] leading-none text-primary mb-1">{uniqueArtists}</span>
                  <span className="font-label-caps text-[9px] tracking-wider text-secondary">ARTISTS</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="font-headline-md text-[28px] leading-none text-primary mb-1">{uniqueAlbums}</span>
                  <span className="font-label-caps text-[9px] tracking-wider text-secondary">ALBUMS</span>
                </div>
              </section>

              {/* Local Search Input */}
              <div className="relative flex items-center w-full mb-4 mt-2">
                <span className="material-symbols-outlined absolute left-3 text-[#BBBBB7] text-[20px]">search</span>
                <input
                  type="text"
                  id="archive-filter-input"
                  name="archive-filter-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#fdf8f7] hairline-all py-3 pl-10 pr-4 font-body-md text-primary placeholder-[#BBBBB7] rounded-sm focus:border-primary focus:ring-0 outline-none transition-colors duration-200"
                  placeholder="Filter by title, artist, or album..."
                />
                {searchTerm && (
                  <button
                    id="archive-filter-clear"
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 text-secondary hover:text-primary"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                )}
              </div>

              {/* Song List */}
              <div className="flex flex-col border border-[#E2E1DC] rounded-sm divide-y divide-[#E2E1DC] bg-[#fdf8f7] overflow-hidden">
                {/* Header Row */}
                <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-3 bg-[#F0EFEA] font-label-caps text-[10px] text-secondary uppercase tracking-wider font-semibold border-b border-[#E2E1DC]">
                  <div className="md:col-span-5">Song Title</div>
                  <div className="md:col-span-4">Artists</div>
                  <div className="md:col-span-3 text-right">Actions</div>
                </div>

                {paginatedSongs.length === 0 ? (
                  <div className="px-6 py-12 text-center text-secondary font-body-md">
                    No matching songs found in the archive index.
                  </div>
                ) : (
                  paginatedSongs.map((song) => {
                    const isExpanded = expandedSongId === song.doc_id;
                    const cleanSpotifyId = song.spotify_id
                      ? song.spotify_id.replace(/['"]+/g, '').trim()
                      : '';

                    return (
                      <div
                        key={song.doc_id}
                        className={`transition-colors duration-100 ${isExpanded ? 'bg-[#F0EFEA]' : 'hover:bg-[#F0EFEA]/40'}`}
                      >
                        {/* Main Info Row */}
                        <div
                          className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-6 py-4 items-center cursor-pointer"
                          onClick={() => toggleExpand(song.doc_id)}
                        >
                          <div className="md:col-span-5 flex flex-col">
                            <span className="font-body-md text-primary font-medium truncate">{song.name}</span>
                            <span className="font-metadata text-xs text-secondary md:hidden mt-0.5">
                              {formatArtists(song.artists)}
                            </span>
                            <span className="font-metadata text-xs text-[#BBBBB7] mt-0.5 truncate">
                              Album: {song.album_name || 'Unknown'}
                            </span>
                          </div>

                          <div className="hidden md:col-span-4 md:flex items-center text-secondary font-metadata text-[14px] truncate">
                            {formatArtists(song.artists)}
                          </div>

                          <div className="md:col-span-3 flex justify-start md:justify-end gap-3 mt-2 md:mt-0" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => toggleExpand(song.doc_id)}
                              className="px-3 py-1 text-xs border border-[#E2E1DC] hover:border-primary text-secondary hover:text-primary rounded-sm transition-colors flex items-center gap-1 font-label-caps uppercase"
                            >
                              <span className="material-symbols-outlined text-[14px]">{isExpanded ? 'expand_less' : 'play_arrow'}</span>
                              {isExpanded ? 'Close' : 'Listen'}
                            </button>
                            <Link
                              to="/main"
                              state={{ initialQuery: song.name }}
                              className="px-3 py-1 text-xs bg-primary text-white hover:bg-secondary rounded-sm transition-colors flex items-center gap-1 font-label-caps uppercase"
                            >
                              <span className="material-symbols-outlined text-[14px]">search</span>
                              Search
                            </Link>
                          </div>
                        </div>

                        {/* Expanded Player Section */}
                        {isExpanded && (
                          <div className="px-6 pb-5 pt-1 border-t border-[#E2E1DC]/40 flex flex-col gap-2">
                            {cleanSpotifyId ? (
                              <CompactSpotifyEmbed trackId={cleanSpotifyId} />
                            ) : (
                              <div className="p-4 bg-[#E2E1DC]/40 text-center font-metadata text-xs text-secondary rounded-sm">
                                Spotify integration unavailable for this song.
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="w-[28px] h-[28px] hairline-all flex items-center justify-center text-secondary hover:text-primary hover:border-primary disabled:opacity-30 disabled:pointer-events-none transition-colors rounded-sm"
                  >
                    <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                  </button>

                  <span className="font-metadata text-metadata text-secondary px-2">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="w-[28px] h-[28px] hairline-all flex items-center justify-center text-secondary hover:text-primary hover:border-primary disabled:opacity-30 disabled:pointer-events-none transition-colors rounded-sm"
                  >
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
