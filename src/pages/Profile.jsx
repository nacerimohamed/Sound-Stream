import React, { useState } from "react";
import { User, Mail, Shield, Music, Clock, Heart, Headphones } from "lucide-react";

export default function Profile({ 
  user, 
  setUser, 
  favorites, 
  playlists 
}) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [favoriteGenre, setFavoriteGenre] = useState(user?.favoriteGenre || "");
  const [successMsg, setSuccessMsg] = useState("");

  if (!user) {
    return (
      <div className="glass-effect animate-fade-in" style={{ borderRadius: "16px", padding: "40px", textAlign: "center", border: "1px solid var(--border-color)" }}>
        <Headphones size={48} color="var(--accent-purple)" style={{ marginBottom: "16px" }} />
        <h2>Not Logged In</h2>
        <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>Please log in to view your profile details.</p>
      </div>
    );
  }

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setUser({
      ...user,
      name,
      email,
      avatar,
      favoriteGenre
    });
    setSuccessMsg("Profile updated successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const recentActivity = [
    { text: "Listened to 'CHIHIRO' by Billie Eilish", time: "2 hours ago" },
    { text: "Added 'Nightcall' to playlist 'Late Night Drive'", time: "Yesterday" },
    { text: "Liked 'Cornfield Chase' by Hans Zimmer", time: "3 days ago" },
    { text: "Created playlist 'Focus & Flow'", time: "4 days ago" }
  ];

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      
      {/* Profile Header */}
      <div 
        className="glass-effect"
        style={{
          borderRadius: "20px",
          padding: "32px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "24px",
          border: "1px solid rgba(255,255,255,0.06)",
          background: "linear-gradient(135deg, rgba(157, 78, 221, 0.1) 0%, rgba(0, 180, 216, 0.05) 100%)"
        }}
      >
        <img 
          src={user.avatar} 
          alt={user.name} 
          style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--accent-purple)", boxShadow: "0 0 15px rgba(157, 78, 221, 0.3)" }} 
        />
        <div style={{ flexGrow: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <h1 style={{ fontSize: "32px", fontWeight: "800", color: "#fff", margin: 0 }}>
              {user.name}
            </h1>
            <span style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              padding: "4px 8px",
              borderRadius: "4px",
              backgroundColor: user.role === "admin" ? "rgba(157,78,221,0.2)" : "rgba(0,180,216,0.2)",
              color: user.role === "admin" ? "var(--accent-purple)" : "var(--accent-blue)"
            }}>
              <Shield size={12} />
              {user.role}
            </span>
          </div>
          <span style={{ fontSize: "14px", color: "var(--text-muted)", marginTop: "4px", display: "block" }}>
            {user.email}
          </span>
          <span style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "12px", display: "block" }}>
            Member since {user.joinedDate}
          </span>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
        
        {/* Stat 1 */}
        <div className="glass-effect" style={{ borderRadius: "14px", padding: "20px", display: "flex", alignItems: "center", gap: "16px", border: "1px solid var(--border-color)" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(157, 78, 221, 0.15)", display: "flex", alignItems: "center", justifyCenter: "center", color: "var(--accent-purple)", flexShrink: 0, justifyContent: "center" }}>
            <Clock size={20} />
          </div>
          <div>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", display: "block" }}>Listening Time</span>
            <strong style={{ fontSize: "18px", color: "#fff" }}>{user.listeningTime || "14 hours"}</strong>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="glass-effect" style={{ borderRadius: "14px", padding: "20px", display: "flex", alignItems: "center", gap: "16px", border: "1px solid var(--border-color)" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(0, 180, 216, 0.15)", display: "flex", alignItems: "center", justifyCenter: "center", color: "var(--accent-blue)", flexShrink: 0, justifyContent: "center" }}>
            <Music size={20} />
          </div>
          <div>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", display: "block" }}>Favorite Genre</span>
            <strong style={{ fontSize: "18px", color: "#fff" }}>{user.favoriteGenre || "Pop"}</strong>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="glass-effect" style={{ borderRadius: "14px", padding: "20px", display: "flex", alignItems: "center", gap: "16px", border: "1px solid var(--border-color)" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(255, 0, 127, 0.15)", display: "flex", alignItems: "center", justifyCenter: "center", color: "var(--accent-pink)", flexShrink: 0, justifyContent: "center" }}>
            <Heart size={20} />
          </div>
          <div>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", display: "block" }}>Liked Songs</span>
            <strong style={{ fontSize: "18px", color: "#fff" }}>{favorites.length}</strong>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="glass-effect" style={{ borderRadius: "14px", padding: "20px", display: "flex", alignItems: "center", gap: "16px", border: "1px solid var(--border-color)" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(255, 255, 255, 0.08)", display: "flex", alignItems: "center", justifyCenter: "center", color: "#fff", flexShrink: 0, justifyContent: "center" }}>
            <User size={20} />
          </div>
          <div>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", display: "block" }}>My Playlists</span>
            <strong style={{ fontSize: "18px", color: "#fff" }}>{playlists.length}</strong>
          </div>
        </div>
      </div>

      {/* Main Settings & Activity Grid */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "28px" }}>
        
        {/* Left: Update Profile Card */}
        <div className="glass-effect" style={{ flex: "1.2 1 400px", borderRadius: "16px", padding: "28px", border: "1px solid var(--border-color)" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "20px" }}>Edit Profile Details</h2>
          
          {successMsg && (
            <div style={{ padding: "10px 14px", borderRadius: "8px", backgroundColor: "rgba(0,180,216,0.1)", border: "1px solid rgba(0,180,216,0.2)", color: "var(--accent-blue)", fontSize: "13px", fontWeight: "500", marginBottom: "16px" }}>
              {successMsg}
            </div>
          )}

          <form onSubmit={handleUpdateProfile} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-main)" }}>Display Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required
                style={{ padding: "10px 12px", borderRadius: "8px", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", color: "#fff", outline: "none" }}
              />
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-main)" }}>Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
                style={{ padding: "10px 12px", borderRadius: "8px", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", color: "#fff", outline: "none" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-main)" }}>Avatar Image URL</label>
              <input 
                type="text" 
                value={avatar} 
                onChange={(e) => setAvatar(e.target.value)} 
                style={{ padding: "10px 12px", borderRadius: "8px", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", color: "#fff", outline: "none" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-main)" }}>Favorite Music Genre</label>
              <input 
                type="text" 
                value={favoriteGenre} 
                onChange={(e) => setFavoriteGenre(e.target.value)} 
                style={{ padding: "10px 12px", borderRadius: "8px", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", color: "#fff", outline: "none" }}
              />
            </div>

            <button 
              type="submit" 
              className="btn-glow-purple"
              style={{
                padding: "12px",
                borderRadius: "8px",
                background: "var(--gradient-primary)",
                border: "none",
                color: "#fff",
                fontWeight: "700",
                fontSize: "14px",
                cursor: "pointer",
                marginTop: "10px"
              }}
            >
              Save Profile Changes
            </button>
          </form>
        </div>

        {/* Right: Recent Activity Card */}
        <div className="glass-effect" style={{ flex: "1 1 300px", borderRadius: "16px", padding: "28px", border: "1px solid var(--border-color)" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "20px" }}>Recent Activity</h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {recentActivity.map((act, idx) => (
              <div 
                key={idx} 
                style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "flex-start",
                  borderLeft: "2px solid var(--accent-purple)",
                  paddingLeft: "14px",
                  paddingBottom: idx !== recentActivity.length - 1 ? "12px" : "0"
                }}
              >
                <div>
                  <span style={{ fontSize: "14px", color: "var(--text-active)", fontWeight: "500", display: "block" }}>{act.text}</span>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px", display: "block" }}>{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
