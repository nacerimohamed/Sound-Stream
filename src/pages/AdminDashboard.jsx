import React, { useState } from "react";
import { 
  Users, 
  Music, 
  Disc, 
  Radio, 
  Plus, 
  Edit, 
  Trash2, 
  TrendingUp, 
  X,
  FileText
} from "lucide-react";

export default function AdminDashboard({
  songs,
  setSongs,
  artists,
  setArtists,
  albums,
  setAlbums,
  users,
  setUsers
}) {
  const [activeTab, setActiveTab] = useState("songs");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [editingId, setEditingId] = useState(null);

  // Form States
  const [songForm, setSongForm] = useState({ title: "", artistId: "", albumId: "", cover: "", duration: 200, audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", genre: "Pop", plays: 100000 });
  const [artistForm, setArtistForm] = useState({ name: "", avatar: "", banner: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=1200&h=400&fit=crop", bio: "", listeners: "1,200,000", verified: true, genres: ["Pop"] });
  const [albumForm, setAlbumForm] = useState({ title: "", artistId: "", cover: "", year: 2024, genre: "Pop", description: "" });
  const [userForm, setUserForm] = useState({ name: "", email: "", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop", role: "user", joinedDate: "2024-06-01", favoriteGenre: "Pop", listeningTime: "10 hours" });

  const chartData = [240, 310, 290, 480, 520, 680, 750, 890, 820, 950, 1100, 1250];
  const chartMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Open Add Modals
  const handleOpenAdd = () => {
    setModalMode("add");
    setShowModal(true);
    if (activeTab === "songs") {
      setSongForm({ title: "", artistId: artists[0]?.id || "", albumId: albums[0]?.id || "", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop", duration: 180, audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", genre: "Pop", plays: 50000 });
    } else if (activeTab === "artists") {
      setArtistForm({ name: "", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop", banner: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200&h=400&fit=crop", bio: "", listeners: "500,000", verified: false, genres: ["Electronic"] });
    } else if (activeTab === "albums") {
      setAlbumForm({ title: "", artistId: artists[0]?.id || "", cover: "https://images.unsplash.com/photo-1563200268-2c9740268809?w=500&h=500&fit=crop", year: 2024, genre: "Pop", description: "" });
    } else if (activeTab === "users") {
      setUserForm({ name: "", email: "", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop", role: "user", joinedDate: new Date().toISOString().split("T")[0], favoriteGenre: "Pop", listeningTime: "0 hours" });
    }
  };

  // Open Edit Modals
  const handleOpenEdit = (item) => {
    setModalMode("edit");
    setEditingId(item.id);
    setShowModal(true);
    if (activeTab === "songs") {
      setSongForm({ ...item });
    } else if (activeTab === "artists") {
      setArtistForm({ ...item });
    } else if (activeTab === "albums") {
      setAlbumForm({ ...item });
    } else if (activeTab === "users") {
      setUserForm({ ...item });
    }
  };

  // Delete Action
  const handleDelete = (id) => {
    if (!confirm(`Are you sure you want to delete this ${activeTab.slice(0, -1)}?`)) return;

    if (activeTab === "songs") {
      setSongs(songs.filter(s => s.id !== id));
    } else if (activeTab === "artists") {
      setArtists(artists.filter(a => a.id !== id));
    } else if (activeTab === "albums") {
      setAlbums(albums.filter(al => al.id !== id));
    } else if (activeTab === "users") {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  // Form Submit Action
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);

    if (activeTab === "songs") {
      const artist = artists.find(a => a.id === songForm.artistId);
      const album = albums.find(al => al.id === songForm.albumId);
      const songData = {
        ...songForm,
        artistName: artist ? artist.name : "Unknown Artist",
        albumName: album ? album.title : "Unknown Album"
      };

      if (modalMode === "add") {
        setSongs([...songs, { ...songData, id: "s" + (songs.length + 1) }]);
      } else {
        setSongs(songs.map(s => s.id === editingId ? { ...songData, id: editingId } : s));
      }
    } 
    
    else if (activeTab === "artists") {
      // Split genres comma separated
      const genresArray = Array.isArray(artistForm.genres) 
        ? artistForm.genres 
        : artistForm.genres.split(",").map(g => g.trim());

      const artistData = {
        ...artistForm,
        genres: genresArray
      };

      if (modalMode === "add") {
        setArtists([...artists, { ...artistData, id: "a" + (artists.length + 1) }]);
      } else {
        setArtists(artists.map(a => a.id === editingId ? { ...artistData, id: editingId } : a));
      }
    } 
    
    else if (activeTab === "albums") {
      const artist = artists.find(a => a.id === albumForm.artistId);
      const albumData = {
        ...albumForm,
        artistName: artist ? artist.name : "Unknown Artist"
      };

      if (modalMode === "add") {
        setAlbums([...albums, { ...albumData, id: "al" + (albums.length + 1) }]);
      } else {
        setAlbums(albums.map(al => al.id === editingId ? { ...albumData, id: editingId } : al));
      }
    } 
    
    else if (activeTab === "users") {
      if (modalMode === "add") {
        setUsers([...users, { ...userForm, id: "u" + (users.length + 1) }]);
      } else {
        setUsers(users.map(u => u.id === editingId ? { ...userForm, id: editingId } : u));
      }
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "32px", paddingBottom: "40px" }}>
      
      {/* Page Header */}
      <div>
        <h1 style={{ fontSize: "32px", fontWeight: "800", color: "#fff", margin: "0 0 8px" }}>Admin Dashboard</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>System performance metrics and media catalog management.</p>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
        {/* Users Stats */}
        <div className="glass-effect" style={{ borderRadius: "14px", padding: "20px", display: "flex", alignItems: "center", gap: "16px", border: "1px solid var(--border-color)" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(0,180,216,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-blue)" }}><Users size={20} /></div>
          <div>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", display: "block" }}>Total Users</span>
            <strong style={{ fontSize: "20px", color: "#fff" }}>{users.length}</strong>
          </div>
        </div>
        {/* Songs Stats */}
        <div className="glass-effect" style={{ borderRadius: "14px", padding: "20px", display: "flex", alignItems: "center", gap: "16px", border: "1px solid var(--border-color)" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(157,78,221,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-purple)" }}><Music size={20} /></div>
          <div>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", display: "block" }}>Total Songs</span>
            <strong style={{ fontSize: "20px", color: "#fff" }}>{songs.length}</strong>
          </div>
        </div>
        {/* Albums Stats */}
        <div className="glass-effect" style={{ borderRadius: "14px", padding: "20px", display: "flex", alignItems: "center", gap: "16px", border: "1px solid var(--border-color)" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(255,0,127,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-pink)" }}><Disc size={20} /></div>
          <div>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", display: "block" }}>Total Albums</span>
            <strong style={{ fontSize: "20px", color: "#fff" }}>{albums.length}</strong>
          </div>
        </div>
        {/* Artists Stats */}
        <div className="glass-effect" style={{ borderRadius: "14px", padding: "20px", display: "flex", alignItems: "center", gap: "16px", border: "1px solid var(--border-color)" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}><Radio size={20} /></div>
          <div>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", display: "block" }}>Total Artists</span>
            <strong style={{ fontSize: "20px", color: "#fff" }}>{artists.length}</strong>
          </div>
        </div>
      </div>

      {/* SVG Listening analytics chart */}
      <div className="glass-effect" style={{ borderRadius: "16px", padding: "28px", border: "1px solid var(--border-color)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <TrendingUp size={18} color="var(--accent-purple)" />
            <h2 style={{ fontSize: "18px", fontWeight: "700", margin: 0 }}>Monthly Streams (Thousands)</h2>
          </div>
          <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Target: 1.5M Streams</span>
        </div>

        {/* Custom SVG Line Chart */}
        <div style={{ width: "100%", height: "200px", overflow: "visible" }}>
          <svg viewBox="0 0 1100 200" width="100%" height="100%" style={{ overflow: "visible" }}>
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent-purple)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            <line x1="0" y1="20" x2="1100" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <line x1="0" y1="70" x2="1100" y2="70" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <line x1="0" y1="120" x2="1100" y2="120" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <line x1="0" y1="170" x2="1100" y2="170" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

            {/* Area Path */}
            <path 
              d={`M 0,200 L 0,${200 - chartData[0]/8} L 100,${200 - chartData[1]/8} L 200,${200 - chartData[2]/8} L 300,${200 - chartData[3]/8} L 400,${200 - chartData[4]/8} L 500,${200 - chartData[5]/8} L 600,${200 - chartData[6]/8} L 700,${200 - chartData[7]/8} L 800,${200 - chartData[8]/8} L 900,${200 - chartData[9]/8} L 1000,${200 - chartData[10]/8} L 1100,${200 - chartData[11]/8} L 1100,200 Z`}
              fill="url(#chartGrad)"
            />

            {/* Line Path */}
            <path 
              d={`M 0,${200 - chartData[0]/8} L 100,${200 - chartData[1]/8} L 200,${200 - chartData[2]/8} L 300,${200 - chartData[3]/8} L 400,${200 - chartData[4]/8} L 500,${200 - chartData[5]/8} L 600,${200 - chartData[6]/8} L 700,${200 - chartData[7]/8} L 800,${200 - chartData[8]/8} L 900,${200 - chartData[9]/8} L 1000,${200 - chartData[10]/8} L 1100,${200 - chartData[11]/8}`}
              fill="none"
              stroke="var(--accent-purple)"
              strokeWidth="3"
            />

            {/* Data Dots */}
            {chartData.map((val, idx) => (
              <circle 
                key={idx}
                cx={idx * 100}
                cy={200 - val/8}
                r="5"
                fill="var(--accent-blue)"
                stroke="#fff"
                strokeWidth="1.5"
                style={{ cursor: "pointer", transition: "r 0.1s" }}
                onMouseOver={(e) => e.target.setAttribute("r", "8")}
                onMouseOut={(e) => e.target.setAttribute("r", "5")}
              />
            ))}
          </svg>
        </div>

        {/* X Labels */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", color: "var(--text-muted)", fontSize: "11px", fontWeight: "600", padding: "0 5px" }}>
          {chartMonths.map((m, idx) => (
            <span key={idx} style={{ width: "30px", textAlign: "center" }}>{m}</span>
          ))}
        </div>
      </div>

      {/* CRUD Catalog Area */}
      <div>
        {/* Catalog Tab headers */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px", marginBottom: "20px", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", gap: "24px" }}>
            {["songs", "artists", "albums", "users"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: activeTab === tab ? "var(--text-active)" : "var(--text-muted)",
                  fontSize: "16px",
                  fontWeight: "700",
                  cursor: "pointer",
                  paddingBottom: "12px",
                  borderBottom: activeTab === tab ? "2px solid var(--accent-purple)" : "2px solid transparent",
                  transition: "all 0.2s",
                  textTransform: "capitalize"
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            onClick={handleOpenAdd}
            className="btn-glow-purple"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 20px",
              background: "var(--gradient-primary)",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              fontWeight: "700",
              fontSize: "13px",
              cursor: "pointer"
            }}
          >
            <Plus size={16} />
            Add New {activeTab.slice(0, -1)}
          </button>
        </div>

        {/* Data Tables */}
        <div className="glass-effect" style={{ borderRadius: "14px", overflow: "hidden", border: "1px solid var(--border-color)" }}>
          
          {/* 1. SONGS TAB */}
          {activeTab === "songs" && (
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-color)", color: "var(--text-muted)", fontSize: "13px" }}>
                  <th style={{ padding: "16px" }}>Song Title</th>
                  <th style={{ padding: "16px" }} className="hide-on-mobile">Artist</th>
                  <th style={{ padding: "16px" }} className="hide-on-mobile">Album</th>
                  <th style={{ padding: "16px" }}>Genre</th>
                  <th style={{ padding: "16px", width: "120px", textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {songs.map((song) => (
                  <tr key={song.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.02)" }}>
                    <td style={{ padding: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
                      <img src={song.cover} alt={song.title} style={{ width: "36px", height: "36px", borderRadius: "4px", objectFit: "cover" }} />
                      <span style={{ fontWeight: "600", color: "#fff" }}>{song.title}</span>
                    </td>
                    <td style={{ padding: "12px", color: "var(--text-muted)" }} className="hide-on-mobile">{song.artistName}</td>
                    <td style={{ padding: "12px", color: "var(--text-muted)" }} className="hide-on-mobile">{song.albumName}</td>
                    <td style={{ padding: "12px", color: "var(--text-muted)" }}>{song.genre}</td>
                    <td style={{ padding: "12px", textAlign: "center" }}>
                      <div style={{ display: "inline-flex", gap: "12px" }}>
                        <button onClick={() => handleOpenEdit(song)} style={{ background: "transparent", border: "none", color: "var(--accent-blue)", cursor: "pointer" }}><Edit size={16} /></button>
                        <button onClick={() => handleDelete(song.id)} style={{ background: "transparent", border: "none", color: "var(--accent-pink)", cursor: "pointer" }}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* 2. ARTISTS TAB */}
          {activeTab === "artists" && (
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-color)", color: "var(--text-muted)", fontSize: "13px" }}>
                  <th style={{ padding: "16px" }}>Artist Name</th>
                  <th style={{ padding: "16px" }} className="hide-on-mobile">Monthly Listeners</th>
                  <th style={{ padding: "16px" }}>Genres</th>
                  <th style={{ padding: "16px" }}>Status</th>
                  <th style={{ padding: "16px", width: "120px", textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {artists.map((artist) => (
                  <tr key={artist.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.02)" }}>
                    <td style={{ padding: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
                      <img src={artist.avatar} alt={artist.name} style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover" }} />
                      <span style={{ fontWeight: "600", color: "#fff" }}>{artist.name}</span>
                    </td>
                    <td style={{ padding: "12px", color: "var(--text-muted)" }} className="hide-on-mobile">{artist.listeners}</td>
                    <td style={{ padding: "12px", color: "var(--text-muted)" }}>{artist.genres.join(", ")}</td>
                    <td style={{ padding: "12px" }}>
                      <span style={{ fontSize: "11px", fontWeight: "700", padding: "2px 8px", borderRadius: "4px", backgroundColor: artist.verified ? "rgba(0,180,216,0.15)" : "rgba(255,255,255,0.05)", color: artist.verified ? "var(--accent-blue)" : "var(--text-muted)" }}>
                        {artist.verified ? "Verified" : "Standard"}
                      </span>
                    </td>
                    <td style={{ padding: "12px", textAlign: "center" }}>
                      <div style={{ display: "inline-flex", gap: "12px" }}>
                        <button onClick={() => handleOpenEdit(artist)} style={{ background: "transparent", border: "none", color: "var(--accent-blue)", cursor: "pointer" }}><Edit size={16} /></button>
                        <button onClick={() => handleDelete(artist.id)} style={{ background: "transparent", border: "none", color: "var(--accent-pink)", cursor: "pointer" }}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* 3. ALBUMS TAB */}
          {activeTab === "albums" && (
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-color)", color: "var(--text-muted)", fontSize: "13px" }}>
                  <th style={{ padding: "16px" }}>Album Cover & Title</th>
                  <th style={{ padding: "16px" }}>Artist</th>
                  <th style={{ padding: "16px" }} className="hide-on-mobile">Year</th>
                  <th style={{ padding: "16px" }} className="hide-on-mobile">Genre</th>
                  <th style={{ padding: "16px", width: "120px", textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {albums.map((album) => (
                  <tr key={album.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.02)" }}>
                    <td style={{ padding: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
                      <img src={album.cover} alt={album.title} style={{ width: "36px", height: "36px", borderRadius: "4px", objectFit: "cover" }} />
                      <span style={{ fontWeight: "600", color: "#fff" }}>{album.title}</span>
                    </td>
                    <td style={{ padding: "12px", color: "var(--text-muted)" }}>{album.artistName}</td>
                    <td style={{ padding: "12px", color: "var(--text-muted)" }} className="hide-on-mobile">{album.year}</td>
                    <td style={{ padding: "12px", color: "var(--text-muted)" }} className="hide-on-mobile">{album.genre}</td>
                    <td style={{ padding: "12px", textAlign: "center" }}>
                      <div style={{ display: "inline-flex", gap: "12px" }}>
                        <button onClick={() => handleOpenEdit(album)} style={{ background: "transparent", border: "none", color: "var(--accent-blue)", cursor: "pointer" }}><Edit size={16} /></button>
                        <button onClick={() => handleDelete(album.id)} style={{ background: "transparent", border: "none", color: "var(--accent-pink)", cursor: "pointer" }}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* 4. USERS TAB */}
          {activeTab === "users" && (
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-color)", color: "var(--text-muted)", fontSize: "13px" }}>
                  <th style={{ padding: "16px" }}>User</th>
                  <th style={{ padding: "16px" }}>Email</th>
                  <th style={{ padding: "16px" }} className="hide-on-mobile">Joined Date</th>
                  <th style={{ padding: "16px" }}>Role</th>
                  <th style={{ padding: "16px", width: "120px", textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.02)" }}>
                    <td style={{ padding: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
                      <img src={u.avatar} alt={u.name} style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover" }} />
                      <span style={{ fontWeight: "600", color: "#fff" }}>{u.name}</span>
                    </td>
                    <td style={{ padding: "12px", color: "var(--text-muted)" }}>{u.email}</td>
                    <td style={{ padding: "12px", color: "var(--text-muted)" }} className="hide-on-mobile">{u.joinedDate}</td>
                    <td style={{ padding: "12px" }}>
                      <span style={{
                        fontSize: "11px",
                        fontWeight: "700",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        backgroundColor: u.role === "admin" ? "rgba(157,78,221,0.15)" : "rgba(255,255,255,0.05)",
                        color: u.role === "admin" ? "var(--accent-purple)" : "var(--text-muted)",
                        textTransform: "capitalize"
                      }}>
                        {u.role}
                      </span>
                    </td>
                    <td style={{ padding: "12px", textAlign: "center" }}>
                      <div style={{ display: "inline-flex", gap: "12px" }}>
                        <button onClick={() => handleOpenEdit(u)} style={{ background: "transparent", border: "none", color: "var(--accent-blue)", cursor: "pointer" }}><Edit size={16} /></button>
                        <button onClick={() => handleDelete(u.id)} style={{ background: "transparent", border: "none", color: "var(--accent-pink)", cursor: "pointer" }}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>
      </div>

      {/* CRUD Form Dialog Modal Overlay */}
      {showModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(5px)",
          zIndex: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px"
        }}>
          <div 
            className="glass-effect"
            style={{
              width: "100%",
              maxWidth: "460px",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 15px 35px rgba(0,0,0,0.6)",
              overflow: "hidden"
            }}
          >
            {/* Modal Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid var(--border-color)" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#fff", textTransform: "capitalize" }}>
                {modalMode} {activeTab.slice(0, -1)}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleFormSubmit} style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px", maxHeight: "450px", overflowY: "auto" }}>
              
              {/* Songs Form Fields */}
              {activeTab === "songs" && (
                <>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Song Title</label>
                    <input type="text" required value={songForm.title} onChange={(e) => setSongForm({ ...songForm, title: e.target.value })} style={{ padding: "10px", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", color: "#fff", outline: "none" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Artist</label>
                    <select value={songForm.artistId} onChange={(e) => setSongForm({ ...songForm, artistId: e.target.value })} style={{ padding: "10px", borderRadius: "6px", backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", color: "#fff", outline: "none" }}>
                      {artists.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                    </select>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Album</label>
                    <select value={songForm.albumId} onChange={(e) => setSongForm({ ...songForm, albumId: e.target.value })} style={{ padding: "10px", borderRadius: "6px", backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", color: "#fff", outline: "none" }}>
                      {albums.map(al => <option key={al.id} value={al.id}>{al.title}</option>)}
                    </select>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Genre</label>
                    <input type="text" required value={songForm.genre} onChange={(e) => setSongForm({ ...songForm, genre: e.target.value })} style={{ padding: "10px", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", color: "#fff", outline: "none" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Cover Image URL</label>
                    <input type="text" required value={songForm.cover} onChange={(e) => setSongForm({ ...songForm, cover: e.target.value })} style={{ padding: "10px", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", color: "#fff", outline: "none" }} />
                  </div>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
                      <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Duration (Seconds)</label>
                      <input type="number" required value={songForm.duration} onChange={(e) => setSongForm({ ...songForm, duration: parseInt(e.target.value) || 0 })} style={{ padding: "10px", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", color: "#fff", outline: "none" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
                      <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Plays Count</label>
                      <input type="number" required value={songForm.plays} onChange={(e) => setSongForm({ ...songForm, plays: parseInt(e.target.value) || 0 })} style={{ padding: "10px", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", color: "#fff", outline: "none" }} />
                    </div>
                  </div>
                </>
              )}

              {/* Artists Form Fields */}
              {activeTab === "artists" && (
                <>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Artist Name</label>
                    <input type="text" required value={artistForm.name} onChange={(e) => setArtistForm({ ...artistForm, name: e.target.value })} style={{ padding: "10px", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", color: "#fff", outline: "none" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Avatar URL</label>
                    <input type="text" required value={artistForm.avatar} onChange={(e) => setArtistForm({ ...artistForm, avatar: e.target.value })} style={{ padding: "10px", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", color: "#fff", outline: "none" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Banner URL</label>
                    <input type="text" required value={artistForm.banner} onChange={(e) => setArtistForm({ ...artistForm, banner: e.target.value })} style={{ padding: "10px", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", color: "#fff", outline: "none" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Genres (comma separated)</label>
                    <input type="text" required value={artistForm.genres} onChange={(e) => setArtistForm({ ...artistForm, genres: e.target.value })} style={{ padding: "10px", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", color: "#fff", outline: "none" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Monthly Listeners</label>
                    <input type="text" required value={artistForm.listeners} onChange={(e) => setArtistForm({ ...artistForm, listeners: e.target.value })} style={{ padding: "10px", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", color: "#fff", outline: "none" }} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
                    <input type="checkbox" id="verified" checked={artistForm.verified} onChange={(e) => setArtistForm({ ...artistForm, verified: e.target.checked })} style={{ accentColor: "var(--accent-purple)", cursor: "pointer" }} />
                    <label htmlFor="verified" style={{ fontSize: "13px", color: "#fff", cursor: "pointer" }}>Verified Profile Badge</label>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Biography</label>
                    <textarea rows={3} required value={artistForm.bio} onChange={(e) => setArtistForm({ ...artistForm, bio: e.target.value })} style={{ padding: "10px", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", color: "#fff", outline: "none", resize: "none" }} />
                  </div>
                </>
              )}

              {/* Albums Form Fields */}
              {activeTab === "albums" && (
                <>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Album Title</label>
                    <input type="text" required value={albumForm.title} onChange={(e) => setAlbumForm({ ...albumForm, title: e.target.value })} style={{ padding: "10px", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", color: "#fff", outline: "none" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Artist</label>
                    <select value={albumForm.artistId} onChange={(e) => setAlbumForm({ ...albumForm, artistId: e.target.value })} style={{ padding: "10px", borderRadius: "6px", backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", color: "#fff", outline: "none" }}>
                      {artists.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                    </select>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Cover Image URL</label>
                    <input type="text" required value={albumForm.cover} onChange={(e) => setAlbumForm({ ...albumForm, cover: e.target.value })} style={{ padding: "10px", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", color: "#fff", outline: "none" }} />
                  </div>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
                      <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Release Year</label>
                      <input type="number" required value={albumForm.year} onChange={(e) => setAlbumForm({ ...albumForm, year: parseInt(e.target.value) || 2024 })} style={{ padding: "10px", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", color: "#fff", outline: "none" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
                      <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Genre</label>
                      <input type="text" required value={albumForm.genre} onChange={(e) => setAlbumForm({ ...albumForm, genre: e.target.value })} style={{ padding: "10px", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", color: "#fff", outline: "none" }} />
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Description</label>
                    <textarea rows={3} required value={albumForm.description} onChange={(e) => setAlbumForm({ ...albumForm, description: e.target.value })} style={{ padding: "10px", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", color: "#fff", outline: "none", resize: "none" }} />
                  </div>
                </>
              )}

              {/* Users Form Fields */}
              {activeTab === "users" && (
                <>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Full Name</label>
                    <input type="text" required value={userForm.name} onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} style={{ padding: "10px", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", color: "#fff", outline: "none" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Email Address</label>
                    <input type="email" required value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} style={{ padding: "10px", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", color: "#fff", outline: "none" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Avatar Image URL</label>
                    <input type="text" required value={userForm.avatar} onChange={(e) => setUserForm({ ...userForm, avatar: e.target.value })} style={{ padding: "10px", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", color: "#fff", outline: "none" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>User Role</label>
                    <select value={userForm.role} onChange={(e) => setUserForm({ ...userForm, role: e.target.value })} style={{ padding: "10px", borderRadius: "6px", backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", color: "#fff", outline: "none" }}>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
                      <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Favorite Music Genre</label>
                      <input type="text" required value={userForm.favoriteGenre} onChange={(e) => setUserForm({ ...userForm, favoriteGenre: e.target.value })} style={{ padding: "10px", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", color: "#fff", outline: "none" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
                      <label style={{ fontSize: "12px", color: "var(--text-muted)" }}>Listening Time</label>
                      <input type="text" required value={userForm.listeningTime} onChange={(e) => setUserForm({ ...userForm, listeningTime: e.target.value })} style={{ padding: "10px", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", color: "#fff", outline: "none" }} />
                    </div>
                  </div>
                </>
              )}

              {/* Submit Buttons */}
              <div style={{ display: "flex", gap: "12px", borderTop: "1px solid var(--border-color)", paddingTop: "20px", marginTop: "10px" }}>
                <button 
                  type="submit" 
                  className="btn-glow-purple"
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "6px",
                    background: "var(--gradient-primary)",
                    border: "none",
                    color: "#fff",
                    fontWeight: "700",
                    fontSize: "14px",
                    cursor: "pointer"
                  }}
                >
                  Save Changes
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "6px",
                    background: "rgba(255,255,255,0.05)",
                    border: "none",
                    color: "#fff",
                    fontSize: "14px",
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
