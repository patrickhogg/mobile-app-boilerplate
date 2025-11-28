<template>
  <div class="p-6">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-slate-900 dark:text-white">Hello World 2</h1>
      <p class="text-slate-500 dark:text-slate-400 mt-2">Welcome to your modern Capacitor app.</p>
    </div>

    <!-- Feature Card -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 mb-6 border border-slate-100 dark:border-slate-700">
      <div class="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
        <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
      </div>
      <h2 class="text-xl font-semibold text-slate-900 dark:text-white">Fast & Native</h2>
      <p class="text-slate-600 dark:text-slate-300 mt-2 text-sm leading-relaxed">
        Built with Vue 3, Vite, and Tailwind CSS. Wrapped by Capacitor for native performance.
      </p>
    </div>

    <!-- Status Card -->
    <div class="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
      <h2 class="text-lg font-semibold mb-2">System Status</h2>
      <div class="flex items-center space-x-2">
        <span class="relative flex h-3 w-3">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
        </span>
        <span class="text-indigo-100 text-sm font-medium">Online</span>
      </div>
    </div>
  </div>
</template>
