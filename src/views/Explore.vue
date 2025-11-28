<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-6">Explore</h1>
    
    <div class="grid grid-cols-2 gap-4">
      <div v-for="i in 6" :key="i" class="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 aspect-square flex flex-col items-center justify-center">
        <div class="h-10 w-10 bg-slate-100 dark:bg-slate-700 rounded-full mb-3"></div>
        <span class="text-slate-600 dark:text-slate-300 font-medium text-sm">Item {{ i }}</span>
      </div>
    </div>
  </div>
</template>
