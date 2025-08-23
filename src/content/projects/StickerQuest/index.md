---
title: "StickerQuest"
description: "My attempt at Vibecoding"
date: "2025-01-15"
demoURL: "https://essotre.it"
repoURL: "https://github.com/DavideBri/essotre"
---

A location-based sticker-collecting game where users can place, discover, and interact with real stickers around the world. Featuring achievements and leaderboards, Esso Sticker blends real-world exploration with digital rewards.

> I made a Blog post about "Vibecoding" and how I built this project. You can read it [here](https://davidebri.github.io/blog/09-Vibecoding/i-tried-vibecoding).

---

## Features

### 🌍 Interactive Map
- **Browse & Discover:** Explore a world map filled with user-placed stickers.
     Using a third-party service: [Mapbox](https://www.mapbox.com/)
- **Place Stickers:** Authenticated users can place new stickers at their current location.
- **Filter & Search:** Filter stickers by type or status for a personalized experience.

### 🏆 Achievements & Badges
- **Earn Achievements:** Unlock badges for special accomplishments.
- **User Badge:** Display your selected achievement badge next to your username in comments, sticker details, and the leaderboard (except podium).
- **Badge Popover:** Click the badge to view achievement details in a mobile-friendly popover.

### 🗺️ Sticker Detail Pages
- **Sticker Info:** View sticker images, owner, collaborators, country, and stats.
- **Check-ins:** Check in to stickers to earn points (limited to once per sticker every 30 days).
- **Comments:** Leave comments and mention other users with @username.
- **Likes:** Like stickers and see who else has liked them.

### 🥇 Leaderboard
- **Yearly Rankings:** See the top explorers based on points from placing stickers and check-ins.
- **Podium:** Top 3 users are highlighted (badges hidden for podium).
- **Full Leaderboard:** All users ranked, with badges and stats.

### 👤 User Profiles & Activity
- **Profile Pages:** View your own and others’ profiles, including placed stickers, achievements, and activity.
- **Achievements Management:** Select or remove your displayed badge from the Activity page.

### 🔒 Authentication
- **Sign Up / Login:** Secure authentication with Supabase.
- **Contextual UI:** Features and actions adapt based on authentication status.

---

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **UI:** Tailwind CSS, shadcn/ui, Radix UI (Popover, Dialog, etc.)
- **State & Data:** React Query, React Context, custom hooks
- **Backend:** Supabase (database, authentication, edge functions)
- **Map:** Mapbox GL JS
- **Other:** Zod (validation), date-fns, Lucide icons



## Project Structure

```bash
src/
  components/      # Reusable UI components (modals, badge, map, etc.)
  pages/           # Main app pages (Map, Sticker Detail, Leaderboard, Profile, etc.)
  hooks/           # Custom React hooks for data and logic
  contexts/        # React context providers (e.g., Auth)
  lib/             # Utility functions
  integrations/    # Third-party integrations (e.g., Supabase client)
public/            # Static assets
supabase/          # Database migrations, edge functions
```
