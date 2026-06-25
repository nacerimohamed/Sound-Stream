import React from "react";
import { Play, Heart, Clock, User, Disc, Music, Calendar } from "lucide-react";

export default function Details({ 
  currentPage, 
  artistId, 
  albumId, 
  songId, 
  songs, 
  artists, 
  albums, 
  setActiveTrack, 
  setIsPlaying, 
  favorites, 
  toggleFavorite,
  setCurrentPage,
  setArtistDetailsId,
  setAlbumDetailsId,
  setSongDetailsId
}) {

  const handlePlaySong = (song) => {
    setActiveTrack(song);
    setIsPlaying(true);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // 1. RENDERING ARTIST DETAILS
  if (currentPage === "artist-details") {
    const artist = artists.find(a => a.id === artistId);
    if (!artist) return <div style={{ color: "var(--text-muted)" }}>Artist not found</div>;

    const artistSongs = songs.filter(s => s.artistId === artist.id);
    const artistAlbums = albums.filter(al => al.artistId === artist.id);

    return (
      <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        {/* Banner Header */}
        <div 
          style={{
            height: "280px",
            borderRadius: "20px",
            background: `linear-gradient(to bottom, rgba(5,6,11,0.2), rgba(10,11,18,0.95)), url(${artist.banner}) center/cover no-repeat`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "32px",
            border: "1px solid rgba(255,255,255,0.05)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--accent-blue)", fontSize: "13px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "8px" }}>
            {artist.verified && <span>✓ Verified Artist</span>}
          </div>
          <h1 style={{ fontSize: "48px", fontWeight: "800", color: "#fff", margin: "0 0 8px", textShadow: "0 4px 15px rgba(0,0,0,0.5)" }}>
            {artist.name}
          </h1>
          <span style={{ fontSize: "14px", color: "var(--text-muted)", fontWeight: "500" }}>
            {artist.listeners} monthly listeners
          </span>
        </div>

        {/* Popular Songs Table */}
        <div>
          <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "16px" }}>Popular Tracks</h2>
          <div className="glass-effect" style={{ borderRadius: "14px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <tbody>
                {artistSongs.map((song, index) => {
                  const isLiked = favorites.includes(song.id);
                  return (
                    <tr 
                      key={song.id} 
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.02)", transition: "background-color 0.2s" }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)"}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                    >
                      <td style={{ padding: "12px 18px", width: "40px", color: "var(--text-muted)", fontWeight: "600", textAlign: "center" }}>
                        {index + 1}
                      </td>
                      <td style={{ padding: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
                        <img src={song.cover} alt={song.title} style={{ width: "36px", height: "36px", borderRadius: "4px", objectFit: "cover" }} />
                        <span 
                          onClick={() => { setSongDetailsId(song.id); setCurrentPage("song-details"); }}
                          style={{ fontWeight: "600", color: "#fff", cursor: "pointer" }}
                          onMouseOver={(e) => e.currentTarget.style.textDecoration = "underline"}
                          onMouseOut={(e) => e.currentTarget.style.textDecoration = "none"}
                        >
                          {song.title}
                        </span>
                      </td>
                      <td style={{ padding: "12px", color: "var(--text-muted)", fontSize: "13px" }} className="hide-on-mobile">
                        {song.plays.toLocaleString()} streams
                      </td>
                      <td style={{ padding: "12px", color: "var(--text-muted)", fontSize: "13px" }}>
                        {formatTime(song.duration)}
                      </td>
                      <td style={{ padding: "12px", textAlign: "center" }}>
                        <div style={{ display: "inline-flex", gap: "12px" }}>
                          <button 
                            onClick={() => toggleFavorite(song.id)}
                            style={{ background: "transparent", border: "none", color: isLiked ? "var(--accent-pink)" : "var(--text-muted)", cursor: "pointer" }}
                          >
                            <Heart size={14} fill={isLiked ? "var(--accent-pink)" : "none"} />
                          </button>
                          <button 
                            onClick={() => handlePlaySong(song)}
                            style={{
                              width: "28px",
                              height: "28px",
                              borderRadius: "50%",
                              background: "var(--gradient-primary)",
                              border: "none",
                              color: "#fff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer"
                            }}
                          >
                            <Play size={10} fill="#fff" style={{ marginLeft: "1px" }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Albums Row */}
        <div>
          <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "16px" }}>Albums</h2>
          <div className="card-grid">
            {artistAlbums.map(album => (
              <div 
                key={album.id}
                onClick={() => { setAlbumDetailsId(album.id); setCurrentPage("album-details"); }}
                className="glass-effect"
                style={{ borderRadius: "14px", padding: "16px", cursor: "pointer", border: "1px solid rgba(255,255,255,0.05)" }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-card-hover)"; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "var(--glass-bg)"; }}
              >
                <img src={album.cover} alt={album.title} style={{ width: "100%", aspectRatio: "1/1", borderRadius: "8px", objectFit: "cover", marginBottom: "12px" }} />
                <span style={{ fontSize: "14px", fontWeight: "700", color: "#fff", display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {album.title}
                </span>
                <span style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px", display: "block" }}>
                  {album.year} • Album
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* About Bio Section */}
        <div className="glass-effect" style={{ borderRadius: "16px", padding: "32px", border: "1px solid rgba(255,255,255,0.05)", position: "relative", overflow: "hidden" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "12px", color: "#fff" }}>About</h2>
          <p style={{ fontSize: "15px", color: "var(--text-muted)", lineHeight: "1.6", maxWidth: "800px", zIndex: 2, position: "relative" }}>
            {artist.bio}
          </p>
          <div style={{ fontSize: "13px", color: "var(--accent-purple)", marginTop: "16px", fontWeight: "600", zIndex: 2, position: "relative" }}>
            Genres: {artist.genres.join(" • ")}
          </div>
        </div>
      </div>
    );
  }

  // 2. RENDERING ALBUM DETAILS
  if (currentPage === "album-details") {
    const album = albums.find(al => al.id === albumId);
    if (!album) return <div style={{ color: "var(--text-muted)" }}>Album not found</div>;

    const albumSongs = songs.filter(s => s.albumId === album.id);
    const artist = artists.find(a => a.id === album.artistId);

    return (
      <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        
        {/* Album Header Block */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "28px", alignItems: "flex-end" }}>
          <img 
            src={album.cover} 
            alt={album.title} 
            style={{ width: "220px", height: "220px", borderRadius: "16px", objectFit: "cover", boxShadow: "0 10px 25px rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.08)" }} 
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--accent-purple)" }}>
              Album
            </span>
            <h1 style={{ fontSize: "36px", fontWeight: "800", color: "#fff", margin: 0, lineHeight: 1.1 }}>
              {album.title}
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", fontSize: "14px", color: "var(--text-muted)" }}>
              {artist && (
                <img 
                  src={artist.avatar} 
                  alt={artist.name} 
                  style={{ width: "24px", height: "24px", borderRadius: "50%", objectFit: "cover" }} 
                />
              )}
              <strong 
                onClick={() => { setArtistDetailsId(album.artistId); setCurrentPage("artist-details"); }}
                style={{ color: "#fff", cursor: "pointer" }}
                onMouseOver={(e) => e.currentTarget.style.textDecoration = "underline"}
                onMouseOut={(e) => e.currentTarget.style.textDecoration = "none"}
              >
                {album.artistName}
              </strong>
              <span>•</span>
              <span>{album.year}</span>
              <span>•</span>
              <span>{albumSongs.length} songs</span>
            </div>
          </div>
        </div>

        {/* Tracks List */}
        <div>
          <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
            {albumSongs.length > 0 && (
              <button
                onClick={() => handlePlaySong(albumSongs[0])}
                className="btn-glow-purple"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 24px",
                  background: "var(--gradient-primary)",
                  border: "none",
                  borderRadius: "99px",
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: "14px",
                  cursor: "pointer"
                }}
              >
                <Play size={16} fill="#fff" />
                PLAY ALL
              </button>
            )}
          </div>

          <div className="glass-effect" style={{ borderRadius: "14px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-color)", color: "var(--text-muted)", fontSize: "13px" }}>
                  <th style={{ padding: "14px 18px", width: "50px", textAlign: "center" }}>#</th>
                  <th style={{ padding: "14px" }}>Title</th>
                  <th style={{ padding: "14px", width: "100px" }}><Clock size={15} style={{ display: "inline-block", verticalAlign: "middle" }} /></th>
                  <th style={{ padding: "14px", width: "80px", textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {albumSongs.map((song, idx) => {
                  const isLiked = favorites.includes(song.id);
                  return (
                    <tr 
                      key={song.id}
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.02)", transition: "background-color 0.2s" }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)"}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                    >
                      <td style={{ padding: "12px 18px", textAlign: "center", color: "var(--text-muted)", fontWeight: "600" }}>
                        {idx + 1}
                      </td>
                      <td style={{ padding: "12px" }}>
                        <span 
                          onClick={() => { setSongDetailsId(song.id); setCurrentPage("song-details"); }}
                          style={{ fontWeight: "600", color: "#fff", cursor: "pointer" }}
                          onMouseOver={(e) => e.currentTarget.style.textDecoration = "underline"}
                          onMouseOut={(e) => e.currentTarget.style.textDecoration = "none"}
                        >
                          {song.title}
                        </span>
                      </td>
                      <td style={{ padding: "12px", color: "var(--text-muted)", fontSize: "13px" }}>
                        {formatTime(song.duration)}
                      </td>
                      <td style={{ padding: "12px", textAlign: "center" }}>
                        <div style={{ display: "inline-flex", gap: "10px" }}>
                          <button 
                            onClick={() => toggleFavorite(song.id)}
                            style={{ background: "transparent", border: "none", color: isLiked ? "var(--accent-pink)" : "var(--text-muted)", cursor: "pointer" }}
                          >
                            <Heart size={14} fill={isLiked ? "var(--accent-pink)" : "none"} />
                          </button>
                          <button 
                            onClick={() => handlePlaySong(song)}
                            style={{
                              width: "28px",
                              height: "28px",
                              borderRadius: "50%",
                              background: "rgba(255,255,255,0.06)",
                              border: "none",
                              color: "var(--text-active)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer"
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = "var(--gradient-primary)"}
                            onMouseOut={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
                          >
                            <Play size={10} fill="currentColor" style={{ marginLeft: "1px" }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Album Bio description */}
        <div className="glass-effect" style={{ borderRadius: "16px", padding: "24px", border: "1px solid rgba(255,255,255,0.05)" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "8px", color: "#fff" }}>Album Info</h3>
          <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: "1.6" }}>
            {album.description}
          </p>
          <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "12px" }}>
            Genre: {album.genre}
          </div>
        </div>

      </div>
    );
  }

  // 3. RENDERING SONG DETAILS WITH SCROLLING LYRICS
  if (currentPage === "song-details") {
    const song = songs.find(s => s.id === songId);
    if (!song) return <div style={{ color: "var(--text-muted)" }}>Song not found</div>;

    const album = albums.find(al => al.id === song.albumId);
    const artist = artists.find(a => a.id === song.artistId);
    const isLiked = favorites.includes(song.id);

    // Filter recommended songs (same artist or same genre, excluding itself)
    const recommendedSongs = songs
      .filter(s => s.id !== song.id && (s.artistId === song.artistId || s.genre === song.genre))
      .slice(0, 3);

    return (
      <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        
        {/* Main Details Panel Split */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "32px" }}>
          
          {/* Left panel: Song Art & Info */}
          <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <img 
              src={song.cover} 
              alt={song.title} 
              style={{ width: "100%", aspectRatio: "1/1", borderRadius: "16px", objectFit: "cover", boxShadow: "0 12px 30px rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.08)" }} 
            />
            
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#fff", margin: 0 }}>
                  {song.title}
                </h1>
                <button 
                  onClick={() => toggleFavorite(song.id)}
                  style={{ background: "transparent", border: "none", color: isLiked ? "var(--accent-pink)" : "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center" }}
                >
                  <Heart size={22} fill={isLiked ? "var(--accent-pink)" : "none"} />
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "14px", color: "var(--text-muted)" }}>
                <span>Artist: <strong onClick={() => { setArtistDetailsId(song.artistId); setCurrentPage("artist-details"); }} style={{ color: "#fff", cursor: "pointer", textDecoration: "underline" }}>{song.artistName}</strong></span>
                <span>Album: <span onClick={() => { setAlbumDetailsId(song.albumId); setCurrentPage("album-details"); }} style={{ color: "#fff", cursor: "pointer", textDecoration: "underline" }}>{song.albumName}</span></span>
                <span>Genre: <span style={{ color: "var(--accent-blue)", fontWeight: "500" }}>{song.genre}</span></span>
                <span>Plays: <span style={{ color: "var(--text-active)" }}>{song.plays.toLocaleString()}</span></span>
              </div>
            </div>

            <button
              onClick={() => handlePlaySong(song)}
              className="btn-glow-purple"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "14px",
                background: "var(--gradient-primary)",
                border: "none",
                borderRadius: "99px",
                color: "#fff",
                fontWeight: "700",
                fontSize: "15px",
                cursor: "pointer",
                width: "100%"
              }}
            >
              <Play size={18} fill="#fff" />
              PLAY NOW
            </button>
          </div>

          {/* Right panel: Beautiful scrolling lyrics box */}
          <div style={{ flex: "1.5 1 400px", display: "flex", flexDirection: "column", height: "450px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "16px", color: "#fff" }}>Lyrics</h2>
            <div 
              className="glass-effect"
              style={{
                flexGrow: 1,
                borderRadius: "16px",
                padding: "24px",
                overflowY: "auto",
                border: "1px solid rgba(255,255,255,0.06)",
                background: "linear-gradient(180deg, rgba(18, 19, 30, 0.45) 0%, rgba(10, 11, 18, 0.7) 100%)"
              }}
            >
              <pre style={{
                fontFamily: "inherit",
                fontSize: "16px",
                lineHeight: "1.8",
                color: "var(--text-active)",
                whiteSpace: "pre-line",
                fontWeight: "500",
                letterSpacing: "0.2px"
              }}>
                {song.lyrics}
              </pre>
            </div>
          </div>
        </div>

        {/* Recommended Tracks Section */}
        <div>
          <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "16px" }}>You Might Also Like</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {recommendedSongs.map((rec) => (
              <div 
                key={rec.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 16px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.02)"
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)"}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)"}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <img src={rec.cover} alt={rec.title} style={{ width: "36px", height: "36px", borderRadius: "6px", objectFit: "cover" }} />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span 
                      onClick={() => { setSongDetailsId(rec.id); }}
                      style={{ fontSize: "14px", fontWeight: "600", color: "#fff", cursor: "pointer" }}
                      onMouseOver={(e) => e.currentTarget.style.textDecoration = "underline"}
                      onMouseOut={(e) => e.currentTarget.style.textDecoration = "none"}
                    >
                      {rec.title}
                    </span>
                    <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{rec.artistName}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handlePlaySong(rec)}
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.06)",
                    border: "none",
                    color: "var(--text-active)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer"
                  }}
                >
                  <Play size={10} fill="currentColor" style={{ marginLeft: "1px" }} />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    );
  }

  return null;
}
