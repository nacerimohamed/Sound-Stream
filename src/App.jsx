import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Player from "./components/Player";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Details from "./pages/Details";
import Auth from "./pages/Auth";
import PlaylistPage from "./pages/PlaylistPage";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";

import { 
  mockSongs, 
  mockArtists, 
  mockAlbums, 
  mockPlaylists, 
  mockUsers 
} from "./data/mockData";

export default function App() {
  // Core Database States (so CRUD modifications from admin panel propagate instantly!)
  const [songs, setSongs] = useState(mockSongs);
  const [artists, setArtists] = useState(mockArtists);
  const [albums, setAlbums] = useState(mockAlbums);
  const [users, setUsers] = useState(mockUsers);
  const [playlists, setPlaylists] = useState(mockPlaylists);

  // Active User session (pre-log in as Admin Alex Mercer by default for immediate dashboard testing)
  const [user, setUser] = useState(mockUsers[0]);

  // Page Routing & Selection States
  const [currentPage, setCurrentPage] = useState("home");
  const [artistDetailsId, setArtistDetailsId] = useState(null);
  const [albumDetailsId, setAlbumDetailsId] = useState(null);
  const [songDetailsId, setSongDetailsId] = useState(null);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);

  // Audio Playback & Preferences States
  const [activeTrack, setActiveTrack] = useState(mockSongs[0]); // pre-select "Blinding Lights"
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [favorites, setFavorites] = useState(["s1", "s2", "s7"]); // pre-load a few liked songs
  const [searchQuery, setSearchQuery] = useState("");

  // Playback Queue management
  const onNextTrack = (isShuffle = false) => {
    if (songs.length === 0) return;

    if (isShuffle) {
      const remainingSongs = songs.filter(s => s.id !== activeTrack.id);
      if (remainingSongs.length > 0) {
        const randIndex = Math.floor(Math.random() * remainingSongs.length);
        setActiveTrack(remainingSongs[randIndex]);
      }
    } else {
      const currIndex = songs.findIndex(s => s.id === activeTrack.id);
      const nextIndex = (currIndex + 1) % songs.length;
      setActiveTrack(songs[nextIndex]);
    }
    setIsPlaying(true);
  };

  const onPrevTrack = () => {
    if (songs.length === 0) return;
    const currIndex = songs.findIndex(s => s.id === activeTrack.id);
    const prevIndex = (currIndex - 1 + songs.length) % songs.length;
    setActiveTrack(songs[prevIndex]);
    setIsPlaying(true);
  };

  const toggleFavorite = (songId) => {
    if (favorites.includes(songId)) {
      setFavorites(favorites.filter(id => id !== songId));
    } else {
      setFavorites([...favorites, songId]);
    }
  };

  const createPlaylist = () => {
    const playlistName = prompt("Enter a name for your new playlist:");
    if (!playlistName || !playlistName.trim()) return;

    const newPlaylist = {
      id: "p" + (playlists.length + 1),
      name: playlistName.trim(),
      description: `A custom playlist created by ${user?.name || "Guest User"}. Add tracks below to start listening.`,
      cover: "",
      creator: user?.name || "Guest User",
      tracks: [],
      plays: "0 Saves"
    };

    setPlaylists([...playlists, newPlaylist]);
    setCurrentPlaylist(newPlaylist);
    setCurrentPage("playlist");
  };

  const logout = () => {
    setUser(null);
    setCurrentPage("home");
  };

  // Render Page Content Router
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <Home 
            songs={songs}
            artists={artists}
            albums={albums}
            setActiveTrack={setActiveTrack}
            setIsPlaying={setIsPlaying}
            setCurrentPage={setCurrentPage}
            setArtistDetailsId={setArtistDetailsId}
            setAlbumDetailsId={setAlbumDetailsId}
            setSongDetailsId={setSongDetailsId}
          />
        );
      case "search":
        return (
          <Search 
            songs={songs}
            artists={artists}
            albums={albums}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setActiveTrack={setActiveTrack}
            setIsPlaying={setIsPlaying}
            setCurrentPage={setCurrentPage}
            setArtistDetailsId={setArtistDetailsId}
            setAlbumDetailsId={setAlbumDetailsId}
            setSongDetailsId={setSongDetailsId}
          />
        );
      case "artist-details":
      case "album-details":
      case "song-details":
        return (
          <Details 
            currentPage={currentPage}
            artistId={artistDetailsId}
            albumId={albumDetailsId}
            songId={songDetailsId}
            songs={songs}
            artists={artists}
            albums={albums}
            setActiveTrack={setActiveTrack}
            setIsPlaying={setIsPlaying}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            setCurrentPage={setCurrentPage}
            setArtistDetailsId={setArtistDetailsId}
            setAlbumDetailsId={setAlbumDetailsId}
            setSongDetailsId={setSongDetailsId}
          />
        );
      case "playlist":
      case "favorites":
        return (
          <PlaylistPage 
            currentPage={currentPage}
            playlist={currentPlaylist}
            playlists={playlists}
            setPlaylists={setPlaylists}
            songs={songs}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            setActiveTrack={setActiveTrack}
            setIsPlaying={setIsPlaying}
            setCurrentPage={setCurrentPage}
            setSongDetailsId={setSongDetailsId}
            user={user}
          />
        );
      case "login":
      case "register":
        return (
          <Auth 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setUser={setUser}
          />
        );
      case "profile":
        return (
          <Profile 
            user={user}
            setUser={setUser}
            favorites={favorites}
            playlists={playlists}
          />
        );
      case "admin":
        return (
          <AdminDashboard 
            songs={songs}
            setSongs={setSongs}
            artists={artists}
            setArtists={setArtists}
            albums={albums}
            setAlbums={setAlbums}
            users={users}
            setUsers={setUsers}
          />
        );
      default:
        return <div style={{ color: "#fff" }}>Page not found.</div>;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw", overflow: "hidden" }}>
      {/* Top Application container */}
      <div className="app-container">
        
        {/* Left Navigation Sidebar */}
        <Sidebar 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          user={user}
          logout={logout}
          playlists={playlists}
          createPlaylist={createPlaylist}
          setCurrentPlaylist={setCurrentPlaylist}
        />

        {/* Right Dashboard panel */}
        <main className="main-content">
          <Navbar 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            user={user}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          
          {/* Scrollable pane rendering active tab */}
          <div className="content-pane">
            {renderPage()}
          </div>
        </main>
      </div>

      {/* Fixed bottom music player */}
      <Player 
        activeTrack={activeTrack}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        volume={volume}
        setVolume={setVolume}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        onNextTrack={onNextTrack}
        onPrevTrack={onPrevTrack}
        setCurrentPage={setCurrentPage}
        setSongDetailsId={setSongDetailsId}
      />
    </div>
  );
}
