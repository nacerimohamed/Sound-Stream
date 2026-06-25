import React, { useState } from "react";
import { User, Mail, Lock, LogIn, ArrowRight } from "lucide-react";
import { mockUsers } from "../data/mockData";

export default function Auth({ 
  currentPage, 
  setCurrentPage, 
  setUser 
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Simulate login
    const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    if (foundUser) {
      setUser(foundUser);
      setCurrentPage("home");
    } else {
      setError("Invalid email address. Try using a quick-fill demo account!");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Simulate register
    const newUser = {
      id: "u" + (mockUsers.length + 1),
      name: name || "New User",
      email: email,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
      role: isAdmin ? "admin" : "user",
      joinedDate: new Date().toISOString().split("T")[0],
      favoriteGenre: "Pop",
      listeningTime: "0 hours"
    };

    // Normally we'd push to mockUsers but in local state we just set user
    setUser(newUser);
    setCurrentPage("home");
  };

  const fillDemoAccount = (role) => {
    setError("");
    const demo = mockUsers.find(u => u.role === role);
    if (demo) {
      setEmail(demo.email);
      setPassword("password123");
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 190px)", padding: "20px" }}>
      <div 
        className="glass-effect"
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "20px",
          padding: "40px 32px",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
          gap: "24px"
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "28px", fontWeight: "800", background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: "0 0 8px" }}>
            {currentPage === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>
            {currentPage === "login" ? "Stream your favorite soundtracks today" : "Start your musical journey with us"}
          </p>
        </div>

        {error && (
          <div style={{ padding: "10px 14px", borderRadius: "8px", backgroundColor: "rgba(255,0,127,0.1)", border: "1px solid rgba(255,0,127,0.2)", color: "var(--accent-pink)", fontSize: "13px", fontWeight: "500" }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={currentPage === "login" ? handleLogin : handleRegister} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {currentPage === "register" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-main)" }}>Full Name</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}><User size={16} /></span>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  style={{ width: "100%", padding: "12px 14px 12px 42px", borderRadius: "10px", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", color: "#fff", outline: "none" }}
                />
              </div>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-main)" }}>Email Address</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}><Mail size={16} /></span>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@soundstream.com"
                required
                style={{ width: "100%", padding: "12px 14px 12px 42px", borderRadius: "10px", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", color: "#fff", outline: "none" }}
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-main)" }}>Password</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}><Lock size={16} /></span>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ width: "100%", padding: "12px 14px 12px 42px", borderRadius: "10px", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", color: "#fff", outline: "none" }}
              />
            </div>
          </div>

          {currentPage === "register" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-main)" }}>Confirm Password</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}><Lock size={16} /></span>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{ width: "100%", padding: "12px 14px 12px 42px", borderRadius: "10px", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid var(--border-color)", color: "#fff", outline: "none" }}
                />
              </div>
            </div>
          )}

          {currentPage === "register" && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
              <input 
                type="checkbox" 
                id="adminCheck"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                style={{ cursor: "pointer", width: "16px", height: "16px", accentColor: "var(--accent-purple)" }}
              />
              <label htmlFor="adminCheck" style={{ fontSize: "13px", color: "var(--text-main)", cursor: "pointer", userSelect: "none" }}>
                Register as an Admin (to add music)
              </label>
            </div>
          )}

          <button 
            type="submit" 
            className="btn-glow-purple"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "14px",
              borderRadius: "10px",
              background: "var(--gradient-primary)",
              border: "none",
              color: "#fff",
              fontWeight: "700",
              fontSize: "15px",
              cursor: "pointer",
              marginTop: "8px"
            }}
          >
            {currentPage === "login" ? "Sign In" : "Sign Up"}
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Demo Accounts Panel */}
        {currentPage === "login" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "14px", borderRadius: "10px", backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid var(--border-color)" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", color: "var(--accent-blue)" }}>
              Quick Fill Demo Accounts
            </span>
            <div style={{ display: "flex", gap: "8px" }}>
              <button 
                type="button" 
                onClick={() => fillDemoAccount("admin")}
                style={{ flex: 1, padding: "8px", borderRadius: "6px", backgroundColor: "rgba(157,78,221,0.15)", border: "1px solid rgba(157,78,221,0.3)", color: "var(--accent-purple)", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}
              >
                Alex (Admin)
              </button>
              <button 
                type="button" 
                onClick={() => fillDemoAccount("user")}
                style={{ flex: 1, padding: "8px", borderRadius: "6px", backgroundColor: "rgba(0,180,216,0.15)", border: "1px solid rgba(0,180,216,0.3)", color: "var(--accent-blue)", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}
              >
                Sarah (User)
              </button>
            </div>
          </div>
        )}

        {/* Switch Links */}
        <div style={{ textAlign: "center", fontSize: "13px", color: "var(--text-muted)", marginTop: "10px" }}>
          {currentPage === "login" ? (
            <span>
              Don't have an account?{" "}
              <strong onClick={() => setCurrentPage("register")} style={{ color: "var(--accent-purple)", cursor: "pointer", textDecoration: "underline" }}>Sign Up</strong>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <strong onClick={() => setCurrentPage("login")} style={{ color: "var(--accent-purple)", cursor: "pointer", textDecoration: "underline" }}>Sign In</strong>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
