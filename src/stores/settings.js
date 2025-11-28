import { defineStore } from 'pinia'
import { PreferenceService } from '../services/preferences'
import { StatusBar, Style } from '@capacitor/status-bar'
import { Capacitor } from '@capacitor/core'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    darkMode: 'system', // 'system' | 'light' | 'dark'
    notifications: true,
  }),
  actions: {
    async loadSettings() {
        const darkMode = await PreferenceService.get('darkMode')
              const notifications = await PreferenceService.get('notifications')
              
              // Handle legacy boolean values if they exist
              if (darkMode !== null) {
                if (typeof darkMode === 'boolean') {
                  this.darkMode = darkMode ? 'dark' : 'light'
                } else {
                  this.darkMode = darkMode
                }
              } else {
                this.darkMode = 'system'
              }
              
              if (notifications !== null) {
                this.notifications = notifications
              }
        
              this.applyTheme()
        
              // Listen for system changes
              window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
                if (this.darkMode === 'system') {
                  this.applyTheme()
                }
              })
    },
    async toggleDarkMode() {
        // Cycle through states: system -> light -> dark -> system
              if (this.darkMode === 'system') this.darkMode = 'light'
              else if (this.darkMode === 'light') this.darkMode = 'dark'
              else this.darkMode = 'system'
        
              await this.setDarkMode(this.darkMode)
    },
    async setDarkMode(mode) {
      this.darkMode = mode
      await PreferenceService.set('darkMode', mode)
      this.applyTheme()
    },
    applyTheme() {
        let isDark = false
        
              if (this.darkMode === 'system') {
                isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
              } else {
                isDark = this.darkMode === 'dark'
              }
        
              if (isDark) {
                document.documentElement.classList.add('dark')
                document.documentElement.style.colorScheme = 'dark'
              } else {
                document.documentElement.classList.remove('dark')
                document.documentElement.style.colorScheme = 'light'
              }
              this.updateStatusBar(isDark)
    },
    async toggleNotifications() {
      this.notifications = !this.notifications
      await PreferenceService.set('notifications', this.notifications)
    },
    async updateStatusBar(isDark) {
      if (Capacitor.isNativePlatform()) {
        try {
          await StatusBar.setStyle({
            style: isDark ? Style.Dark : Style.Light
          })
          // Optional: Match the background color exactly
          await StatusBar.setBackgroundColor({
            color: isDark ? '#020617' : '#f8fafc' // slate-950 vs slate-50
          })
        } catch (e) {
          console.warn('StatusBar not available', e)
        }
      }
    }
  }
})
