import React from "react";
import { 
  Home, 
  Search, 
  Heart, 
  User, 
  Sliders, 
  Plus, 
  ListMusic,
  LogOut,
  LogIn
} from "lucide-react";

export default function Sidebar({ 
  currentPage, 
  setCurrentPage, 
  user, 
  logout, 
  playlists, 
  createPlaylist,
  setCurrentPlaylist
}) {
  const isAdmin = user && user.role === "admin";

  const handlePlaylistClick = (playlist) => {
    setCurrentPlaylist(playlist);
    setCurrentPage("playlist");
  };

  const handleFavoritesClick = () => {
    setCurrentPage("favorites");
  };

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="logo-container" style={{ padding: "24px", display: "flex", alignItems: "center", gap: "12px", borderBottom: "1px solid var(--border-color)" }}>
        <div style={{
          width: "36px",
          height: "36px",
          borderRadius: "10px",
          background: "var(--gradient-primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 15px rgba(157, 78, 221, 0.4)"
        }}>
          <ListMusic size={20} color="#fff" />
        </div>
        <span className="logo-text" style={{ fontSize: "20px", fontWeight: "800", letterSpacing: "1px", background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          SoundStream
        </span>
      </div>

      {/* Nav Section */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", padding: "24px 16px", flexGrow: 1, overflowY: "auto" }}>
        
        {/* Navigation Group */}
        <div>
          <span className="nav-header-text" style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--text-muted)", paddingLeft: "12px", display: "block", marginBottom: "12px" }}>
            Menu
          </span>
          <div className="nav-group" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <button 
              onClick={() => setCurrentPage("home")}
              className="nav-item" 
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                padding: "10px 12px",
                background: currentPage === "home" ? "rgba(255, 255, 255, 0.08)" : "transparent",
                border: "none",
                borderRadius: "8px",
                color: currentPage === "home" ? "var(--text-active)" : "var(--text-muted)",
                cursor: "pointer",
                textAlign: "left",
                fontWeight: "500",
                fontSize: "14px",
                transition: "all 0.2s ease"
              }}
            >
              <Home size={18} style={{ marginRight: "12px", color: currentPage === "home" ? "var(--accent-purple)" : "inherit" }} />
              <span className="link-text">Home</span>
            </button>

            <button 
              onClick={() => setCurrentPage("search")}
              className="nav-item" 
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                padding: "10px 12px",
                background: currentPage === "search" ? "rgba(255, 255, 255, 0.08)" : "transparent",
                border: "none",
                borderRadius: "8px",
                color: currentPage === "search" ? "var(--text-active)" : "var(--text-muted)",
                cursor: "pointer",
                textAlign: "left",
                fontWeight: "500",
                fontSize: "14px",
                transition: "all 0.2s ease"
              }}
            >
              <Search size={18} style={{ marginRight: "12px", color: currentPage === "search" ? "var(--accent-blue)" : "inherit" }} />
              <span className="link-text">Search</span>
            </button>

            <button 
              onClick={handleFavoritesClick}
              className="nav-item" 
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                padding: "10px 12px",
                background: currentPage === "favorites" ? "rgba(255, 255, 255, 0.08)" : "transparent",
                border: "none",
                borderRadius: "8px",
                color: currentPage === "favorites" ? "var(--text-active)" : "var(--text-muted)",
                cursor: "pointer",
                textAlign: "left",
                fontWeight: "500",
                fontSize: "14px",
                transition: "all 0.2s ease"
              }}
            >
              <Heart size={18} style={{ marginRight: "12px", color: currentPage === "favorites" ? "var(--accent-pink)" : "inherit" }} />
              <span className="link-text">Favorites</span>
            </button>

            <button 
              onClick={() => setCurrentPage(user ? "profile" : "login")}
              className="nav-item" 
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                padding: "10px 12px",
                background: currentPage === "profile" ? "rgba(255, 255, 255, 0.08)" : "transparent",
                border: "none",
                borderRadius: "8px",
                color: currentPage === "profile" ? "var(--text-active)" : "var(--text-muted)",
                cursor: "pointer",
                textAlign: "left",
                fontWeight: "500",
                fontSize: "14px",
                transition: "all 0.2s ease"
              }}
            >
              <User size={18} style={{ marginRight: "12px", color: currentPage === "profile" ? "var(--accent-purple)" : "inherit" }} />
              <span className="link-text">Profile</span>
            </button>

            {isAdmin && (
              <button 
                onClick={() => setCurrentPage("admin")}
                className="nav-item" 
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  padding: "10px 12px",
                  background: currentPage === "admin" ? "rgba(255, 255, 255, 0.08)" : "transparent",
                  border: "none",
                  borderRadius: "8px",
                  color: currentPage === "admin" ? "var(--text-active)" : "var(--text-muted)",
                  cursor: "pointer",
                  textAlign: "left",
                  fontWeight: "500",
                  fontSize: "14px",
                  transition: "all 0.2s ease"
                }}
              >
                <Sliders size={18} style={{ marginRight: "12px", color: "var(--accent-blue)" }} />
                <span className="link-text">Admin Panel</span>
              </button>
            )}
          </div>
        </div>

        {/* Divider */}
        <hr className="nav-divider" style={{ border: "none", borderTop: "1px solid var(--border-color)" }} />

        {/* Playlists Section */}
        <div className="playlist-sidebar-section" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingLeft: "12px" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--text-muted)" }}>
              Playlists
            </span>
            {user && (
              <button 
                onClick={createPlaylist}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "color 0.2s ease"
                }}
                onMouseOver={(e) => e.currentTarget.style.color = "var(--text-active)"}
                onMouseOut={(e) => e.currentTarget.style.color = "var(--text-muted)"}
                title="Create Playlist"
              >
                <Plus size={16} />
              </button>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px", maxHeight: "200px", overflowY: "auto", paddingRight: "4px" }}>
            {playlists.map((playlist) => (
              <button
                key={playlist.id}
                onClick={() => handlePlaylistClick(playlist)}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "8px 12px",
                  background: "transparent",
                  border: "none",
                  borderRadius: "6px",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: "13px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  transition: "all 0.2s ease"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = "var(--text-active)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {playlist.name}
              </button>
            ))}

            {playlists.length === 0 && (
              <span style={{ fontSize: "12px", color: "var(--text-muted)", paddingLeft: "12px", fontStyle: "italic" }}>
                No playlists yet
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer / Auth State */}
      <div className="nav-footer" style={{ padding: "20px 16px", borderTop: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%" }}>
            <img 
              src={user.avatar} 
              alt={user.name} 
              style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover", border: "1px solid var(--accent-purple)" }} 
            />
            <div style={{ display: "flex", flexDirection: "column", overflow: "hidden", flexGrow: 1 }}>
              <span style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-active)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {user.name}
              </span>
              <span style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "capitalize" }}>
                {user.role}
              </span>
            </div>
            <button 
              onClick={logout}
              style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              title="Logout"
              onMouseOver={(e) => e.currentTarget.style.color = "var(--accent-pink)"}
              onMouseOut={(e) => e.currentTarget.style.color = "var(--text-muted)"}
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setCurrentPage("login")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              width: "100%",
              padding: "10px",
              background: "var(--gradient-primary)",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              fontWeight: "600",
              fontSize: "14px",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(157, 78, 221, 0.25)"
            }}
          >
            <LogIn size={16} />
            Login
          </button>
        )}
      </div>
    </aside>
  );
}
