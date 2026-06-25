import React, { useState } from "react";
import { Play, Music, User, Disc, Search as SearchIcon } from "lucide-react";

export default function Search({ 
  songs, 
  artists, 
  albums, 
  searchQuery, 
  setSearchQuery, 
  setActiveTrack, 
  setIsPlaying,
  setCurrentPage,
  setArtistDetailsId,
  setAlbumDetailsId,
  setSongDetailsId
}) {
  const [filterType, setFilterType] = useState("all");

  const categories = [
    { name: "Synthwave", color: "linear-gradient(135deg, #7b2cbf 0%, #aa3bff 100%)" },
    { name: "Pop", color: "linear-gradient(135deg, #ff007f 0%, #ff5e62 100%)" },
    { name: "Cinematic", color: "linear-gradient(135deg, #0077b6 0%, #00b4d8 100%)" },
    { name: "R&B", color: "linear-gradient(135deg, #9d4edd 0%, #0077b6 100%)" },
    { name: "Electronic", color: "linear-gradient(135deg, #ffb703 0%, #fb8500 100%)" },
    { name: "Alt-Pop", color: "linear-gradient(135deg, #03001e 0%, #7303c0 50%, #ec38bc 100%)" },
    { name: "Disco", color: "linear-gradient(135deg, #3a0ca3 0%, #f72585 100%)" },
    { name: "Chill", color: "linear-gradient(135deg, #00f5d4 0%, #00b4d8 100%)" }
  ];

  // Perform search logic
  const query = searchQuery.toLowerCase().trim();
  
  const filteredSongs = songs.filter(s => 
    s.title.toLowerCase().includes(query) || 
    s.artistName.toLowerCase().includes(query) ||
    s.genre.toLowerCase().includes(query)
  );

  const filteredArtists = artists.filter(a => 
    a.name.toLowerCase().includes(query) ||
    a.genres.some(g => g.toLowerCase().includes(query))
  );

  const filteredAlbums = albums.filter(al => 
    al.title.toLowerCase().includes(query) || 
    al.artistName.toLowerCase().includes(query) ||
    al.genre.toLowerCase().includes(query)
  );

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

  // Determine top result
  let topResult = null;
  if (query) {
    // Check if artist matches exactly
    const artistMatch = filteredArtists.find(a => a.name.toLowerCase() === query);
    if (artistMatch) {
      topResult = { ...artistMatch, type: "artist" };
    } else if (filteredSongs.length > 0) {
      topResult = { ...filteredSongs[0], type: "song" };
    } else if (filteredAlbums.length > 0) {
      topResult = { ...filteredAlbums[0], type: "album" };
    } else if (filteredArtists.length > 0) {
      topResult = { ...filteredArtists[0], type: "artist" };
    }
  }

  const handleCategoryClick = (catName) => {
    setSearchQuery(catName);
  };

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      
      {/* 1. Chips for Filter Types */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {["all", "songs", "albums", "artists"].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            style={{
              padding: "8px 20px",
              borderRadius: "99px",
              background: filterType === type ? "var(--accent-purple)" : "rgba(255,255,255,0.06)",
              color: filterType === type ? "#fff" : "var(--text-muted)",
              border: "none",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              textTransform: "capitalize",
              transition: "all 0.2s"
            }}
            onMouseOver={(e) => {
              if (filterType !== type) e.currentTarget.style.background = "rgba(255,255,255,0.12)";
            }}
            onMouseOut={(e) => {
              if (filterType !== type) e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* 2. Empty State: Category Grid */}
      {!query ? (
        <div>
          <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "20px" }}>Browse all categories</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "20px" }}>
            {categories.map((cat, idx) => (
              <div
                key={idx}
                onClick={() => handleCategoryClick(cat.name)}
                style={{
                  height: "140px",
                  borderRadius: "16px",
                  background: cat.color,
                  padding: "20px",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: "0 6px 15px rgba(0,0,0,0.25)",
                  transition: "transform 0.2s ease"
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.03)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                <span style={{ fontSize: "18px", fontWeight: "800", color: "#fff", display: "block", wordBreak: "break-word" }}>
                  {cat.name}
                </span>
                <div style={{
                  position: "absolute",
                  bottom: "-15px",
                  right: "-15px",
                  opacity: 0.25,
                  transform: "rotate(25deg)"
                }}>
                  <Music size={80} color="#fff" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* 3. Search Results State */
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          
          {/* Top Result & Songs Panel */}
          {filterType === "all" && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "28px" }}>
              {/* Top Result Card */}
              {topResult && (
                <div style={{ flex: "1 1 350px", minWidth: "300px" }}>
                  <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "16px" }}>Top Result</h2>
                  <div 
                    className="glass-effect"
                    style={{
                      borderRadius: "16px",
                      padding: "24px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                      position: "relative",
                      border: "1px solid rgba(255,255,255,0.06)",
                      height: "calc(100% - 36px)"
                    }}
                  >
                    <img 
                      src={topResult.avatar || topResult.cover} 
                      alt={topResult.name || topResult.title} 
                      style={{ 
                        width: "80px", 
                        height: "80px", 
                        borderRadius: topResult.type === "artist" ? "50%" : "8px", 
                        objectFit: "cover",
                        boxShadow: "0 6px 15px rgba(0,0,0,0.3)" 
                      }} 
                    />
                    <div>
                      <h3 
                        onClick={() => {
                          if (topResult.type === "artist") handleArtistClick(topResult.id);
                          if (topResult.type === "album") handleAlbumClick(topResult.id);
                          if (topResult.type === "song") handleSongClick(topResult.id);
                        }}
                        style={{ fontSize: "24px", fontWeight: "800", color: "#fff", margin: "0 0 6px", cursor: "pointer" }}
                        onMouseOver={(e) => e.currentTarget.style.textDecoration = "underline"}
                        onMouseOut={(e) => e.currentTarget.style.textDecoration = "none"}
                      >
                        {topResult.name || topResult.title}
                      </h3>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "11px", fontWeight: "600", textTransform: "uppercase", padding: "3px 8px", background: "rgba(255,255,255,0.1)", borderRadius: "99px", color: "var(--text-active)" }}>
                          {topResult.type}
                        </span>
                        {topResult.type === "song" && (
                          <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                            By {topResult.artistName}
                          </span>
                        )}
                      </div>
                    </div>

                    {topResult.type === "song" && (
                      <button
                        onClick={() => handlePlaySong(topResult)}
                        className="btn-glow-purple"
                        style={{
                          position: "absolute",
                          bottom: "24px",
                          right: "24px",
                          width: "48px",
                          height: "48px",
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
                        <Play size={20} fill="#fff" style={{ marginLeft: "2px" }} />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Songs Column */}
              <div style={{ flex: "2 1 450px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "16px" }}>Songs</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {filteredSongs.slice(0, 4).map((song) => (
                    <div 
                      key={song.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        background: "rgba(255,255,255,0.02)",
                        transition: "background-color 0.2s"
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)"}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)"}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", overflow: "hidden" }}>
                        <img src={song.cover} alt={song.title} style={{ width: "36px", height: "36px", borderRadius: "6px", objectFit: "cover" }} />
                        <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
                          <span 
                            onClick={() => handleSongClick(song.id)}
                            style={{ fontSize: "14px", fontWeight: "600", color: "#fff", cursor: "pointer", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                            onMouseOver={(e) => e.currentTarget.style.textDecoration = "underline"}
                            onMouseOut={(e) => e.currentTarget.style.textDecoration = "none"}
                          >
                            {song.title}
                          </span>
                          <span 
                            onClick={() => handleArtistClick(song.artistId)}
                            style={{ fontSize: "12px", color: "var(--text-muted)", cursor: "pointer", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                            onMouseOver={(e) => e.currentTarget.style.textDecoration = "underline"}
                            onMouseOut={(e) => e.currentTarget.style.textDecoration = "none"}
                          >
                            {song.artistName}
                          </span>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
                            cursor: "pointer"
                          }}
                        >
                          <Play size={12} fill="#fff" style={{ marginLeft: "1px" }} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {filteredSongs.length === 0 && (
                    <span style={{ fontSize: "13px", color: "var(--text-muted)", fontStyle: "italic", padding: "10px" }}>No songs found</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Songs Only List */}
          {filterType === "songs" && (
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "16px" }}>Matching Songs</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {filteredSongs.map((song) => (
                  <div 
                    key={song.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 18px",
                      borderRadius: "12px",
                      background: "rgba(255,255,255,0.02)"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)"}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)"}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <img src={song.cover} alt={song.title} style={{ width: "40px", height: "40px", borderRadius: "6px", objectFit: "cover" }} />
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
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>{song.genre}</span>
                      <button 
                        onClick={() => handlePlaySong(song)}
                        style={{
                          width: "36px",
                          height: "36px",
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
                        <Play size={14} fill="#fff" style={{ marginLeft: "1px" }} />
                      </button>
                    </div>
                  </div>
                ))}
                {filteredSongs.length === 0 && (
                  <span style={{ fontSize: "13px", color: "var(--text-muted)", fontStyle: "italic" }}>No songs match your search</span>
                )}
              </div>
            </div>
          )}

          {/* Albums Row / Grid */}
          {(filterType === "all" || filterType === "albums") && (
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "16px" }}>Albums</h2>
              <div className="card-grid">
                {filteredAlbums.map((album) => (
                  <div
                    key={album.id}
                    onClick={() => handleAlbumClick(album.id)}
                    className="glass-effect"
                    style={{
                      borderRadius: "14px",
                      padding: "16px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      border: "1px solid rgba(255, 255, 255, 0.05)"
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--bg-card-hover)";
                      e.currentTarget.style.transform = "translateY(-4px)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--glass-bg)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <img src={album.cover} alt={album.title} style={{ width: "100%", aspectRatio: "1/1", borderRadius: "8px", objectFit: "cover", marginBottom: "12px" }} />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ fontSize: "14px", fontWeight: "700", color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {album.title}
                      </span>
                      <span style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>
                        {album.artistName}
                      </span>
                    </div>
                  </div>
                ))}
                {filteredAlbums.length === 0 && (
                  <span style={{ fontSize: "13px", color: "var(--text-muted)", fontStyle: "italic", gridColumn: "1/-1" }}>No albums match your search</span>
                )}
              </div>
            </div>
          )}

          {/* Artists Row / Grid */}
          {(filterType === "all" || filterType === "artists") && (
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "16px" }}>Artists</h2>
              <div style={{ display: "flex", gap: "20px", overflowX: "auto", paddingBottom: "10px" }}>
                {filteredArtists.map((artist) => (
                  <div
                    key={artist.id}
                    onClick={() => handleArtistClick(artist.id)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      minWidth: "120px",
                      cursor: "pointer",
                      transition: "transform 0.2s"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
                    onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
                  >
                    <img 
                      src={artist.avatar} 
                      alt={artist.name} 
                      style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", marginBottom: "10px", border: "1px solid rgba(255,255,255,0.05)" }} 
                    />
                    <span style={{ fontSize: "13px", fontWeight: "600", color: "#fff", textAlign: "center" }}>
                      {artist.name}
                    </span>
                    <span style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
                      Artist
                    </span>
                  </div>
                ))}
                {filteredArtists.length === 0 && (
                  <span style={{ fontSize: "13px", color: "var(--text-muted)", fontStyle: "italic" }}>No artists match your search</span>
                )}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
