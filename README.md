# Capacitor Vue 3 Boilerplate

A modern, high-performance mobile application boilerplate built with **Vue 3**, **Vite**, **Tailwind CSS**, and **Capacitor**.

This project serves as a "Hello World" starting point for cross-platform mobile development (iOS & Android) while maintaining a standard web development workflow.

## 🚀 Tech Stack

- **Framework**: [Vue 3](https://vuejs.org/) (Script Setup)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [Vue Router 4](https://router.vuejs.org/)
- **Mobile Runtime**: [Capacitor 7](https://capacitorjs.com/)

## 📂 Project Structure

```text
/cap
├── android/              # Native Android project (generated)
├── ios/                  # Native iOS project (generated)
├── public/               # Static assets
├── src/
│   ├── assets/           # Images, icons, and global static files
│   ├── components/       # Reusable Vue components
│   ├── router/           # Vue Router configuration
│   ├── views/            # Main page views (Home, Explore, Profile)
│   ├── App.vue           # Root component with Bottom Navigation
│   ├── main.js           # Application entry point
│   └── style.css         # Global styles & Tailwind configuration
├── capacitor.config.json # Capacitor settings
└── vite.config.js        # Vite configuration
```

## 🛠 Prerequisites

- **Node.js**: v18+ recommended
- **Android Studio**: For Android development
- **Xcode**: For iOS development (macOS only)

## 📦 Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Initialize Tailwind CSS:**
   (Already configured in this boilerplate, but if starting fresh ensure `@tailwindcss/postcss` is installed).

## 💻 Development (Web)

Run the app in your browser with hot module replacement (HMR):

```bash
npm run dev
```

## 📱 Mobile Development

### 1. Initialize Platforms

If you haven't already, add the native platforms:

```bash
# Add Android
npx cap add android

# Add iOS (macOS only)
npx cap add ios
```

### 2. Syncing Changes

Every time you make changes to your Vue code or install a new npm package, you must build the web assets and sync them to the native projects:

```bash
npm run build
npx cap sync
```

### 3. Running on Emulator/Device

**Android:**
```bash
npx cap open android
```
*This opens Android Studio. Wait for Gradle sync to finish, then press the "Run" (Play) button.*

**iOS:**
```bash
npx cap open ios
```
*This opens Xcode. Select your simulator/device and press the "Play" button.*

## 🏗 Building for Production

1. **Build the web assets:**
   ```bash
   npm run build
   ```
   *Output is generated in the `dist/` directory.*

2. **Update native projects:**
   ```bash
   npx cap sync
   ```

3. **Compile Native Binary:**
   - **Android**: Use "Build > Generate Signed Bundle / APK" in Android Studio.
   - **iOS**: Use "Product > Archive" in Xcode.

## 🎨 Features & Customization

- **Safe Area Handling**: `style.css` includes CSS variables (`--sat`, `--sab`) to handle notches and home indicators automatically.
- **Mobile Navigation**: A fixed bottom tab bar is implemented in `App.vue`.
- **Transitions**: Basic route transitions are enabled in `App.vue`.
- **Tailwind v4**: Uses the latest Tailwind configuration via CSS imports in `style.css`.
