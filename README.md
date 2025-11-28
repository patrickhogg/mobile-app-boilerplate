# Capacitor Vue 3 Boilerplate

A modern, high-performance mobile application boilerplate built with **Vue 3**, **Vite**, **Tailwind CSS**, and **Capacitor**.

This project serves as a "Hello World" starting point for cross-platform mobile development (iOS & Android) while maintaining a standard web development workflow.

> **📘 Developer Guide:** Please read [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed coding standards, best practices, and the "Golden Path" for adding new features.

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
    -   **Migrations**: Uses `@capacitor-community/sqlite` upgrade statements to handle schema versioning automatically.
    -   **CRUD Demo**: The Explore tab allows adding and deleting items with persistence.

4.  **Networking Layer**:
    -   Centralized Axios instance in `src/services/api.js`.
    -   Global interceptors for Auth tokens and Error handling (401 redirects).
    -   Service-based architecture (e.g., `src/services/posts.js`) to decouple UI from API logic.

5.  **Navigation Architecture**:
    -   **Bottom Tabs**: For primary sections (News, Data, Settings).
    -   **Side Drawer**: For secondary actions (Account, About, Logout), accessible via the top-left hamburger menu.
    -   **Top Header**: Persistent app bar that handles safe-area spacing automatically.

6.  **Network Monitoring**:
    -   Real-time connection status tracking using `@capacitor/network`.
    -   Global "Offline" banner that slides down when internet access is lost.
    -   State managed via `src/stores/network.js`.

## 🗄️ Database Migrations

The project uses a version-based migration system located in `src/services/sqlite.js`.

To modify the database schema (e.g., add a column):
1.  Open `src/services/sqlite.js`.
2.  Increment `DB_VERSION` (e.g., from `1` to `2`).
3.  Add a new object to the `upgrades` array:
    ```javascript
    {
      toVersion: 2,
      statements: [
        `ALTER TABLE users ADD COLUMN phone TEXT;`
      ]
    }
    ```
4.  The next time the app runs on a user's device, it will detect the version change and apply the new statements.

## 🌐 Networking & API

The project uses a scalable **Service Layer** architecture for API interactions, located in `src/services/`.

### 1. The Core Client (`api.js`)
`src/services/api.js` exports a pre-configured Axios instance. Use this instead of `axios` directly.
-   **Base URL**: Configured in one place.
-   **Interceptors**: Automatically handles attaching tokens (request) and global error handling (response), such as redirecting to login on 401.

### 2. Service Modules (`posts.js`, `user.js`)
Instead of making API calls inside Vue components, organize them into service files.

**Example (`src/services/posts.js`):**
```javascript
import api from './api';

export const PostService = {
  async getAll() {
    // Uses the configured instance
    const response = await api.get('/posts'); 
    return response.data;
  }
};
```

**Usage in Component:**
```javascript
import { PostService } from '../services/posts';

const data = await PostService.getAll();
```

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
