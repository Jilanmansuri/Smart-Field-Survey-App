# Smart Field Survey App 🗺️📱

A premium, responsive, and cross-platform React Native mobile application built with **Expo SDK 54** and **TypeScript** to streamline field audits, asset tracking, and site inspections.

---

## ✨ Features

- **📊 Modern Dashboard:** Get visual insights on active drafts, total saved audits, and live surveyor profile summaries.
- **🆔 Unique Survey ID Generator:** Generates unique tracking IDs (e.g., `SURVEY-2026-XXXX`) automatically for every new draft, syncing it through the checklist preview and database history logs.
- **📸 Site Asset Captures:** Seamless image capture and gallery picker using `expo-camera` and `expo-image-picker` with an auto-dismiss preview on completion.
- **📍 GPS Geo-Location & Maps:** Live coordinate fetching with spinners, accuracy metrics, and interactive maps using `expo-location` and `react-native-maps`. Supports copying raw comma-separated coordinates (`lat, lng`) to the clipboard.
- **👥 Site Contacts Linker:** Reads native device contacts and binds supervisor phone numbers directly to survey reports using `expo-contacts`.
- **📋 Field Notes Clipboard:** Easy clipboard imports and exports using `expo-clipboard`.
- **📅 Native Calendar Picker:** Calendar interface using `@react-native-community/datetimepicker` for simple date selections without manual typing.
- **👤 Surveyor Profiles:** Customize name, profile image, role, and Employee ID. Integrates seamlessly with automatic profile data migrations.
- **🌗 Dark Mode & Premium Aesthetics:** Beautiful glassmorphic themes, elevation shadows, and dynamic margins built natively for both light and dark systems.

---

## 🛠️ Technology Stack

- **Framework:** [Expo SDK 54](https://docs.expo.dev/) (React Native 0.81)
- **Navigation & Routing:** File-based [Expo Router](https://docs.expo.dev/router/introduction) (Drawer & Bottom Tabs layouts)
- **Local Persistence:** [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) for cached drafts and audit history.
- **Styling:** Dynamic stylesheet theme mapping using React Native `useColorScheme`.
- **Sensors & APIs:** 
  - `expo-camera` (Photo captures)
  - `expo-image-picker` (Avatar/Photos gallery)
  - `expo-location` (GPS coordinates)
  - `react-native-maps` (Interactive maps and markers)
  - `expo-contacts` (Address book linker)
  - `expo-clipboard` (Clipboard integrations)
  - `@react-native-community/datetimepicker` (Native calendars)
  - `expo-navigation-bar` (System navigation bar color controllers)

---

## 📂 Project Structure

```bash
├── app/                  # File-based routing navigation layout
│   ├── (drawer)/         # Main Drawer navigator
│   │   ├── (tabs)/       # Bottom Tab navigator (Dashboard, Create Survey, History, Profile)
│   │   ├── _layout.jsx   # Custom drawer layout (Groups, Profile Header, Offline sync log simulation)
│   │   ├── camera.jsx    # Custom camera viewport
│   │   ├── location.jsx  # Interactive GPS mapping and copying screen
│   │   └── preview.jsx   # Draft summary checklists
│   └── _layout.tsx       # App root setup & Android system navigation coloring
├── components/           # Reusable UI component blocks
├── constants/            # Curated theme color palettes and system styles
├── contexts/             # Survey context (states, CRUD operations, history management)
├── package.json          # System dependencies and build configurations
└── eas.json              # EAS cloud build configuration profiles
```

---

## 🚀 Getting Started

### 📋 Prerequisites

Make sure you have [Node.js](https://nodejs.org/), [Git](https://git-scm.com/), and [Expo CLI](https://docs.expo.dev/more/expo-cli/) installed.

### ⚙️ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/Smart-Field-Survey-App.git
   cd Smart-Field-Survey-App
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### 📱 Running the Project

Start the local bundler:
```bash
npx expo start
```

Scan the QR code in the terminal using the [Expo Go](https://expo.dev/go) app (Android) or the Camera app (iOS) to open the app on your physical device, or run:
- **`a`** to launch on an Android emulator.
- **`i`** to launch on an iOS simulator.

---

## 📦 Building for Production

This project is configured with **EAS (Expo Application Services)** build profiles inside `eas.json`.

### 1. Build an Installable APK (Android)
To compile a standalone `.apk` bundle in the cloud that you can install directly onto devices:
```bash
eas build --platform android --profile preview
```

### 2. Build for Google Play Store (.aab)
To build a production release ready for submission to the Google Play Store:
```bash
eas build --platform android --profile production
```

### 3. Build locally (requires local SDK setups)
```bash
npx expo run:android --variant release
```

---

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.
