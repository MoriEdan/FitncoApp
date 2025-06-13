# Windows Development Setup for React Native Project

This guide will help you set up the development environment for this React Native project on Windows.

## Prerequisites

### System Requirements
- Windows 10 version >= 10.0.17763.0 (October 2018 Update)
- At least 16 GB of RAM
- At least 15 GB of free disk space
- Developer mode enabled
- Long path support enabled

### Enable Developer Mode
1. Open Settings → Update & Security → For developers
2. Select "Developer mode"

### Enable Long Path Support
1. Open Group Policy Editor (gpedit.msc) as Administrator
2. Navigate to: Computer Configuration → Administrative Templates → System → Filesystem
3. Enable "Enable Win32 long paths"

## Required Software

### 1. Node.js
- Install Node.js LTS version (>= 18.0)
- Download from: https://nodejs.org/
- Current version used: v18.20.2

### 2. Yarn
- Install Yarn package manager
- Run: `npm install -g yarn`
- Current version used: 3.6.4

### 3. Java Development Kit (JDK)
- Install OpenJDK 17 (Temurin distribution recommended)
- Download from: https://adoptium.net/
- Current version used: OpenJDK 17.0.13+11

### 4. Android Studio
- Download and install Android Studio
- Download from: https://developer.android.com/studio
- During installation, make sure to install:
  - Android SDK
  - Android SDK Platform
  - Performance (Intel ® HAXM)
  - Android Virtual Device

### 5. .NET SDK
- Install .NET SDK 6.0 LTS
- Download from: https://dotnet.microsoft.com/download/dotnet/6.0

### 6. Visual Studio 2022 (For Windows app development)
- Install Visual Studio 2022 (>= 17.11.0) with required components
- Required workloads:
  - Universal Windows Platform development
  - Desktop development with C++

## Environment Variables

Set the following environment variables in your system:

### JAVA_HOME
```
JAVA_HOME=C:\Java\jdk-17
```

### ANDROID_HOME
```
ANDROID_HOME=C:\Users\[USERNAME]\AppData\Local\Android\Sdk
```

### ANDROID_SDK_ROOT
```
ANDROID_SDK_ROOT=C:\Users\[USERNAME]\AppData\Local\Android\Sdk
```

### PATH Updates
Add the following to your PATH environment variable:
- `%JAVA_HOME%\bin`
- `%ANDROID_HOME%\platform-tools`
- `%ANDROID_HOME%\tools`
- `%ANDROID_HOME%\tools\bin`

## Setting Environment Variables

1. Right-click "This PC" → Properties
2. Click "Advanced system settings"
3. Click "Environment Variables"
4. Under "System variables", click "New" to add each variable
5. Find "Path" in system variables, click "Edit", then "New" to add each path entry

## Project Setup

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   yarn install
   ```

4. For iOS (if planning to develop for iOS):
   ```bash
   cd ios && pod install && cd ..
   ```

## Verification

Run the React Native doctor to verify your setup:
```bash
npx react-native doctor
```

All sections should show ✓ except:
- Metro (will show ● when not running - this is normal)
- Visual Studio components (if not planning Windows development)

## Troubleshooting

### Visual Studio 2022 Components Issue
If you see an error about Visual Studio 2022 components, run:
```powershell
powershell.exe -ExecutionPolicy Unrestricted -NoProfile "C:\path\to\project\node_modules\react-native-windows\Scripts\rnw-dependencies.ps1" -Check VSUWP
```

### Common Issues

1. **ANDROID_HOME not recognized**: Restart your terminal/IDE after setting environment variables
2. **Java version conflicts**: Ensure JAVA_HOME points to JDK 17
3. **Metro bundler issues**: Try clearing cache with `yarn start --reset-cache`
4. **Gradle build failures**: Ensure Android SDK tools are properly installed

## Running the Project

### Android
```bash
# Start Metro bundler
yarn start

# In another terminal, run Android app
yarn android
```

### iOS (if applicable)
```bash
# Start Metro bundler
yarn start

# In another terminal, run iOS app
yarn ios
```

## Additional Tools (Optional)

- **Android Emulator**: Configure through Android Studio AVD Manager
- **Flipper**: React Native debugging tool
- **VS Code**: Recommended editor with React Native extensions

## Notes

- Make sure Windows Defender or other antivirus software doesn't interfere with the build process
- Consider adding project folders to antivirus exclusions for better performance
- Restart your computer after installing all tools and setting environment variables

---

**Last Updated**: December 2024
**Tested with**: React Native CLI, Windows 11, Node.js 18.20.2

