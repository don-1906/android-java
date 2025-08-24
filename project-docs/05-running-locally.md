# Running Locally

## Start backend
```bash
cd backend
mvn spring-boot:run
```
Backend at `http://localhost:8080`.

## Start frontend
```bash
cd frontend
npm install
npm run start
```
Set API base URL for device testing:
- Create `frontend/.env`:
```env
EXPO_PUBLIC_API_BASE=http://<your-lan-ip>:8080
```

## Testing on device
- Ensure phone and dev machine are on same LAN
- Allow CORS (already configured)
- Use LAN URL from Expo dev server