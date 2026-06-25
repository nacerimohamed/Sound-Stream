import React, { useRef, useEffect, useState } from "react";
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Shuffle, 
  Repeat, 
  Volume2, 
  VolumeX, 
  Heart, 
  ListMusic, 
  Maximize2 
} from "lucide-react";

export default function Player({ 
  activeTrack, 
  isPlaying, 
  setIsPlaying, 
  volume, 
  setVolume, 
  favorites, 
  toggleFavorite,
  onNextTrack,
  onPrevTrack,
  setCurrentPage,
  setSongDetailsId
}) {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  // Play / Pause side-effect
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(err => {
        console.log("Audio play blocked by browser or failed:", err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, activeTrack]);

  // Track change side-effect
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.log("Audio play failed on track change:", err);
          setIsPlaying(false);
        });
      }
    }
  }, [activeTrack]);

  // Volume control side-effect
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleEnded = () => {
    if (isRepeat) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    } else {
      onNextTrack(isShuffle);
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const isLiked = activeTrack && favorites.includes(activeTrack.id);

  const handleTrackInfoClick = () => {
    if (activeTrack) {
      setSongDetailsId(activeTrack.id);
      setCurrentPage("song-details");
    }
  };

  return (
    <div className="music-player-fixed">
      {/* Hidden Audio Element */}
      {activeTrack && (
        <audio 
          ref={audioRef}
          src={activeTrack.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        />
      )}

      {/* Left: Track Info */}
      <div className="player-track-info" style={{ display: "flex", alignItems: "center", gap: "14px", width: "30%" }}>
        {activeTrack ? (
          <>
            <img 
              src={activeTrack.cover} 
              alt={activeTrack.title} 
              onClick={handleTrackInfoClick}
              style={{ width: "56px", height: "56px", borderRadius: "8px", objectFit: "cover", cursor: "pointer", border: "1px solid rgba(255,255,255,0.05)" }}
            />
            <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
              <span 
                onClick={handleTrackInfoClick}
                style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-active)", cursor: "pointer", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                onMouseOver={(e) => e.currentTarget.style.textDecoration = "underline"}
                onMouseOut={(e) => e.currentTarget.style.textDecoration = "none"}
              >
                {activeTrack.title}
              </span>
              <span 
                style={{ fontSize: "12px", color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
              >
                {activeTrack.artistName}
              </span>
            </div>
            <button 
              onClick={() => toggleFavorite(activeTrack.id)}
              style={{ background: "transparent", border: "none", color: isLiked ? "var(--accent-pink)" : "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center", transition: "transform 0.2s" }}
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.15)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              <Heart size={16} fill={isLiked ? "var(--accent-pink)" : "none"} />
            </button>
          </>
        ) : (
          <span style={{ fontSize: "13px", color: "var(--text-muted)", fontStyle: "italic" }}>No track selected</span>
        )}
      </div>

      {/* Center: Playback Controls */}
      <div className="player-center-controls" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", width: "40%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {/* Shuffle */}
          <button 
            onClick={() => setIsShuffle(!isShuffle)}
            style={{ 
              background: "transparent", 
              border: "none", 
              color: isShuffle ? "var(--accent-blue)" : "var(--text-muted)", 
              cursor: "pointer",
              transition: "color 0.2s"
            }}
            title="Shuffle"
          >
            <Shuffle size={16} />
          </button>

          {/* Previous */}
          <button 
            onClick={() => onPrevTrack()}
            style={{ background: "transparent", border: "none", color: "var(--text-active)", cursor: "pointer" }}
            title="Previous"
          >
            <SkipBack size={20} fill="currentColor" />
          </button>

          {/* Play / Pause Toggle */}
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            style={{ 
              width: "40px", 
              height: "40px", 
              borderRadius: "50%", 
              background: "var(--gradient-primary)", 
              border: "none", 
              color: "#fff", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              cursor: "pointer",
              boxShadow: "0 0 10px rgba(157, 78, 221, 0.4)",
              transition: "transform 0.2s"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause size={18} fill="currentColor" />
            ) : (
              <Play size={18} fill="currentColor" style={{ marginLeft: "2px" }} />
            )}
          </button>

          {/* Next */}
          <button 
            onClick={() => onNextTrack(isShuffle)}
            style={{ background: "transparent", border: "none", color: "var(--text-active)", cursor: "pointer" }}
            title="Next"
          >
            <SkipForward size={20} fill="currentColor" />
          </button>

          {/* Repeat */}
          <button 
            onClick={() => setIsRepeat(!isRepeat)}
            style={{ 
              background: "transparent", 
              border: "none", 
              color: isRepeat ? "var(--accent-purple)" : "var(--text-muted)", 
              cursor: "pointer",
              transition: "color 0.2s"
            }}
            title="Repeat"
          >
            <Repeat size={16} />
          </button>
        </div>

        {/* Seek Bar */}
        <div style={{ display: "flex", alignItems: "center", width: "100%", gap: "10px" }}>
          <span style={{ fontSize: "11px", color: "var(--text-muted)", minWidth: "30px", textAlign: "right" }}>
            {formatTime(currentTime)}
          </span>
          <input 
            type="range" 
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            style={{
              flexGrow: 1,
              height: "4px",
              borderRadius: "2px",
              outline: "none",
              cursor: "pointer",
              accentColor: "var(--accent-purple)",
              background: `linear-gradient(to right, var(--accent-purple) ${(currentTime / (duration || 100)) * 100}%, rgba(255,255,255,0.1) ${(currentTime / (duration || 100)) * 100}%)`
            }}
          />
          <span style={{ fontSize: "11px", color: "var(--text-muted)", minWidth: "30px" }}>
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Right: Sound & Extras */}
      <div className="player-right-controls" style={{ display: "flex", alignItems: "center", gap: "16px", width: "30%", justifyContent: "flex-end" }}>
        <button 
          onClick={handleTrackInfoClick}
          style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
          title="Lyrics & Details"
          onMouseOver={(e) => e.currentTarget.style.color = "var(--text-active)"}
          onMouseOut={(e) => e.currentTarget.style.color = "var(--text-muted)"}
        >
          <Maximize2 size={16} />
        </button>

        <button 
          onClick={() => setCurrentPage("home")}
          style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
          title="Browse"
          onMouseOver={(e) => e.currentTarget.style.color = "var(--text-active)"}
          onMouseOut={(e) => e.currentTarget.style.color = "var(--text-muted)"}
        >
          <ListMusic size={16} />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button 
            onClick={toggleMute}
            style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <input 
            type="range" 
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setVolume(val);
              setIsMuted(val === 0);
            }}
            style={{
              width: "80px",
              height: "4px",
              borderRadius: "2px",
              outline: "none",
              cursor: "pointer",
              accentColor: "var(--accent-blue)",
              background: `linear-gradient(to right, var(--accent-blue) ${volume * 100}%, rgba(255,255,255,0.1) ${volume * 100}%)`
            }}
          />
        </div>
      </div>
    </div>
  );
}
