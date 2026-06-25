import React, { useState } from "react";
import { Play, Heart, Trash2, Edit, Plus, Music, ShieldAlert } from "lucide-react";

export default function PlaylistPage({
  currentPage,
  playlist,
  playlists,
  setPlaylists,
  songs,
  favorites,
  toggleFavorite,
  setActiveTrack,
  setIsPlaying,
  setCurrentPage,
  setSongDetailsId,
  user
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [renameValue, setRenameValue] = useState("");
  const [descValue, setDescValue] = useState("");

  const handlePlaySong = (song) => {
    setActiveTrack(song);
    setIsPlaying(true);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // 1. RENDERING FAVORITES (LIKED SONGS)
  if (currentPage === "favorites") {
    const favoriteSongs = songs.filter(s => favorites.includes(s.id));

    const handlePlayAllFavorites = () => {
      if (favoriteSongs.length > 0) {
        handlePlaySong(favoriteSongs[0]);
      }
    };

    return (
      <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        
        {/* Pink Glow Header */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "28px", alignItems: "flex-end" }}>
          <div style={{
            width: "220px",
            height: "220px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #ff007f 0%, #7b2cbf 100%)",
            boxShadow: "0 10px 30px rgba(255, 0, 127, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(255,255,255,0.1)"
          }}>
            <Heart size={80} fill="#fff" color="#fff" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--accent-pink)" }}>
              Playlist
            </span>
            <h1 style={{ fontSize: "48px", fontWeight: "800", color: "#fff", margin: 0 }}>
              Liked Songs
            </h1>
            <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>
              {user ? user.name : "Guest User"} • {favoriteSongs.length} songs
            </span>
          </div>
        </div>

        {/* Action controls */}
        <div style={{ display: "flex", gap: "12px" }}>
          {favoriteSongs.length > 0 && (
            <button
              onClick={handlePlayAllFavorites}
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
              PLAY ALL
            </button>
          )}
        </div>

        {/* Tracks Table */}
        <div className="glass-effect" style={{ borderRadius: "14px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color)", color: "var(--text-muted)", fontSize: "13px" }}>
                <th style={{ padding: "14px 18px", width: "50px", textAlign: "center" }}>#</th>
                <th style={{ padding: "14px" }}>Title</th>
                <th style={{ padding: "14px" }} className="hide-on-mobile">Album</th>
                <th style={{ padding: "14px", width: "100px" }}>Duration</th>
                <th style={{ padding: "14px", width: "100px", textAlign: "center" }}>Remove</th>
              </tr>
            </thead>
            <tbody>
              {favoriteSongs.map((song, idx) => (
                <tr 
                  key={song.id}
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.02)", transition: "background-color 0.2s" }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)"}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  <td style={{ padding: "12px 18px", textAlign: "center", color: "var(--text-muted)", fontWeight: "600" }}>
                    {idx + 1}
                  </td>
                  <td style={{ padding: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
                    <img src={song.cover} alt={song.title} style={{ width: "36px", height: "36px", borderRadius: "4px", objectFit: "cover" }} />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span 
                        onClick={() => { setSongDetailsId(song.id); setCurrentPage("song-details"); }}
                        style={{ fontWeight: "600", color: "#fff", cursor: "pointer" }}
                        onMouseOver={(e) => e.currentTarget.style.textDecoration = "underline"}
                        onMouseOut={(e) => e.currentTarget.style.textDecoration = "none"}
                      >
                        {song.title}
                      </span>
                      <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{song.artistName}</span>
                    </div>
                  </td>
                  <td style={{ padding: "12px", color: "var(--text-muted)" }} className="hide-on-mobile">
                    {song.albumName}
                  </td>
                  <td style={{ padding: "12px", color: "var(--text-muted)", fontSize: "13px" }}>
                    {formatTime(song.duration)}
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    <button 
                      onClick={() => toggleFavorite(song.id)}
                      style={{ background: "transparent", border: "none", color: "var(--accent-pink)", cursor: "pointer", transition: "transform 0.1s" }}
                      onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.15)"}
                      onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {favoriteSongs.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: "32px", textAlign: "center", color: "var(--text-muted)", fontStyle: "italic" }}>
                    Your liked songs will appear here. Find songs you love and click the Heart icon!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // 2. RENDERING CUSTOM PLAYLIST DETAILS
  if (currentPage === "playlist" && playlist) {
    const playlistSongs = songs.filter(s => playlist.tracks.includes(s.id));

    // Songs not in this playlist (for addition)
    const availableSongs = songs.filter(s => !playlist.tracks.includes(s.id));

    const handlePlayAllPlaylist = () => {
      if (playlistSongs.length > 0) {
        handlePlaySong(playlistSongs[0]);
      }
    };

    const handleSavePlaylistEdit = (e) => {
      e.preventDefault();
      const updatedPlaylists = playlists.map(p => {
        if (p.id === playlist.id) {
          return { ...p, name: renameValue || p.name, description: descValue || p.description };
        }
        return p;
      });
      setPlaylists(updatedPlaylists);
      setIsEditing(false);
      // update active playlist object in App state
      playlist.name = renameValue || playlist.name;
      playlist.description = descValue || playlist.description;
    };

    const startEditing = () => {
      setRenameValue(playlist.name);
      setDescValue(playlist.description);
      setIsEditing(true);
    };

    const handleDeletePlaylist = () => {
      if (confirm(`Are you sure you want to delete "${playlist.name}"?`)) {
        const filtered = playlists.filter(p => p.id !== playlist.id);
        setPlaylists(filtered);
        setCurrentPage("home");
      }
    };

    const addSongToPlaylist = (songId) => {
      const updated = playlists.map(p => {
        if (p.id === playlist.id) {
          return { ...p, tracks: [...p.tracks, songId] };
        }
        return p;
      });
      setPlaylists(updated);
      playlist.tracks.push(songId); // sync state
    };

    const removeSongFromPlaylist = (songId) => {
      const updated = playlists.map(p => {
        if (p.id === playlist.id) {
          return { ...p, tracks: p.tracks.filter(tid => tid !== songId) };
        }
        return p;
      });
      setPlaylists(updated);
      playlist.tracks = playlist.tracks.filter(tid => tid !== songId); // sync state
    };

    return (
      <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        
        {/* Playlist Header Block */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "28px", alignItems: "flex-end" }}>
          <div style={{
            width: "220px",
            height: "220px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #7b2cbf 0%, #00b4d8 100%)",
            boxShadow: "0 10px 30px rgba(123, 44, 191, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(255,255,255,0.1)",
            overflow: "hidden"
          }}>
            {playlist.cover ? (
              <img src={playlist.cover} alt={playlist.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <Music size={80} color="#fff" />
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", flexGrow: 1 }}>
            <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--accent-blue)" }}>
              Playlist
            </span>

            {isEditing ? (
              <form onSubmit={handleSavePlaylistEdit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
                <input 
                  type="text" 
                  value={renameValue} 
                  onChange={(e) => setRenameValue(e.target.value)} 
                  placeholder="Playlist Name"
                  required
                  style={{ padding: "8px 12px", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid var(--border-color)", color: "#fff", outline: "none" }}
                />
                <textarea 
                  value={descValue} 
                  onChange={(e) => setDescValue(e.target.value)} 
                  placeholder="Playlist Description"
                  rows={2}
                  style={{ padding: "8px 12px", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid var(--border-color)", color: "#fff", outline: "none", resize: "none" }}
                />
                <div style={{ display: "flex", gap: "8px" }}>
                  <button type="submit" style={{ padding: "6px 14px", borderRadius: "4px", background: "var(--accent-purple)", border: "none", color: "#fff", cursor: "pointer", fontSize: "12px", fontWeight: "600" }}>Save</button>
                  <button type="button" onClick={() => setIsEditing(false)} style={{ padding: "6px 14px", borderRadius: "4px", background: "rgba(255,255,255,0.06)", border: "none", color: "#fff", cursor: "pointer", fontSize: "12px" }}>Cancel</button>
                </div>
              </form>
            ) : (
              <>
                <h1 style={{ fontSize: "48px", fontWeight: "800", color: "#fff", margin: 0 }}>
                  {playlist.name}
                </h1>
                <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: 0, maxWidth: "600px", lineHeight: "1.4" }}>
                  {playlist.description || "No description provided."}
                </p>
                <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                  Created by <strong style={{ color: "#fff" }}>{playlist.creator}</strong> • {playlistSongs.length} songs
                </span>
              </>
            )}
          </div>
        </div>

        {/* Playlist Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {playlistSongs.length > 0 && (
            <button
              onClick={handlePlayAllPlaylist}
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
              PLAY ALL
            </button>
          )}

          {!isEditing && (
            <div style={{ display: "flex", gap: "12px" }}>
              <button 
                onClick={startEditing}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 16px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "13px",
                  cursor: "pointer",
                  fontWeight: "600"
                }}
              >
                <Edit size={14} />
                Edit Details
              </button>
              <button 
                onClick={handleDeletePlaylist}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 16px",
                  background: "rgba(255, 0, 127, 0.08)",
                  border: "1px solid rgba(255, 0, 127, 0.2)",
                  borderRadius: "8px",
                  color: "var(--accent-pink)",
                  fontSize: "13px",
                  cursor: "pointer",
                  fontWeight: "600"
                }}
              >
                <Trash2 size={14} />
                Delete Playlist
              </button>
            </div>
          )}
        </div>

        {/* Tracks List */}
        <div>
          <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "16px" }}>Playlist Songs</h2>
          <div className="glass-effect" style={{ borderRadius: "14px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-color)", color: "var(--text-muted)", fontSize: "13px" }}>
                  <th style={{ padding: "14px 18px", width: "50px", textAlign: "center" }}>#</th>
                  <th style={{ padding: "14px" }}>Title</th>
                  <th style={{ padding: "14px" }} className="hide-on-mobile">Album</th>
                  <th style={{ padding: "14px", width: "100px" }}>Duration</th>
                  <th style={{ padding: "14px", width: "100px", textAlign: "center" }}>Remove</th>
                </tr>
              </thead>
              <tbody>
                {playlistSongs.map((song, idx) => (
                  <tr 
                    key={song.id}
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.02)", transition: "background-color 0.2s" }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)"}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                  >
                    <td style={{ padding: "12px 18px", textAlign: "center", color: "var(--text-muted)", fontWeight: "600" }}>
                      {idx + 1}
                    </td>
                    <td style={{ padding: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
                      <img src={song.cover} alt={song.title} style={{ width: "36px", height: "36px", borderRadius: "4px", objectFit: "cover" }} />
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span 
                          onClick={() => { setSongDetailsId(song.id); setCurrentPage("song-details"); }}
                          style={{ fontWeight: "600", color: "#fff", cursor: "pointer" }}
                          onMouseOver={(e) => e.currentTarget.style.textDecoration = "underline"}
                          onMouseOut={(e) => e.currentTarget.style.textDecoration = "none"}
                        >
                          {song.title}
                        </span>
                        <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{song.artistName}</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px", color: "var(--text-muted)" }} className="hide-on-mobile">
                      {song.albumName}
                    </td>
                    <td style={{ padding: "12px", color: "var(--text-muted)", fontSize: "13px" }}>
                      {formatTime(song.duration)}
                    </td>
                    <td style={{ padding: "12px", textAlign: "center" }}>
                      <button 
                        onClick={() => removeSongFromPlaylist(song.id)}
                        style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer", transition: "color 0.2s" }}
                        onMouseOver={(e) => e.currentTarget.style.color = "var(--accent-pink)"}
                        onMouseOut={(e) => e.currentTarget.style.color = "var(--text-muted)"}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {playlistSongs.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ padding: "32px", textAlign: "center", color: "var(--text-muted)", fontStyle: "italic" }}>
                      No songs in this playlist. Add some songs using the list below!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Songs Section */}
        <div>
          <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "12px" }}>Recommended Songs to Add</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {availableSongs.slice(0, 5).map((song) => (
              <div 
                key={song.id}
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
                  <img src={song.cover} alt={song.title} style={{ width: "36px", height: "36px", borderRadius: "6px", objectFit: "cover" }} />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "14px", fontWeight: "600", color: "#fff" }}>{song.title}</span>
                    <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{song.artistName}</span>
                  </div>
                </div>
                <button
                  onClick={() => addSongToPlaylist(song.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "6px 12px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent-blue)";
                    e.currentTarget.style.background = "rgba(0,180,216,0.1)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-color)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  }}
                >
                  <Plus size={14} />
                  Add Song
                </button>
              </div>
            ))}
            {availableSongs.length === 0 && (
              <span style={{ fontSize: "13px", color: "var(--text-muted)", fontStyle: "italic" }}>All available songs are already in this playlist.</span>
            )}
          </div>
        </div>

      </div>
    );
  }

  return null;
}
