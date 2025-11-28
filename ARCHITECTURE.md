# Project Architecture & Development Guide

This document defines the architectural patterns and coding standards for the **CapApp** project. It is intended to guide AI assistants and developers in maintaining consistency and stability.

## 🏗 High-Level Architecture

The application follows a **Service-Oriented Architecture** on the frontend, decoupled from the UI components.

1.  **UI Layer (Views/Components)**: Pure Vue 3 (Composition API). Responsible only for display logic and user interaction.
2.  **State Management (Pinia)**: Handles global app state (User Session, Theme, Network Status).
3.  **Service Layer (`src/services/`)**: The "Brain" of the app. Handles all business logic, API calls, Database queries, and Native Plugin interactions.
4.  **Native Bridge (Capacitor)**: Provides access to device features (Camera, SQLite, Haptics).

---

## 🛣 The "Golden Path" for New Features

When adding a new feature (e.g., "Task Manager"), follow this strict sequence:

1.  **Database Migration** (if data needs persistence):
    *   Update `src/services/sqlite.js`.
    *   Increment `DB_VERSION`.
    *   Add the SQL `CREATE TABLE` statement to the `upgrades` array.
2.  **Service Module**:
    *   Create `src/services/tasks.js`.
    *   Implement CRUD methods (`getAll`, `create`, `delete`) using the `api` instance or `DatabaseService`.
3.  **State Store** (Optional):
    *   If the data is shared across multiple tabs, create `src/stores/tasks.js`.
    *   If it's local to one view, skip this.
4.  **UI View**:
    *   Create `src/views/Tasks.vue`.
    *   Import the Service/Store.
    *   Use `<script setup>`.
5.  **Routing**:
    *   Register the new view in `src/router/index.js`.

---

## 📝 Code Templates

### 1. Service Module Template (`src/services/example.js`)
Use this pattern for API or Database logic.

```javascript
import api from './api' // or DatabaseService
import { Haptics, ImpactStyle } from '@capacitor/haptics'

export const ExampleService = {
  // Always use async/await
  async getItems() {
    try {
      // API Example:
      // const response = await api.get('/items')
      // return response.data

      // SQLite Example:
      // const result = await DatabaseService.query('SELECT * FROM items')
      // return result.values
    } catch (error) {
      console.error('ExampleService.getItems error:', error)
      throw error // Re-throw to let UI handle it
    }
  },

  async performAction(id) {
    // Add Haptics for significant actions
    await Haptics.impact({ style: ImpactStyle.Light })
    // ... logic
  }
}
```

### 2. View Component Template (`src/views/Example.vue`)
Use this pattern for all page-level components.

```vue
<script setup>
import { ref, onMounted } from 'vue'
import { ExampleService } from '../services/example'

// 1. State
const items = ref([])
const isLoading = ref(false)

// 2. Lifecycle
onMounted(async () => {
  await loadData()
})

// 3. Methods
const loadData = async () => {
  isLoading.value = true
  try {
    items.value = await ExampleService.getItems()
  } catch (e) {
    // Handle error (toast/alert)
    console.error(e)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Title</h1>
    
    <!-- Loading State -->
    <div v-if="isLoading">Loading...</div>

    <!-- Data List -->
    <div v-else>
      <div v-for="item in items" :key="item.id">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
```

---

## 📱 Platform Specifics

### Native vs. Web
The app runs on iOS, Android, and Web. **Never assume a native plugin exists.**

**Rule:** Always guard native calls or provide a web fallback.

**Bad:**
```javascript
// Crashes on Web
await Camera.getPhoto(...)
```

**Good:**
```javascript
import { Capacitor } from '@capacitor/core'

if (Capacitor.isNativePlatform()) {
  await Camera.getPhoto(...)
} else {
  // Web Fallback (e.g., file input)
  console.log('Web camera not supported')
}
```

### Safe Area Support
Use Tailwind arbitrary values or helper classes to respect the "Notch" and "Home Bar".

*   **Top:** `pt-[env(safe-area-inset-top)]`
*   **Bottom:** `pb-[env(safe-area-inset-bottom)]`

---

## 🎨 Styling Standards (Tailwind CSS v4)

*   **Dark Mode:** Use the `dark:` prefix.
*   **Colors:** Use `slate` for backgrounds/text and `blue` for primaries.
    *   Background: `bg-slate-50` (Light) / `dark:bg-slate-950` (Dark)
    *   Card: `bg-white` (Light) / `dark:bg-slate-800` (Dark)
    *   Text: `text-slate-900` (Light) / `dark:text-white` (Dark)
    *   Subtext: `text-slate-500` (Light) / `dark:text-slate-400` (Dark)

---

## 💾 Data Persistence Strategy

1.  **Simple Settings**: Use `src/services/preferences.js` (Wraps `@capacitor/preferences`).
    *   *Use for:* Dark mode toggle, Auth tokens, Flags.
2.  **Structured Data**: Use `src/services/sqlite.js` (Wraps `@capacitor-community/sqlite`).
    *   *Use for:* Offline content, cached lists, user generated content.
3.  **Global App State**: Use **Pinia**.
    *   *Use for:* Session user, temporary UI state (modals, loading).

---

## 🔄 Networking

*   **Always** use the `api` instance exported from `src/services/api.js`.
*   **Never** use `fetch` or raw `axios` directly in components.
*   The `api` instance handles:
    *   Base URL injection.
    *   Bearer Token attachment (from Preferences).
    *   401 Logout redirection.
