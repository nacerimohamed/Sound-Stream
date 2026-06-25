import React from "react";
import { Play, Flame, Disc, Radio, Eye } from "lucide-react";

export default function Home({ 
  songs, 
  artists, 
  albums, 
  setActiveTrack, 
  setIsPlaying, 
  setCurrentPage, 
  setArtistDetailsId, 
  setAlbumDetailsId, 
  setSongDetailsId 
}) {
  
  // Find featured items
  const featuredSong = songs.find(s => s.id === "s10") || songs[0];
  const trendingSongs = songs.slice(0, 5);
  const featuredArtists = artists.slice(0, 5);
  const featuredAlbums = albums.slice(0, 5);

  const handlePlaySong = (song) => {
    setActiveTrack(song);
    setIsPlaying(true);
  };

  const handleArtistClick = (artistId) => {
    setArtistDetailsId(artistId);
    setCurrentPage("artist-details");
  };

  const handleAlbumClick = (albumId) => {
    setAlbumDetailsId(albumId);
    setCurrentPage("album-details");
  };

  const handleSongClick = (songId) => {
    setSongDetailsId(songId);
    setCurrentPage("song-details");
  };

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      
      {/* 1. Hero Section */}
      <div 
        className="glass-effect"
        style={{
          borderRadius: "20px",
          padding: "48px",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          minHeight: "280px",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
          background: "linear-gradient(to right, rgba(10, 11, 18, 0.9) 30%, rgba(10, 11, 18, 0.4)), url('https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=1200&h=400&fit=crop') center/cover no-repeat"
        }}
      >
        <div style={{ zIndex: 2, maxWidth: "600px" }}>
          <span style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "2.5px", color: "var(--accent-blue)", display: "inline-block", marginBottom: "8px" }}>
            Trending Release
          </span>
          <h1 style={{ fontSize: "42px", fontWeight: "800", color: "#fff", margin: "0 0 12px", lineHeight: "1.1", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
            {featuredSong.title}
          </h1>
          <p style={{ fontSize: "16px", color: "var(--text-muted)", marginBottom: "24px", lineHeight: "1.5" }}>
            Experience the new hit track by <strong style={{ color: "#fff" }}>{featuredSong.artistName}</strong> from the album <span style={{ fontStyle: "italic" }}>{featuredSong.albumName}</span>. Deep basslines, futuristic synth riffs, and ethereal vocals.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button 
              onClick={() => handlePlaySong(featuredSong)}
              className="btn-glow-purple"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 32px",
                background: "var(--gradient-primary)",
                border: "none",
                borderRadius: "99px",
                color: "#fff",
                fontWeight: "700",
                fontSize: "15px",
                cursor: "pointer"
              }}
            >
              <Play size={18} fill="#fff" />
              PLAY NOW
            </button>
            <button 
              onClick={() => handleSongClick(featuredSong.id)}
              style={{
                padding: "12px 28px",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "99px",
                color: "#fff",
                fontWeight: "600",
                fontSize: "15px",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.15)"}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)"}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* 2. Trending Songs Section */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
          <Flame size={20} color="var(--accent-purple)" />
          <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "700" }}>Trending Songs</h2>
        </div>

        <div className="glass-effect" style={{ borderRadius: "14px", overflow: "hidden", border: "1px solid var(--border-color)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color)", color: "var(--text-muted)", fontSize: "13px" }}>
                <th style={{ padding: "16px 20px", width: "60px", textAlign: "center" }}>#</th>
                <th style={{ padding: "16px" }}>Title</th>
                <th style={{ padding: "16px" }} className="hide-on-mobile">Album</th>
                <th style={{ padding: "16px", width: "120px" }} className="hide-on-mobile">Plays</th>
                <th style={{ padding: "16px", width: "100px", textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {trendingSongs.map((song, index) => (
                <tr 
                  key={song.id} 
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", transition: "background-color 0.2s" }}
                  className="song-row-hover"
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.03)"}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  <td style={{ padding: "14px 20px", textAlign: "center", color: "var(--text-muted)", fontWeight: "600" }}>
                    {index + 1}
                  </td>
                  <td style={{ padding: "14px", display: "flex", alignItems: "center", gap: "12px" }}>
                    <img 
                      src={song.cover} 
                      alt={song.title} 
                      style={{ width: "40px", height: "40px", borderRadius: "6px", objectFit: "cover" }} 
                    />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span 
                        onClick={() => handleSongClick(song.id)}
                        style={{ fontWeight: "600", color: "#fff", cursor: "pointer" }}
                        onMouseOver={(e) => e.currentTarget.style.textDecoration = "underline"}
                        onMouseOut={(e) => e.currentTarget.style.textDecoration = "none"}
                      >
                        {song.title}
                      </span>
                      <span 
                        onClick={() => handleArtistClick(song.artistId)}
                        style={{ fontSize: "12px", color: "var(--text-muted)", cursor: "pointer" }}
                        onMouseOver={(e) => e.currentTarget.style.textDecoration = "underline"}
                        onMouseOut={(e) => e.currentTarget.style.textDecoration = "none"}
                      >
                        {song.artistName}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "14px", color: "var(--text-muted)" }} className="hide-on-mobile">
                    <span 
                      onClick={() => handleAlbumClick(song.albumId)}
                      style={{ cursor: "pointer" }}
                      onMouseOver={(e) => e.currentTarget.style.textDecoration = "underline"}
                      onMouseOut={(e) => e.currentTarget.style.textDecoration = "none"}
                    >
                      {song.albumName}
                    </span>
                  </td>
                  <td style={{ padding: "14px", color: "var(--text-muted)", fontSize: "13px" }} className="hide-on-mobile">
                    {song.plays.toLocaleString()}
                  </td>
                  <td style={{ padding: "14px", textAlign: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                      <button 
                        onClick={() => handlePlaySong(song)}
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          background: "var(--gradient-primary)",
                          border: "none",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          transition: "transform 0.1s"
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                        onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                        title="Play"
                      >
                        <Play size={12} fill="#fff" style={{ marginLeft: "1px" }} />
                      </button>
                      <button 
                        onClick={() => handleSongClick(song.id)}
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          background: "rgba(255, 255, 255, 0.08)",
                          border: "none",
                          color: "var(--text-muted)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          transition: "color 0.2s"
                        }}
                        onMouseOver={(e) => e.currentTarget.style.color = "#fff"}
                        onMouseOut={(e) => e.currentTarget.style.color = "var(--text-muted)"}
                        title="View Details"
                      >
                        <Eye size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Featured Artists Section */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
          <Radio size={20} color="var(--accent-blue)" />
          <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "700" }}>Featured Artists</h2>
        </div>

        <div style={{ display: "flex", gap: "24px", overflowX: "auto", paddingBottom: "10px", scrollbarWidth: "none" }}>
          {featuredArtists.map((artist) => (
            <div 
              key={artist.id}
              onClick={() => handleArtistClick(artist.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: "130px",
                cursor: "pointer",
                transition: "transform 0.3s ease"
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-6px)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{ position: "relative", marginBottom: "12px" }}>
                <img 
                  src={artist.avatar} 
                  alt={artist.name} 
                  style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(255,255,255,0.05)", boxShadow: "0 8px 20px rgba(0,0,0,0.3)" }} 
                />
                {artist.verified && (
                  <span style={{
                    position: "absolute",
                    bottom: "2px",
                    right: "2px",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: "var(--accent-blue)",
                    color: "#fff",
                    fontSize: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    border: "2px solid var(--bg-main)"
                  }}>
                    ✓
                  </span>
                )}
              </div>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#fff", textAlign: "center" }}>
                {artist.name}
              </span>
              <span style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>
                Artist
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Albums Grid Section */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
          <Disc size={20} color="var(--accent-purple)" />
          <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "700" }}>Popular Albums</h2>
        </div>

        <div className="card-grid">
          {featuredAlbums.map((album) => (
            <div 
              key={album.id}
              onClick={() => handleAlbumClick(album.id)}
              className="glass-effect"
              style={{
                borderRadius: "14px",
                padding: "16px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "var(--bg-card-hover)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = "rgba(157, 78, 221, 0.25)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "var(--glass-bg)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
              }}
            >
              <img 
                src={album.cover} 
                alt={album.title} 
                style={{ width: "100%", aspectRatio: "1/1", borderRadius: "10px", objectFit: "cover", boxShadow: "0 6px 14px rgba(0,0,0,0.4)" }} 
              />
              <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
                <span style={{ fontSize: "14px", fontWeight: "700", color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {album.title}
                </span>
                <span style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {album.artistName}
                </span>
                <span style={{ fontSize: "11px", color: "var(--accent-blue)", marginTop: "6px", fontWeight: "500" }}>
                  {album.year} • Album
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
