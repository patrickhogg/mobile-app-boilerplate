<script setup>
import { ref, onMounted } from 'vue'
import { Capacitor } from '@capacitor/core'
import { DatabaseService } from '../services/sqlite'
import { Haptics, ImpactStyle } from '@capacitor/haptics'

const users = ref([])
const newName = ref('')
const isWeb = Capacitor.getPlatform() === 'web'
const isLoading = ref(false)

onMounted(async () => {
  if (!isWeb) {
    await DatabaseService.initialize()
    await loadUsers()
  }
})

const loadUsers = async () => {
  isLoading.value = true
  try {
    users.value = await DatabaseService.getUsers()
  } catch (e) {
    console.error('Failed to load users', e)
  } finally {
    isLoading.value = false
  }
}

const addUser = async () => {
  if (!newName.value.trim()) return
  
  await Haptics.impact({ style: ImpactStyle.Medium })
  
  if (isWeb) {
    // Mock for web
    users.value.push({ id: Date.now(), name: newName.value, email: 'web@demo.com' })
    newName.value = ''
    return
  }

  try {
    await DatabaseService.addUser(newName.value, `user-${Date.now()}@test.com`)
    newName.value = ''
    await loadUsers()
  } catch (e) {
    console.error('Failed to add user', e)
  }
}

const deleteUser = async (id) => {
  await Haptics.impact({ style: ImpactStyle.Light })
  
  if (isWeb) {
    users.value = users.value.filter(u => u.id !== id)
    return
  }

  try {
    await DatabaseService.deleteUser(id)
    await loadUsers()
  } catch (e) {
    console.error('Failed to delete user', e)
  }
}
</script>

<template>
  <div class="p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">SQLite Demo</h1>
      <p class="text-slate-500 dark:text-slate-400 text-sm">
        Data persistence demo. Items added here are stored in a native SQLite database.
      </p>
    </div>

    <!-- Web Warning -->
    <div v-if="isWeb" class="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-xl flex items-start space-x-3">
      <svg class="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <div>
        <h3 class="text-sm font-semibold text-amber-800 dark:text-amber-200">Web Environment</h3>
        <p class="text-xs text-amber-700 dark:text-amber-300 mt-1">SQLite requires a native device. This demo is currently using mock data in memory.</p>
      </div>
    </div>
    
    <!-- Input Area -->
    <div class="flex space-x-3 mb-8">
      <input 
        v-model="newName" 
        @keyup.enter="addUser"
        type="text" 
        placeholder="Enter a name..." 
        class="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 placeholder-slate-400 transition-all"
      />
      <button 
        @click="addUser"
        class="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl px-6 transition-colors shadow-sm active:scale-95 transform duration-100"
      >
        Add
      </button>
    </div>

    <!-- List -->
    <div class="space-y-3">
      <div v-if="users.length === 0" class="text-center py-10 text-slate-400 dark:text-slate-500">
        <div class="mb-3">
          <svg class="w-12 h-12 mx-auto opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
        </div>
        No data found
      </div>

      <transition-group name="list">
        <div 
          v-for="user in users" 
          :key="user.id"
          class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-between"
        >
          <div class="flex items-center space-x-3">
            <div class="h-10 w-10 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 font-bold text-sm">
              {{ user.name.charAt(0).toUpperCase() }}
            </div>
            <div>
              <div class="font-medium text-slate-900 dark:text-white">{{ user.name }}</div>
              <div class="text-xs text-slate-500 dark:text-slate-400">ID: {{ user.id }}</div>
            </div>
          </div>
          
          <button 
            @click="deleteUser(user.id)"
            class="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
