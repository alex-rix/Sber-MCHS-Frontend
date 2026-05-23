<template>
  <div class="min-h-screen bg-white font-sans pb-10">
    
    <!-- Если статья найдена -->
    <div v-if="article">
      
      <!-- Шапка со стрелкой "Назад" -->
      <header class="absolute top-0 left-0 w-full p-4 z-50 flex items-center justify-between">
        <NuxtLink to="/" class="btn btn-sm btn-circle border-none bg-white/80 backdrop-blur shadow-sm text-gray-800 hover:bg-white">
          ←
        </NuxtLink>
      </header>

      <!-- Главная картинка статьи -->
      <figure class="w-full h-64 bg-gray-200 relative">
        <img 
          v-if="article.image" 
          :src="article.image" 
          :alt="article.title" 
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        <!-- Заголовок прямо на картинке -->
        <div class="absolute bottom-4 left-4 right-4">
          <h1 class="text-2xl font-bold text-white">{{ article.title }}</h1>
        </div>
      </figure>

      <main class="max-w-md mx-auto p-5 mt-2">
        <!-- Краткое описание -->
        <p class="text-gray-600 font-medium mb-6 leading-relaxed bg-blue-50 p-4 rounded-xl border border-blue-100">
          {{ article.description }}
        </p>
        
        <!-- Рендер Markdown текста -->
        <div v-if="article.content" class="prose prose-blue prose-p:text-gray-700 prose-li:text-gray-700 max-w-none">
          <MDC :value="article.content" />
        </div>
        <div v-else class="text-center text-gray-400 py-10">
          Контент статьи в разработке...
        </div>
      </main>

    </div>

    <!-- Если статья не найдена (например кривой URL) -->
    <div v-else class="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div class="text-6xl mb-4">😢</div>
      <h1 class="text-2xl font-bold mb-2">Статья не найдена</h1>
      <p class="text-gray-500 mb-6">Возможно, ссылка устарела или такой статьи не существует.</p>
      <NuxtLink to="/" class="btn bg-sber-blue text-white rounded-full px-8">На главную</NuxtLink>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { articles } from '~/data/articles.js'

// Получение доступа к текущему URL
const route = useRoute()

// Поиск статьи по ID из URL (например: /article/fire-safety)
const article = computed(() => {
  return articles.find(a => a.id === route.params.id)
})
</script>