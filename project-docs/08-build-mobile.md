# Mobile Builds (Expo)

## Android
- Development: `npm run android`
- Build APK/AAB (EAS optional):
  - Install EAS: `npm i -g eas-cli`
  - Configure: `eas build:configure`
  - Build: `eas build -p android`

## iOS
- Development: `npm run ios` (requires macOS/Xcode) or use Expo Go
- Build IPA (EAS): `eas build -p ios`

## Notes
- Ensure `EXPO_PUBLIC_API_BASE` points to a reachable backend
- Prefer HTTPS for production