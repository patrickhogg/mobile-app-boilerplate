<script setup>
import { onMounted } from 'vue'
import { useSettingsStore } from './stores/settings'

const settings = useSettingsStore()

onMounted(() => {
  settings.loadSettings()
})
</script>

<template>
  <div class="flex flex-col h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
    <!-- Main Content Area with scroll -->
    <main class="flex-1 overflow-y-auto pb-20">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Bottom Navigation Bar -->
    <nav class="fixed bottom-0 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pb-[env(safe-area-inset-bottom)] z-50 transition-colors duration-300">
      <div class="flex justify-around items-center h-16">
        <router-link to="/" class="nav-item flex flex-col items-center justify-center w-full h-full text-slate-400 hover:text-blue-500">
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          <span class="text-xs font-medium">Home</span>
        </router-link>

        <router-link to="/explore" class="nav-item flex flex-col items-center justify-center w-full h-full text-slate-400 hover:text-blue-500">
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <span class="text-xs font-medium">Explore</span>
        </router-link>

        <router-link to="/profile" class="nav-item flex flex-col items-center justify-center w-full h-full text-slate-400 hover:text-blue-500">
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          <span class="text-xs font-medium">Profile</span>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<style>
/* Router Link Active State */
.router-link-active {
  color: #3b82f6; /* Blue-500 */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
