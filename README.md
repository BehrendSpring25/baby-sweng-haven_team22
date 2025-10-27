# BabySweng

<!-- Shields -->
[![Penn State 2025 - 2nd Place](https://img.shields.io/badge/Penn%20State%202025-2nd%20Place-blue.svg)](https://pennstate.edu)
[![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-17.0.0-61DAFB.svg?logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-%231DB954.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC.svg?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)


A Tamagotchi-like health & wellness game where you manage a software engineer.

This project was our entry for the Penn State 2025 Hackathon in the "Health and Wellness" category and placed second in the category.

## About

In BabySweng you take care of your office baby — a software engineer — by managing their activities and stats. You can put them to sleep, send them to work, or let them play video games. Each activity affects key stats that you must keep in balance:

- sleepiness
- stress
- sanity

You earn money by working, which you can spend in the in-game shop to buy items that modify your stats. Gain enough experience to level up and earn more money per tick.

Core gameplay mechanics and balancing live in `src/hooks/useGameState.tsx` (the reducer and tick logic). The main rules include:

- Stats are bounded between 0 and 100.
- Activities apply per-tick effects (sleep, work, gaming, idle).
- Purchased shop items apply multiplicative stat modifiers.
- If sleepiness or stress reach 100, sanity drains much faster.
- Experience reaches a threshold (XP_PER_LEVEL) to level up; leveling increases money gain.

## Features

- Simple Tamagotchi-like management for a software engineer character
- Activities: Sleep, Work, Gaming, Idle
- Persistent game state (saved to localStorage)
- Shop with purchasable items that alter stats
- Leveling system: earn experience, level up, make more money

## How to play

To change the babysweng's activity, click and drag the character to one of the activity stations on the game canvas:

- Drag the character to the sleep station to make them sleep.
- Drag the character to the work station to have them work and earn money.
- Drag the character to the gaming station to let them play video games and recover some stats.

Be careful: if the character's sanity reaches 0, the game is lost (game over). Keep sleepiness and stress balanced to protect sanity.

## Tech stack

- React + TypeScript
- Vite
- Tailwind CSS (shadcn UI components)

## How to run locally

Prerequisites: Node.js (or Bun). From the repository root you can install dependencies and start the dev server.

Using npm:

```powershell
npm install
npm run dev
```

Open the app in your browser at the URL printed by the dev server (http://localhost:8080).

## Where the game logic lives

- `src/hooks/useGameState.tsx` — tick loop, reducer, and stat management
- `src/components` — UI for the canvas, character, shop, and stat bars
- `src/data/shopItems.ts` — shop item definitions and effects

## Credits & Tools

This project leveraged several AI tools during development:

- Lovable — created the initial project blueprint and scaffolding
- GitHub Copilot — helped with coding details and implementation
- ChatGPT — assisted in generating graphics assets (character, background, interactables)

Team result: 2nd place in the Penn State 2025 Hackathon — Health & Wellness category.

## Contributing

Contributions, bug reports, and improvements are welcome. Open an issue or submit a pull request.
