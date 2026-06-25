// Mock Data for the Spotify-like Music Streaming App

export const mockArtists = [
  {
    id: "a1",
    name: "The Weeknd",
    avatar: "https://images.unsplash.com/photo-1601921004897-b7d582836990?w=400&h=400&fit=crop",
    banner: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=1200&h=400&fit=crop",
    bio: "Abel Makkonen Tesfaye, known professionally as The Weeknd, is a Canadian singer-songwriter and record producer. Known for his sonic versatility and dark lyricism, his music explores escapism, romance, and melancholia.",
    listeners: "98,421,054",
    verified: true,
    genres: ["R&B", "Pop", "Synth-pop"]
  },
  {
    id: "a2",
    name: "Dua Lipa",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
    banner: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200&h=400&fit=crop",
    bio: "Dua Lipa is an English and Albanian singer and songwriter. Her mezzo-soprano vocal range and disco-influenced pop production have received critical acclaim and media coverage.",
    listeners: "74,185,902",
    verified: true,
    genres: ["Pop", "Disco"]
  },
  {
    id: "a3",
    name: "Hans Zimmer",
    avatar: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=400&fit=crop",
    banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=400&fit=crop",
    bio: "Hans Florian Zimmer is a German film score composer and music producer. He has won two Oscars and four Grammys, and was nominated for a Tony Award and a Olivier Award.",
    listeners: "24,891,420",
    verified: true,
    genres: ["Soundtrack", "Cinematic", "Classical"]
  },
  {
    id: "a4",
    name: "Kavinsky",
    avatar: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&h=400&fit=crop",
    banner: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&h=400&fit=crop",
    bio: "Vincent Belorgey, known professionally as Kavinsky, is a French house artist whose production style is very strongly influenced by the electropop film soundtracks of the 1980s.",
    listeners: "4,512,890",
    verified: false,
    genres: ["Synthwave", "Electro", "French House"]
  },
  {
    id: "a5",
    name: "Billie Eilish",
    avatar: "https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?w=400&h=400&fit=crop",
    banner: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=400&fit=crop",
    bio: "Billie Eilish Pirate Baird O'Connell is an American singer-songwriter. She first gained public attention in 2015 with her debut single 'Ocean Eyes', written and produced by her brother Finneas O'Connell.",
    listeners: "82,349,101",
    verified: true,
    genres: ["Alt-Pop", "Indie", "Dark Pop"]
  }
];

export const mockAlbums = [
  {
    id: "al1",
    title: "After Hours",
    artistId: "a1",
    artistName: "The Weeknd",
    cover: "https://images.unsplash.com/photo-1583244532610-2a234e7c3eca?w=500&h=500&fit=crop",
    year: 2020,
    genre: "R&B / Synth-pop",
    plays: "4.2 Billion",
    description: "After Hours is the fourth studio album by Canadian singer the Weeknd, released on March 20, 2020, by XO and Republic Records. Self-produced primarily by the Weeknd, Max Martin and Metro Boomin."
  },
  {
    id: "al2",
    title: "Future Nostalgia",
    artistId: "a2",
    artistName: "Dua Lipa",
    cover: "https://images.unsplash.com/photo-1563200268-2c9740268809?w=500&h=500&fit=crop",
    year: 2020,
    genre: "Pop / Disco",
    plays: "3.8 Billion",
    description: "Future Nostalgia is the second studio album by English singer Dua Lipa, released on March 27, 2020, by Warner Records. Moving away from the contemporary pop styles of her debut album, it is a dance-pop and disco record."
  },
  {
    id: "al3",
    title: "Interstellar OST",
    artistId: "a3",
    artistName: "Hans Zimmer",
    cover: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500&h=500&fit=crop",
    year: 2014,
    genre: "Soundtrack",
    plays: "890 Million",
    description: "Interstellar is the soundtrack album to the 2014 film Interstellar directed by Christopher Nolan. The film score was composed by Hans Zimmer and features heavy usage of the pipe organ."
  },
  {
    id: "al4",
    title: "Outrun",
    artistId: "a4",
    artistName: "Kavinsky",
    cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&h=500&fit=crop",
    year: 2013,
    genre: "Synthwave",
    plays: "350 Million",
    description: "Outrun is the debut studio album by French electro house artist Kavinsky, released on 22 February 2010. The album is named after Sega's 1986 arcade game Out Run, which featured similar themes."
  },
  {
    id: "al5",
    title: "Hit Me Hard and Soft",
    artistId: "a5",
    artistName: "Billie Eilish",
    cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500&h=500&fit=crop",
    year: 2024,
    genre: "Alt-Pop",
    plays: "1.5 Billion",
    description: "Hit Me Hard and Soft is the third studio album by American singer-songwriter Billie Eilish, released on May 17, 2024, by Darkroom and Interscope Records."
  }
];

export const mockSongs = [
  {
    id: "s1",
    title: "Blinding Lights",
    artistId: "a1",
    artistName: "The Weeknd",
    albumId: "al1",
    albumName: "After Hours",
    cover: "https://images.unsplash.com/photo-1583244532610-2a234e7c3eca?w=300&h=300&fit=crop",
    duration: 200, // 3:20
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    plays: 3824901004,
    genre: "Synth-pop",
    lyrics: "I've been tryna call\nI've been on my own for long enough\nMaybe you can show me how to love, maybe\nI'm going through withdrawals\nYou don't even have to do too much\nYou can turn me on with just a touch, baby\n\nI look around and\nSin City's cold and empty\nNo one's around to judge me\nI can't see clearly when you're gone\n\nI said, ooh, I'm blinded by the lights\nNo, I can't sleep until I feel your touch\nI said, ooh, I'm drowning in the night\nOh, when I'm like this, you're the one I trust"
  },
  {
    id: "s2",
    title: "Save Your Tears",
    artistId: "a1",
    artistName: "The Weeknd",
    albumId: "al1",
    albumName: "After Hours",
    cover: "https://images.unsplash.com/photo-1583244532610-2a234e7c3eca?w=300&h=300&fit=crop",
    duration: 215, // 3:35
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    plays: 1945104921,
    genre: "Synth-pop",
    lyrics: "Ooh, yeah\nI saw you dancing in a crowded room\nYou look so happy when I'm not with you\nBut then you saw me, caught you by surprise\nA single teardrop falling from your eye\n\nI don't know why I run away\nI'll make you cry when I run away\n\nTake me back 'cause I wanna stay\nSave your tears for another day\nSave your tears for another day"
  },
  {
    id: "s3",
    title: "Don't Start Now",
    artistId: "a2",
    artistName: "Dua Lipa",
    albumId: "al2",
    albumName: "Future Nostalgia",
    cover: "https://images.unsplash.com/photo-1563200268-2c9740268809?w=300&h=300&fit=crop",
    duration: 183, // 3:03
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    plays: 2401948301,
    genre: "Disco-pop",
    lyrics: "If you don't wanna see me dancing with somebody\nIf you wanna believe that anything could stop me\n\nDon't show up, don't start caring about me now\nWalk away, you know how\nDon't start caring about me now\n\nAren't you the guy who tried to hurt me with the word 'goodbye'?\nThough it took some time to survive you, I'm better on the other side"
  },
  {
    id: "s4",
    title: "Levitating",
    artistId: "a2",
    artistName: "Dua Lipa",
    albumId: "al2",
    albumName: "Future Nostalgia",
    cover: "https://images.unsplash.com/photo-1563200268-2c9740268809?w=300&h=300&fit=crop",
    duration: 203, // 3:23
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    plays: 1823904812,
    genre: "Disco-pop",
    lyrics: "If you wanna run away with me, I know a galaxy\nAnd I can take you for a ride\nI had a premonition that we fell into a rhythm\nWhere the music don't stop for life\n\nGlitter in the sky, glitter in my eyes\nShining just the way I like\nIf you're feeling like you need a little bit of company\nYou met me at the perfect time\n\nYou want me, I want you, baby\nMy sugarboo, I'm levitating\nThe Milky Way, we're renegading\nI got you, moonlight, you're my starlight\nI need you all night, come on, levitate with me"
  },
  {
    id: "s5",
    title: "Cornfield Chase",
    artistId: "a3",
    artistName: "Hans Zimmer",
    albumId: "al3",
    albumName: "Interstellar OST",
    cover: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&h=300&fit=crop",
    duration: 126, // 2:06
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    plays: 450912384,
    genre: "Soundtrack",
    lyrics: "[Instrumental piece. The track rises dynamically using standard orchestra organs and sweeping violins to represent the awe of space flight and mathematical discovery.]"
  },
  {
    id: "s6",
    title: "Stay",
    artistId: "a3",
    artistName: "Hans Zimmer",
    albumId: "al3",
    albumName: "Interstellar OST",
    cover: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&h=300&fit=crop",
    duration: 412, // 6:52
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    plays: 284091240,
    genre: "Soundtrack",
    lyrics: "[Instrumental piece. Characterized by ticking clock motifs, low droning brass, and a slow, emotional crescendo representing time slipping away across dimensions.]"
  },
  {
    id: "s7",
    title: "Nightcall",
    artistId: "a4",
    artistName: "Kavinsky",
    albumId: "al4",
    albumName: "Outrun",
    cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=300&fit=crop",
    duration: 258, // 4:18
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    plays: 520481902,
    genre: "Synthwave",
    lyrics: "I'm giving you a nightcall to tell you how I feel\nI want to drive you through the night, down the hills\nI'm gonna tell you something you don't want to hear\nI'm gonna show you where it's dark, but have no fear\n\nThere's something inside you\nIt's hard to explain\nThey're talking about you, boy\nBut you're still the same"
  },
  {
    id: "s8",
    title: "L'Amour Toujours",
    artistId: "a4",
    artistName: "Kavinsky",
    albumId: "al4",
    albumName: "Outrun",
    cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=300&fit=crop",
    duration: 210, // 3:30
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    plays: 140284901,
    genre: "Synthwave",
    lyrics: "I still believe in your eyes\nI just don't care what you have done in your life\nBaby, I'll always be here by your side\nDon't leave me waiting too long, please come by\n\nI still believe in your eyes\nThere is no choice, I belong to your life\nBecause I will live to love you some day\nYou'll be my baby and we'll fly away"
  },
  {
    id: "s9",
    title: "LUNCH",
    artistId: "a5",
    artistName: "Billie Eilish",
    albumId: "al5",
    albumName: "Hit Me Hard and Soft",
    cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&h=300&fit=crop",
    duration: 180, // 3:00
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    plays: 684201948,
    genre: "Alt-Pop",
    lyrics: "I could eat that girl for lunch\nYeah, she dances on my tongue\nShe looks like she might be the one\nAnd I can never get enough\n\nI could buy you so much stuff\nIt's a craving, not a crush, huh\n'Call me when you're in the city'\nOh my God, she's so pretty\nAnd I'm so glad that you're with me"
  },
  {
    id: "s10",
    title: "CHIHIRO",
    artistId: "a5",
    artistName: "Billie Eilish",
    albumId: "al5",
    albumName: "Hit Me Hard and Soft",
    cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&h=300&fit=crop",
    duration: 303, // 5:03
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    plays: 890124802,
    genre: "Alt-Pop",
    lyrics: "To open up the door, page navigation\nI know you're waiting there, in concentration\nAnd if I find you, will you know it's me?\nOr will we just be strangers in the deep?\n\nI saw you in the corner, looking lonely\nI know you're not the type to call me only\nBut we could find a way to make it right\nUnder the cover of the neon light"
  }
];

export const mockPlaylists = [
  {
    id: "p1",
    name: "Late Night Drive",
    description: "Cruising down the neon-lit highway with the window rolled down. Perfect synthwave and dark pop mix.",
    cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500&h=500&fit=crop",
    creator: "SoundStream",
    tracks: ["s7", "s1", "s2", "s8", "s10"],
    plays: "1.2 Million Saves"
  },
  {
    id: "p2",
    name: "Focus & Flow",
    description: "Deep, cinematic score pieces to keep you locked in. Excellent for study, coding, or intense focus.",
    cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=500&fit=crop",
    creator: "Hans Zimmer Fan",
    tracks: ["s5", "s6", "s10"],
    plays: "480k Saves"
  },
  {
    id: "p3",
    name: "Electro Disco Party",
    description: "Upbeat basslines, glittering synthesizer sweeps, and punchy pop drums. Dance the night away.",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop",
    creator: "GrooveMaster",
    tracks: ["s3", "s4", "s1", "s9"],
    plays: "892k Saves"
  }
];

export const mockUsers = [
  {
    id: "u1",
    name: "Alex Mercer",
    email: "alex@soundstream.com",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
    role: "admin",
    joinedDate: "2024-01-15",
    favoriteGenre: "Synthwave",
    listeningTime: "458 hours"
  },
  {
    id: "u2",
    name: "Sarah Connor",
    email: "sarah@cyberdyne.io",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    role: "user",
    joinedDate: "2024-03-22",
    favoriteGenre: "Alt-Pop",
    listeningTime: "124 hours"
  },
  {
    id: "u3",
    name: "Marcus Vance",
    email: "marcus.v@gmail.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    role: "user",
    joinedDate: "2025-05-10",
    favoriteGenre: "Soundtrack",
    listeningTime: "87 hours"
  }
];
