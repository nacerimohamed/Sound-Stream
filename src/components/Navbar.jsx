import React from "react";
import { ChevronLeft, ChevronRight, Search, Bell, User } from "lucide-react";

export default function Navbar({ 
  currentPage, 
  setCurrentPage, 
  user, 
  searchQuery, 
  setSearchQuery 
}) {
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (currentPage !== "search") {
      setCurrentPage("search");
    }
  };

  return (
    <nav className="top-navbar">
      {/* Navigation History & Search */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", flexGrow: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }} className="nav-arrows">
          <button 
            onClick={() => setCurrentPage("home")}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              border: "none",
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onMouseOver={(e) => e.currentTarget.style.color = "var(--text-active)"}
            onMouseOut={(e) => e.currentTarget.style.color = "var(--text-muted)"}
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              border: "none",
              color: "rgba(255, 255, 255, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "not-allowed"
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Smart Search Bar */}
        <div style={{ position: "relative", width: "100%", maxWidth: "320px" }}>
          <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", display: "flex", alignItems: "center" }}>
            <Search size={16} />
          </span>
          <input 
            type="text" 
            placeholder="What do you want to listen to?" 
            value={searchQuery}
            onChange={handleSearchChange}
            style={{
              width: "100%",
              padding: "10px 16px 10px 42px",
              borderRadius: "99px",
              backgroundColor: "rgba(255, 255, 255, 0.06)",
              border: "1px solid transparent",
              color: "var(--text-active)",
              fontSize: "14px",
              outline: "none",
              transition: "all 0.2s ease"
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "var(--accent-purple)";
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.09)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "transparent";
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.06)";
            }}
          />
        </div>
      </div>

      {/* Right User Area */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {user ? (
          <>
            <button 
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text-muted)",
                cursor: "pointer",
                position: "relative"
              }}
              onMouseOver={(e) => e.currentTarget.style.color = "var(--text-active)"}
              onMouseOut={(e) => e.currentTarget.style.color = "var(--text-muted)"}
            >
              <Bell size={18} />
              <span style={{
                position: "absolute",
                top: "-2px",
                right: "-2px",
                width: "6px",
                height: "6px",
                backgroundColor: "var(--accent-blue)",
                borderRadius: "50%"
              }} />
            </button>

            <button 
              onClick={() => setCurrentPage("profile")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "4px 12px 4px 4px",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                border: "1px solid var(--border-color)",
                borderRadius: "99px",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.04)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
                e.currentTarget.style.borderColor = "var(--border-color)";
              }}
            >
              <img 
                src={user.avatar} 
                alt={user.name} 
                style={{ width: "28px", height: "28px", borderRadius: "50%", objectFit: "cover" }} 
              />
              <span style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-active)" }}>
                {user.name.split(" ")[0]}
              </span>
            </button>
          </>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button 
              onClick={() => setCurrentPage("register")}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text-muted)",
                fontWeight: "600",
                fontSize: "14px",
                cursor: "pointer"
              }}
              onMouseOver={(e) => e.currentTarget.style.color = "var(--text-active)"}
              onMouseOut={(e) => e.currentTarget.style.color = "var(--text-muted)"}
            >
              Sign up
            </button>
            <button 
              onClick={() => setCurrentPage("login")}
              style={{
                padding: "8px 24px",
                background: "#fff",
                border: "none",
                borderRadius: "99px",
                color: "#000",
                fontWeight: "600",
                fontSize: "14px",
                cursor: "pointer",
                transition: "transform 0.2s ease"
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              Log in
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
