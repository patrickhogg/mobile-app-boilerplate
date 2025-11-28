<script setup>
import { ref, onMounted } from 'vue';
import { PostService } from '../services/posts';

const posts = ref([]);
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    posts.value = await PostService.getAll();
  } catch (e) {
    error.value = 'Failed to load news feed.';
  } finally {
    isLoading.value = false;
  }
});

const reload = async () => {
  isLoading.value = true;
  error.value = null;
  posts.value = []; // Clear to show skeleton
  
  try {
    // Artificial delay to feel "native"
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const data = await PostService.getAll();
    // Shuffle to show change
    posts.value = data.sort(() => Math.random() - 0.5);
  } catch (e) {
    error.value = 'Failed to refresh.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="p-6">
    <div class="mb-8 flex justify-between items-end">
      <div>
        <h1 class="text-3xl font-bold text-slate-900 dark:text-white">News Feed</h1>
        <p class="text-slate-500 dark:text-slate-400 mt-2 text-sm">Latest updates from the network.</p>
      </div>
      <button @click="reload" class="p-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg active:scale-95 transition-transform">
        <svg class="w-5 h-5" :class="{ 'animate-spin': isLoading }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
      </button>
    </div>

    <!-- Error State -->
    <div v-if="error" class="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm mb-6">
      {{ error }}
    </div>

    <!-- Loading Skeleton -->
    <div v-if="isLoading && posts.length === 0" class="space-y-4">
      <div v-for="n in 3" :key="n" class="animate-pulse bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
        <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-3"></div>
        <div class="h-3 bg-slate-100 dark:bg-slate-700/50 rounded w-full"></div>
      </div>
    </div>

    <!-- News List -->
    <div v-else class="space-y-4">
      <div v-for="post in posts" :key="post.id" class="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm transition-colors">
        <div class="flex items-start justify-between mb-2">
          <span class="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] font-bold uppercase tracking-wider rounded-md">Update</span>
          <span class="text-xs text-slate-400">#{{ post.id }}</span>
        </div>
        <h3 class="text-base font-semibold text-slate-900 dark:text-white mb-2 leading-tight">{{ post.title }}</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{{ post.body }}</p>
      </div>
    </div>

  </div>
</template>
