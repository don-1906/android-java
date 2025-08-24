# Troubleshooting

## Frontend cannot reach backend
- Verify backend is running on 8080
- Use LAN IP for physical devices
- Check CORS settings

## Build errors (backend)
- Ensure Java 17+ and Maven installed
- Run `mvn -U clean package`

## Expo issues
- Clear cache: `expo start -c`
- Reinstall deps: `rm -rf node_modules && npm install`