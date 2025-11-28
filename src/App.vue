<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Dialog } from '@capacitor/dialog'
import { useSettingsStore } from './stores/settings'
import { useNetworkStore } from './stores/network'

const settings = useSettingsStore()
const network = useNetworkStore()
const router = useRouter()
const isMenuOpen = ref(false)

onMounted(async () => {
  await settings.loadSettings()
  await network.initialize()
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const navigateTo = (path) => {
  router.push(path)
  isMenuOpen.value = false
}

const showAbout = async () => {
  isMenuOpen.value = false
  await Dialog.alert({
    title: 'About CapApp',
    message: 'This is a high-performance Vue 3 + Capacitor boilerplate designed for rapid mobile development.\n\nVersion 1.0.0',
  })
}

const showHelp = async () => {
  isMenuOpen.value = false
  await Dialog.alert({
    title: 'Help & Support',
    message: 'For support, please visit our documentation or contact support@example.com.',
  })
}

const doLogout = async () => {
  isMenuOpen.value = false
  const { value } = await Dialog.confirm({
    title: 'Logout',
    message: 'Are you sure you want to log out?',
  })
  
  if (value) {
    // Perform logout logic here
    console.log('User logged out')
  }
}
</script>

<template>
  <div class="flex flex-col h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
    
    <!-- Offline Banner -->
    <transition name="slide-down">
      <div v-if="!network.isConnected" class="fixed top-0 left-0 right-0 bg-red-600 text-white text-xs font-bold text-center py-1 z-[70] pt-[env(safe-area-inset-top)] mt-[env(safe-area-inset-top)] shadow-md">
        <span>You are offline. Check your connection.</span>
      </div>
    </transition>

    <!-- Top Header -->
    <header class="h-14 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 justify-between z-40 pt-[env(safe-area-inset-top)] mt-[env(safe-area-inset-top)] transition-transform duration-300" :class="{ 'translate-y-6': !network.isConnected }">
      <button @click="toggleMenu" class="p-2 -ml-2 text-slate-600 dark:text-slate-300 rounded-lg active:bg-slate-100 dark:active:bg-slate-800">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </button>
      <div class="font-bold text-lg text-slate-800 dark:text-white">CapApp</div>
      <div class="w-8"></div> <!-- Spacer for center alignment -->
    </header>

    <!-- Side Menu Drawer -->
    <div class="fixed inset-0 z-[60] pointer-events-none">
      <!-- Backdrop -->
      <transition name="fade">
        <div 
          v-if="isMenuOpen" 
          @click="toggleMenu"
          class="absolute inset-0 bg-black/50 pointer-events-auto backdrop-blur-sm"
        ></div>
      </transition>

      <!-- Drawer Panel -->
      <transition name="slide">
        <aside 
          v-if="isMenuOpen" 
          class="absolute top-0 left-0 bottom-0 w-64 bg-white dark:bg-slate-900 shadow-2xl pointer-events-auto flex flex-col"
        >
          <!-- Drawer Header -->
          <div class="p-6 bg-slate-100 dark:bg-slate-800 pt-[calc(env(safe-area-inset-top)+1.5rem)]">
            <div class="h-16 w-16 bg-slate-200 rounded-full mb-3 overflow-hidden">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" />
            </div>
            <h3 class="font-bold text-slate-900 dark:text-white">John Doe</h3>
            <p class="text-xs text-slate-500">john.doe@example.com</p>
          </div>

          <!-- Drawer Links -->
          <div class="flex-1 py-4 overflow-y-auto">
            <button @click="navigateTo('/profile')" class="w-full px-6 py-3 text-left text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center space-x-3 transition-colors">
              <svg class="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              <span>My Account</span>
            </button>
            <button @click="showAbout" class="w-full px-6 py-3 text-left text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center space-x-3 transition-colors">
              <svg class="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>About</span>
            </button>
            <button @click="showHelp" class="w-full px-6 py-3 text-left text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center space-x-3 transition-colors">
              <svg class="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              <span>Help & Support</span>
            </button>
          </div>

          <!-- Drawer Footer -->
          <div class="p-4 border-t border-slate-100 dark:border-slate-800">
             <button @click="doLogout" class="w-full py-2 px-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium flex items-center justify-center space-x-2 active:scale-95 transition-transform">
               <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
               <span>Logout</span>
             </button>
          </div>
        </aside>
      </transition>
    </div>

    <!-- Main Content Area with scroll -->
    <main class="flex-1 overflow-y-auto pb-20 pt-0">
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
          <!-- News Icon -->
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
          <span class="text-xs font-medium">News</span>
        </router-link>

        <router-link to="/explore" class="nav-item flex flex-col items-center justify-center w-full h-full text-slate-400 hover:text-blue-500">
          <!-- Database Icon -->
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
          <span class="text-xs font-medium">Data</span>
        </router-link>

        <router-link to="/profile" class="nav-item flex flex-col items-center justify-center w-full h-full text-slate-400 hover:text-blue-500">
          <!-- Settings Icon -->
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          <span class="text-xs font-medium">Settings</span>
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

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-100%);
}