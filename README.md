# Spotify Clone - Premium Web Player UI

A pixel-perfect, highly responsive web player clone of Spotify built with HTML5, Vanilla CSS, and JavaScript.

## 🎵 Features Shipped

1. **Fixed Sidebar Shell**:
   - Spotify Brand Logo & Navigation Links (Home, Search).
   - "Your Library" list showing active tracks and dynamic playlist/album tags.
   - Smooth hover states on lists and rounded corners matching modern Spotify's interface.

2. **Scrollable Main Content**:
   - "Good afternoon" quick-play grid.
   - "Made for you", "Recently Played", and "Jump Back In" sections featuring grid cards.
   - Smooth hover overlay: green circular play button slides and fades into view on card hovers.
   - Transparent header that dynamically fades to solid black as the main content is scrolled.

3. **Sticky Bottom Player**:
   - Left side: album artwork, track title, artist name, and a toggleable favorite heart icon.
   - Center: playback controls (Shuffle, Skip Previous, Play/Pause Circle, Skip Next, Repeat) and a mock timeline.
   - Custom progress timeline which updates every second when playing and supports scrubbing/clicking to fast-forward/rewind.
   - Right side: volume controls (supports muting, variable levels) and utilities (Lyrics, Queue, Device, Miniplayer, Fullscreen).

## 🚀 Responsive Design
- Optimized for desktop viewports down to tablet size (collapses into an ergonomic sidebar).
- Fully responsive on mobile (hides the sidebar to maximize screen space for music discovery and the player bar).

## 🛠️ Built With
- **HTML5**: Semantic tags (`aside`, `main`, `footer`, `nav`, `header`).
- **Vanilla CSS**: Custom styling variables, custom interactive range sliders, flexbox and grid layouts, and hardware-accelerated animations.
- **JavaScript (ES6)**: State management, timeline interval simulator, event listeners, dynamic card generation, and UI state synchronization.
