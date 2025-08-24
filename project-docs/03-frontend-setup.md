# Frontend Setup (Expo React Native)

## Requirements
- Node 18+
- npm or yarn
- Expo CLI (optional) `npm i -g expo`

## Create/Run the app
The project is already scaffolded under `frontend/`.

```bash
cd frontend
npm install
npm run start
```
- Use Expo Go (iOS/Android) to scan the QR code, or run `npm run android` / `npm run ios` / `npm run web`.

## Environment
- Configure API base URL:
  - Copy `.env.example` to `.env` and edit as needed
  - `EXPO_PUBLIC_API_BASE=http://<your-ip>:8080`

## File highlights
- `app/(tabs)/index.tsx`: sample Todo UI talking to backend
- `app.config.ts`: app metadata