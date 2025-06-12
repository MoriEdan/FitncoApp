# 🏃‍♀️ FitnCo Mobile App

<div align="center">
  <img src="https://fitnco.fit/assets/images/logo.png](https://fitnco.fit/wp-content/uploads/2022/10/Fitn-Co-Logo-Animasyon-Final.gif](https://fitnco.fit/wp-content/uploads/2022/10/Fitn-Co-Logo-Animasyon-Final.gif" alt="FitnCo Logo" width="200"/>
  
  <p align="center">
    <strong>Your Personal Fitness Journey Companion</strong>
  </p>
  
  <p align="center">
    <a href="https://apps.apple.com/tr/app/fitn-co/id1456247444?l=tr">
      <img src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg" alt="Download on the App Store" height="40">
    </a>
  </p>
  
  <p align="center">
    <img src="https://img.shields.io/badge/React%20Native-0.74.3-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React Native Version">
    <img src="https://img.shields.io/badge/Platform-iOS%20%7C%20Android-lightgrey?style=for-the-badge" alt="Platform">
    <img src="https://img.shields.io/badge/License-Private-red?style=for-the-badge" alt="License">
  </p>
</div>

---

## 📱 About FitnCo

FitnCo is a comprehensive fitness and nutrition tracking mobile application that helps users achieve their health goals through personalized meal plans, workout tracking, and professional guidance. Built with React Native, it provides a seamless cross-platform experience for both iOS and Android users.

### 🌟 Key Features

- **🍽️ Personalized Meal Plans** - Custom nutrition plans tailored to your goals
- **📊 Progress Tracking** - Visual charts and analytics for your fitness journey
- **💬 Real-time Messaging** - Direct communication with fitness professionals
- **📅 Daily Journey** - Track your daily activities and achievements
- **🏆 Goal Setting** - Set and monitor your fitness and nutrition goals
- **🌍 Multi-language Support** - Available in Turkish and English
- **📱 Cross-platform** - Native performance on both iOS and Android

---

## 🚀 Technology Stack

### Core Technologies
- **React Native 0.74.3** - Cross-platform mobile development
- **React 18.2.0** - UI component library
- **React Navigation 6.x** - Navigation and routing
- **Firebase** - Authentication and push notifications
- **Socket.io** - Real-time communication
- **Axios** - HTTP client for API requests

### Key Dependencies
- **UI/UX**: React Native Vector Icons, Linear Gradient, Modal, Charts
- **Navigation**: Bottom Tabs, Stack Navigation, Drawer Navigation
- **Communication**: Gifted Chat, Socket.io Client
- **Media**: Image Picker, SVG Support
- **Storage**: AsyncStorage
- **Internationalization**: i18n-js
- **Date/Time**: Moment.js, Calendars

---

## 🏗️ Project Structure

```
fitncoapp/
├── src/
│   ├── assets/           # Images, icons, and static resources
│   │   ├── icons/        # App icons and vector graphics
│   │   └── image/        # Images and photos
│   ├── components/       # Reusable UI components
│   │   ├── alert.js      # Custom alert component
│   │   ├── button.js     # Custom button styles
│   │   ├── header.js     # Navigation headers
│   │   └── ...
│   ├── constants/        # App constants and configuration
│   │   ├── colors.js     # Color palette
│   │   ├── endpoints.js  # API endpoints
│   │   └── style.js      # Global styles
│   ├── language/         # Internationalization
│   │   ├── en.js         # English translations
│   │   └── tr.js         # Turkish translations
│   └── screens/          # Application screens
│       ├── auth/         # Authenticated user screens
│       │   ├── admin/    # Admin panel screens
│       │   └── ...
│       ├── login/        # Authentication screens
│       └── register/     # User registration flow
├── android/              # Android-specific code
├── ios/                  # iOS-specific code
└── package.json          # Project dependencies
```

---

## 🛠️ Development Setup

### Prerequisites

- **Node.js** >= 18.0.0
- **Yarn** 3.6.4+ (Package Manager)
- **React Native CLI**
- **Xcode** (for iOS development)
- **Android Studio** (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MoriEdan/FitncoApp.git
   cd FitncoApp
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **iOS Setup**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start Metro bundler**
   ```bash
   yarn start
   ```

5. **Run the application**
   ```bash
   # For iOS
   yarn ios
   
   # For Android
   yarn android
   ```

---

## 📱 Available Scripts

- `yarn start` - Start the Metro bundler
- `yarn android` - Run on Android device/emulator
- `yarn ios` - Run on iOS device/simulator
- `yarn test` - Run the test suite
- `yarn lint` - Run ESLint for code quality

---

## 🎨 App Screenshots

| Daily Journey | Meal Planning | Progress Tracking | Messaging |
|:---:|:---:|:---:|:---:|
| ![Daily Journey](https://via.placeholder.com/200x400/FF6B6B/FFFFFF?text=Daily+Journey) | ![Meal Planning](https://via.placeholder.com/200x400/4ECDC4/FFFFFF?text=Meal+Planning) | ![Progress](https://via.placeholder.com/200x400/45B7D1/FFFFFF?text=Progress) | ![Messaging](https://via.placeholder.com/200x400/96CEB4/FFFFFF?text=Messaging) |

---

## 🌐 Links

- **🏠 Website**: [fitnco.fit](https://fitnco.fit/)
- **📱 iOS App**: [Download on App Store](https://apps.apple.com/tr/app/fitn-co/id1456247444?l=tr)
- **🏢 Developer**: [Liberyus](https://www.liberyus.com/)

---

## 👥 Team

**Developed by [Liberyus](https://www.liberyus.com/)**

Liberyus is a leading software development company specializing in mobile applications, web development, and digital solutions.

---

## 📄 License

This project is proprietary and confidential. All rights reserved by Liberyus.

---

## 🤝 Contributing

This is a private project. For any questions or suggestions, please contact the development team at Liberyus.

---

## 📞 Support

For technical support or inquiries:
- Visit: [liberyus.com](https://www.liberyus.com/)
- App Support: [fitnco.fit](https://fitnco.fit/)

---

<div align="center">
  <p>Made with ❤️ by <a href="https://www.liberyus.com/">Liberyus</a></p>
  <p>© 2024 FitnCo. All rights reserved.</p>
</div>

