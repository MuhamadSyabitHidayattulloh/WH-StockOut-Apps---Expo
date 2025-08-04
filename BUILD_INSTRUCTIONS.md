# Build Instructions - WH Stockout Apps

Panduan lengkap untuk membuat build APK dari aplikasi WH Stockout Apps.

## 🔧 Prerequisites

### 1. Install Node.js
```bash
# Download dan install Node.js 18+ dari https://nodejs.org
node --version  # Pastikan versi 18+
npm --version
```

### 2. Install Expo CLI
```bash
npm install -g @expo/cli eas-cli
```

### 3. Setup Expo Account
```bash
# Buat akun di https://expo.dev
# Login ke Expo CLI
npx expo login
```

## 📱 Build APK untuk Android

### Method 1: EAS Build (Recommended)

1. **Setup EAS Project**
```bash
cd wh-stockout-glassmorphism
npx eas init
```

2. **Configure Build**
```bash
# Edit eas.json jika diperlukan
# Konfigurasi sudah tersedia di project
```

3. **Build APK**
```bash
# Build preview APK
npx eas build --platform android --profile preview

# Build production APK
npx eas build --platform android --profile production
```

4. **Download APK**
- Link download akan muncul di terminal
- Atau check di https://expo.dev/accounts/[username]/projects/wh-stockout-glassmorphism/builds

### Method 2: Local Build

1. **Prebuild Native Code**
```bash
npx expo prebuild --platform android
```

2. **Install Android Studio**
- Download dari https://developer.android.com/studio
- Setup Android SDK dan build tools

3. **Build dengan Gradle**
```bash
cd android
./gradlew assembleRelease
```

4. **APK Location**
```
android/app/build/outputs/apk/release/app-release.apk
```

## 🍎 Build untuk iOS

### Prerequisites iOS
- macOS dengan Xcode 14+
- Apple Developer Account
- iOS Simulator atau device fisik

### Build Steps
```bash
# Build iOS
npx eas build --platform ios --profile preview

# Atau untuk production
npx eas build --platform ios --profile production
```

## 🔧 Build Configuration

### EAS Profiles (eas.json)

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

### App Configuration (app.json)

```json
{
  "expo": {
    "name": "WH Stockout Glassmorphism",
    "slug": "wh-stockout-glassmorphism",
    "version": "1.0.0",
    "android": {
      "package": "com.denso.whstockout",
      "permissions": [
        "android.permission.CAMERA",
        "android.permission.RECORD_AUDIO",
        "android.permission.VIBRATE"
      ]
    }
  }
}
```

## 📋 Pre-Build Checklist

### 1. Verify Dependencies
```bash
npx expo install --fix
npm audit fix
```

### 2. Test Locally
```bash
npx expo start
# Test di Expo Go atau simulator
```

### 3. Check Assets
- ✅ `assets/icon.png` (1024x1024)
- ✅ `assets/splash.png` (1284x2778)
- ✅ `assets/adaptive-icon.png` (1024x1024)
- ✅ Sound files di `src/assets/sounds/`

### 4. Environment Variables
```bash
# Set di eas.json atau .env
API_BASE_URL=http://10.122.73.131:8700/wh-stockout
```

## 🚀 Distribution Options

### 1. Internal Distribution
- Build dengan profile `preview`
- Share APK file langsung
- Tidak perlu Google Play Store

### 2. Google Play Store
- Build dengan profile `production`
- Upload ke Google Play Console
- Review process ~1-3 hari

### 3. Enterprise Distribution
- Setup enterprise certificates
- Internal app distribution
- MDM integration

## 🔍 Troubleshooting

### Common Build Errors

1. **"Expo account required"**
```bash
npx expo login
# Login dengan akun Expo yang valid
```

2. **"Android SDK not found"**
```bash
# Install Android Studio
# Set ANDROID_HOME environment variable
export ANDROID_HOME=$HOME/Android/Sdk
```

3. **"Build failed: Out of memory"**
```bash
# Increase heap size
export GRADLE_OPTS="-Xmx4g -XX:MaxPermSize=512m"
```

4. **"Asset not found"**
```bash
# Pastikan semua asset ada
ls -la assets/
# Copy missing assets
cp assets/icon.png assets/splash.png
```

### Performance Optimization

1. **Reduce Bundle Size**
```bash
# Remove unused dependencies
npm prune
npx expo install --fix
```

2. **Optimize Images**
- Compress images dengan tools seperti TinyPNG
- Use WebP format untuk Android

3. **Code Splitting**
- Implement lazy loading
- Use React.memo untuk komponen

## 📊 Build Monitoring

### Check Build Status
```bash
# List builds
npx eas build:list

# View specific build
npx eas build:view [build-id]
```

### Build Logs
- Check logs di Expo dashboard
- Download build artifacts
- Monitor build time dan size

## 🔐 Security Considerations

### 1. Code Obfuscation
```json
// app.json
{
  "expo": {
    "android": {
      "proguardFiles": ["proguard-rules.pro"]
    }
  }
}
```

### 2. API Security
- Use HTTPS endpoints
- Implement API key authentication
- Validate all inputs

### 3. Storage Security
- Encrypt sensitive data
- Use secure storage untuk credentials
- Clear cache on logout

## 📱 Testing Builds

### 1. Internal Testing
- Install APK di test devices
- Test semua fitur utama
- Verify camera dan scanner

### 2. User Acceptance Testing
- Deploy ke staging environment
- Test dengan real users
- Collect feedback

### 3. Performance Testing
- Monitor memory usage
- Test di low-end devices
- Check battery consumption

## 📞 Support

Jika mengalami masalah dalam build process:

1. **Check Documentation**
   - Expo docs: https://docs.expo.dev
   - EAS Build: https://docs.expo.dev/build/introduction/

2. **Community Support**
   - Expo Discord: https://chat.expo.dev
   - Stack Overflow: tag `expo`

3. **Internal Support**
   - Email: dev-team@denso.com
   - Slack: #mobile-dev-support

---

**Happy Building! 🚀**

