# Chapter One - Task Manager App

## Overview

A polished Expo React Native TypeScript task manager built for the Chapter One technical screening assignment.

## Features

- Add tasks with trimmed input validation
- Toggle tasks complete/incomplete with polished visual state
- Delete tasks with React Native Paper confirmation dialog
- View all tasks with intentional empty state
- Local persistence with AsyncStorage
- Subtle Reanimated list-item animations
- Task statistics (total, completed, active)

## Tech Stack

- Expo
- React Native + TypeScript
- React Native Paper
- React Native Reanimated
- AsyncStorage
- Vitest (unit tests; React Native Testing Library was not added to avoid npm peer drift with Expo’s pinned React version)
- ESLint + Prettier
- Husky + lint-staged
- GitHub Actions CI
- Optional Docker validation

## Architecture

Feature-based architecture with thin screen composition:

- `App.tsx` stays minimal
- `src/screens/HomeScreen` focuses on composition and dialog/snackbar control
- `src/features/tasks` holds task-specific logic and UI
- `src/shared` holds reusable theme/utilities

Storage is isolated in `taskStorage.ts` (UI does not call AsyncStorage directly).

## Folder Structure

```text
src/
  app/
    AppProvider.tsx
    index.ts
  features/
    tasks/
      components/
      hooks/
      services/
      types/
      utils/
      index.ts
  screens/
    HomeScreen/
      HomeScreen.tsx
      index.ts
  shared/
    components/
    constants/
    hooks/
    theme/
    utils/
    index.ts
```

## Setup

```bash
npm install
```

## Run App

```bash
npm run start
npm run android
npm run ios
npm run web
```

## Validation Commands

```bash
npm run typecheck
npm run lint
npm run format:check
npm run test:run
```

## Additional Scripts

```bash
npm run lint:fix
npm run format
npm run test
npm run test:coverage
```

## Optional Docker (Validation Only)

Docker is optional and not required for normal development/review.

```bash
docker build -t chapter-one-validate .
docker run --rm chapter-one-validate

# or
docker compose run --rm validate
```

## CI

CI runs on push and pull_request and executes:

- install dependencies (`npm ci`)
- typecheck
- lint
- format check
- tests

## Backend Note

No backend is required for this assignment. The project uses local state and AsyncStorage because the assignment focuses on frontend development, user interaction, and state management.
