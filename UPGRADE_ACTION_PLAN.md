# Immediate Action Plan: Library Upgrades for React 18 & RN 0.74

## 🚨 CRITICAL PRIORITY (Week 1)

These libraries must be addressed immediately due to security vulnerabilities or deprecated status:

### 1. Upgrade axios (Security Vulnerability)
```bash
yarn remove axios
yarn add axios@^1.7.7
```
**Breaking Changes**: Review all HTTP requests - axios 1.x has API changes

### 2. Remove react-native-unimodules (Deprecated)
```bash
yarn remove react-native-unimodules
```
**Action Required**: Remove all imports and replace with individual Expo modules

### 3. Replace rn-fetch-blob (Deprecated)
```bash
yarn remove rn-fetch-blob
yarn add react-native-blob-util@^0.19.9
```
**Action Required**: Update all file operation imports and method calls

## 🔥 HIGH PRIORITY (Week 2)

### 4. Upgrade Firebase packages
```bash
yarn remove @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/messaging
yarn add @react-native-firebase/app@^20.4.0 @react-native-firebase/auth@^20.4.0 @react-native-firebase/messaging@^20.4.0
```
**Action Required**: Update Firebase configuration files

### 5. Upgrade react-native-device-info
```bash
yarn remove react-native-device-info
yarn add react-native-device-info@^11.1.0
```
**Action Required**: Review device info method calls

### 6. Upgrade react-native-gesture-handler
```bash
yarn remove react-native-gesture-handler
yarn add react-native-gesture-handler@^2.18.1
```
**Action Required**: Update gesture implementations

## 📱 MEDIUM PRIORITY (Week 3)

### 7. Replace react-native-simple-time-picker
```bash
yarn remove react-native-simple-time-picker
yarn add @react-native-community/datetimepicker@^8.2.0
```
**Action Required**: Rewrite time picker components

### 8. Upgrade react-native-screens
```bash
yarn remove react-native-screens
yarn add react-native-screens@^3.34.0
```
**Action Required**: Update native dependencies

### 9. Upgrade react-native-safe-area-context
```bash
yarn remove react-native-safe-area-context
yarn add react-native-safe-area-context@^4.10.8
```
**Action Required**: Update safe area hook usage

## 🎨 LOW PRIORITY (Week 4)

### 10. Upgrade react-native-svg
```bash
yarn remove react-native-svg
yarn add react-native-svg@^15.6.0
```
**Action Required**: Update SVG component props

### 11. Upgrade react-native-webview
```bash
yarn remove react-native-webview
yarn add react-native-webview@^13.10.5
```
**Action Required**: Update WebView configurations

### 12. Replace moment (Optional but Recommended)
```bash
yarn remove moment
yarn add date-fns@^3.6.0
# OR
yarn add dayjs@^1.11.13
```
**Action Required**: Replace all moment usage for better performance

## 🔧 Post-Upgrade Tasks

After each upgrade, run:

### iOS
```bash
cd ios && pod install && cd ..
```

### Android
```bash
cd android && ./gradlew clean && cd ..
```

### Test Build
```bash
yarn start --reset-cache
yarn android  # or yarn ios
```

## 📱 Platform-Specific Considerations

### iOS
- Update Podfile if necessary
- Check for iOS-specific breaking changes
- Test on iOS simulator/device

### Android
- Update android/app/build.gradle if necessary
- Check for Android-specific breaking changes
- Test on Android emulator/device

### Windows
- Ensure react-native-windows compatibility
- Test on Windows platform

## 🚨 Emergency Patches (If Upgrades Fail)

If any library upgrade causes critical issues, use patch-package:

1. Install patch-package:
```bash
yarn add -D patch-package
```

2. Add to package.json scripts:
```json
{
  "scripts": {
    "postinstall": "patch-package"
  }
}
```

3. Create patches for problematic libraries:
```bash
npx patch-package library-name
```

## ✅ Verification Checklist

After each upgrade, verify:

- [ ] App builds successfully
- [ ] No TypeScript/ESLint errors
- [ ] All screens load correctly
- [ ] Navigation works properly
- [ ] Firebase authentication works
- [ ] Push notifications work
- [ ] File operations work
- [ ] Gestures and touch handling work
- [ ] Performance is maintained or improved

## 📊 Progress Tracking

| Library | Status | Date Completed | Issues Found |
|---------|--------|----------------|-------------|
| axios | ⏳ Pending | | |
| react-native-unimodules | ⏳ Pending | | |
| rn-fetch-blob | ⏳ Pending | | |
| @react-native-firebase/* | ⏳ Pending | | |
| react-native-device-info | ⏳ Pending | | |
| react-native-gesture-handler | ⏳ Pending | | |
| react-native-simple-time-picker | ⏳ Pending | | |
| react-native-screens | ⏳ Pending | | |
| react-native-safe-area-context | ⏳ Pending | | |
| react-native-svg | ⏳ Pending | | |
| react-native-webview | ⏳ Pending | | |
| moment | ⏳ Pending | | |

---

**Legend:**
- ⏳ Pending
- 🔄 In Progress
- ✅ Completed
- ❌ Issues Found
- 🔧 Needs Patch

---

*This action plan ensures React 18.2.0 and React Native 0.74.3 compatibility*

