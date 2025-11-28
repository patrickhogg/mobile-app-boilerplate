<template>
  <div class="p-6">
    <div class="flex items-center space-x-4 mb-8">
      <div class="h-16 w-16 bg-slate-200 rounded-full overflow-hidden">
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" />
      </div>
      <div>
        <h2 class="text-xl font-bold text-slate-900">John Doe</h2>
        <p class="text-slate-500 text-sm">Mobile Developer</p>
      </div>
    </div>

    <div class="space-y-3">
      <button class="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 shadow-sm active:bg-slate-50 transition-colors">
        <span class="text-slate-700 font-medium">Account Settings</span>
        <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </button>
      <button class="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 shadow-sm active:bg-slate-50 transition-colors">
        <span class="text-slate-700 font-medium">Notifications</span>
        <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </button>
      <button class="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 shadow-sm active:bg-slate-50 transition-colors">
        <span class="text-slate-700 font-medium">Privacy</span>
        <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
      </button>
    </div>
  </div>
</template>
