# Android Build and Release

## Prerequisites
- Android SDK, JDK 17, Gradle (managed by RN), Node/Yarn
- If Expo: `eas-cli`; else native RN Android toolchain

## Debug Build (emulator/device)
- Start Metro: `npm start`
- Run: `npm run android` (uses `adb` to install debug APK)

## Release Keystore
- Generate keystore:
```
keytool -genkeypair -v -storetype PKCS12 -keystore upload-keystore.jks -alias upload -keyalg RSA -keysize 2048 -validity 10000
```
- Place in `android/app/` and configure `android/gradle.properties` with passwords
- Update `android/app/build.gradle` signingConfigs → release

## Release Build
```
cd android && ./gradlew assembleRelease   # APK
./gradlew bundleRelease                   # AAB (Play Store)
```
Artifacts in `android/app/build/outputs/apk/` or `bundle/`

## Versioning
- Update `versionCode` and `versionName` in `android/app/build.gradle`

## Play Console
- Create app, upload AAB, set content ratings, privacy policy, store listing, testers, roll out

## Permissions and Proguard
- Review `AndroidManifest.xml`; add required permissions (INTERNET, CAMERA, READ_MEDIA_IMAGES)
- Enable Proguard/R8; test minified build; add keep rules for networking/serialization libs

## App Signing by Google (recommended)
- Upload keystore once; then upload `.pem` to Play for key upgrade if needed

## CI Builds
- Use GitHub Actions to build AAB on release tags; cache Gradle; upload artifacts