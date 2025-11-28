# Capacitor Vue 3 Boilerplate

A modern, high-performance mobile application boilerplate built with **Vue 3**, **Vite**, **Tailwind CSS**, and **Capacitor**.

This project serves as a "Hello World" starting point for cross-platform mobile development (iOS & Android) while maintaining a standard web development workflow.

## 🚀 Tech Stack

- **Framework**: [Vue 3](https://vuejs.org/) (Script Setup)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [Vue Router 4](https://router.vuejs.org/)
- **Mobile Runtime**: [Capacitor 7](https://capacitorjs.com/)
- **Database**: [Capacitor SQLite](https://github.com/capacitor-community/sqlite)
- **Native Features**: Haptics, Preferences, Status Bar

## 📂 Project Structure

```text
/cap
├── android/              # Native Android project
├── ios/                  # Native iOS project
├── src/
│   ├── services/         # API & Device Wrappers (SQLite, Preferences)
│   ├── stores/           # Pinia State Stores
│   ├── views/            # Main page views
│   ├── App.vue           # Root component
│   └── main.js           # App Entry & Plugin Setup
```

## 📦 Key Packages

| Package | Purpose |
| :--- | :--- |
| `pinia` | State Management |
| `@capacitor-community/sqlite` | Native Database |
| `@capacitor/preferences` | Simple Key/Value Storage |
| `@capacitor/haptics` | Vibration/Feedback |

## 📱 Features Implemented

1.  **Tri-State Dark Mode**: 
    -   Support for **System**, **Light**, and **Dark** modes.
    -   Automatically listens to OS changes when in "System" mode.
    -   Forces native Status Bar styling to match the theme.
    -   Uses Tailwind v4 custom variants (`style.css`) to ensure reliable switching on native devices.

2.  **Native Integration**:
    -   **Haptics**: Buttons provide tactile feedback on tap.
    -   **Preferences**: Settings are persisted using `@capacitor/preferences`.
    -   **Status Bar**: The system status bar adapts its color and style based on the active theme.

3.  **SQLite Database**: 
    -   A `DatabaseService` (`src/services/sqlite.js`) is ready to use.
    -   Handles initialization and basic query execution for offline-first data storage.

## 💻 Development

Run the app in your browser:
```bash
npm run dev
```
*Note: SQLite features will log a warning in the browser as they require the native environment or the `jeep-sqlite` web adapter.*

## 🏗 Building & Running on Device

We have included convenience scripts to make the mobile workflow faster.

| Command | Description |
| :--- | :--- |
| `npm run android` | Builds web assets, syncs to Android, and opens Android Studio. |
| `npm run sync:android` | Builds web assets and syncs to Android (without opening Studio). |
| `npm run ios` | Builds web assets, syncs to iOS, and opens Xcode. |
| `npm run sync:ios` | Builds web assets and syncs to iOS (without opening Xcode). |

### Manual Workflow

If you prefer to run commands manually:

1. **Build & Sync:**
   ```bash
   npm run build
   npx cap sync
   ```

2. **Run on Android:**
   ```bash
   npx cap open android
   ```

3. **Run on iOS:**
   ```bash
   npx cap open ios
   ```
