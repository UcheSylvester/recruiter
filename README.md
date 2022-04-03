# Recriuter

This repository encapsulates both frontend and the backend API needed by the website.

## How to run locally?

Frontend

- `cd client` -> Move to the `client` folder
- `yarn` or `npm install` -> install dependencies
- `yarn start` -> starts the frontend application in development mode. This runs on `http://localhost:3000` by default.

Backend

- `cd server` -> Move to the `server` folder
- `yarn` or `npm install` -> install dependencies
- `yarn start` -> starts the server on `http://localhost:8000`

## Architectural Decisions / Structure

### Frontend

- `/components`: contains all the components used for the code. Most of which are reusuable; including a **layout** that would server as a wrapper for the entire app.
- `/components/VisibilityHidden`: This is mostly for improving accessibility by adding contents to the page that's are visually hidden buut available to assistive technologies (eg. screen readers)
- `/hooks`: contains `useData` and `useOnboardingForm`. **useData** is for managing network requests. **useOnboardingForm** contains the logic for `OnboardingForm` thus separating the UI for the logic.
  -Some of the components are fully tested with **100%** coverage. NB: Due to time constraint I couldn't do this for all the components.

### Backend

- The backend is a simple express app that resolve to `/employees` route, for fetching and creating employees.
- `/employees` handles only 2 methods: `get` and `post` form creating and fetching employees.
- The data is not persisted (time constraint) however this could be implemented with `mongoose` or `postgres` database.
