<script setup>
import { onMounted } from 'vue'
import { Haptics, ImpactStyle } from '@capacitor/haptics'
import { useSettingsStore } from '../stores/settings'

const settings = useSettingsStore()

const hapticTrigger = async () => {
  await Haptics.impact({ style: ImpactStyle.Light })
}

const setMode = async (mode) => {
  await hapticTrigger()
  await settings.setDarkMode(mode)
}

const toggleNotif = async () => {
  await hapticTrigger()
  await settings.toggleNotifications()
}
</script>

<template>
  <div class="p-6">
    <div class="flex items-center space-x-4 mb-8">
      <div class="h-16 w-16 bg-slate-200 rounded-full overflow-hidden">
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" />
      </div>
      <div>
        <h2 class="text-xl font-bold text-slate-900 dark:text-white">John Doe</h2>
        <p class="text-slate-500 text-sm">Mobile Developer</p>
      </div>
    </div>

    <div class="space-y-6">
      <!-- Settings Section -->
      <div>
        <h3 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">App Settings</h3>
        
        <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
          
          <!-- Dark Mode Selection -->
          <div class="p-4 border-b border-slate-100 dark:border-slate-700">
            <div class="flex items-center space-x-3 mb-3">
              <div class="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
              </div>
              <span class="text-slate-700 dark:text-slate-200 font-medium">Theme</span>
            </div>
            
            <div class="bg-slate-100 dark:bg-slate-900/50 p-1 rounded-lg flex">
              <button 
                @click="setMode('light')"
                class="flex-1 py-1.5 text-xs font-medium rounded-md transition-all duration-200"
                :class="settings.darkMode === 'light' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'"
              >
                Light
              </button>
              <button 
                @click="setMode('system')"
                class="flex-1 py-1.5 text-xs font-medium rounded-md transition-all duration-200"
                :class="settings.darkMode === 'system' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'"
              >
                System
              </button>
              <button 
                @click="setMode('dark')"
                class="flex-1 py-1.5 text-xs font-medium rounded-md transition-all duration-200"
                :class="settings.darkMode === 'dark' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'"
              >
                Dark
              </button>
            </div>
          </div>

          <!-- Notifications Toggle -->
          <div class="flex items-center justify-between p-4">
            <div class="flex items-center space-x-3">
              <div class="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
              </div>
              <span class="text-slate-700 dark:text-slate-200 font-medium">Notifications</span>
            </div>
            <button 
              @click="toggleNotif"
              :class="settings.notifications ? 'bg-blue-600' : 'bg-slate-200'"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
            >
              <span 
                :class="settings.notifications ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block h-4 w-4 transform rounded-full bg-white transition"
              />
            </button>
          </div>
          
        </div>
      </div>

      <!-- Debug Info -->
      <div class="text-xs text-center text-slate-400 font-mono">
        Mode: {{ settings.darkMode }}
      </div>

    </div>
  </div>
</template>
