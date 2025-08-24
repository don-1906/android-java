# CORS and Networking

## CORS
- Configured in `backend/src/main/java/com/example/todoapp/config/WebConfig.java`
- Allows common Expo dev origins

## Mobile device access
- Use machine LAN IP in frontend `.env`
- Ensure firewall allows 8080 and Expo dev ports (19000-19006)

## Troubleshooting
- If you see CORS errors, verify the `EXPO_PUBLIC_API_BASE` and allowed origins
- Consider using `ngrok` for remote testing