<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-slate-900 mb-6">Explore</h1>
    
    <div class="grid grid-cols-2 gap-4">
      <div v-for="i in 6" :key="i" class="bg-white p-4 rounded-xl shadow-sm border border-slate-100 aspect-square flex flex-col items-center justify-center">
        <div class="h-10 w-10 bg-slate-100 rounded-full mb-3"></div>
        <span class="text-slate-600 font-medium text-sm">Item {{ i }}</span>
      </div>
    </div>
  </div>
</template>
