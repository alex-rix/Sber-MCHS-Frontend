<template>
  <section>
    <h2 class="text-2xl font-bold mb-4">Теоретическая часть</h2>
    <div class="space-y-4">
      <div v-for="article in articles" :key="article.id" class="card bg-white shadow-md border border-gray-100 overflow-hidden">
        
        <figure class="bg-gray-200 h-48 relative w-full">
          <img v-if="article.image" :src="article.image" :alt="article.title" class="w-full h-full object-cover" />
          <div v-else class="w-full h-full flex items-center justify-center bg-gray-100">
            <span class="text-gray-400 text-sm">Нет фото</span>
          </div>
        </figure>

        <div class="card-body p-4">
          <h3 class="card-title text-lg">{{ article.title }}</h3>
          <p class="text-sm text-gray-600 mb-2">{{ article.description }}</p>
          <div class="card-actions justify-start">
            <NuxtLink :to="article.articleLink" class="btn bg-sber-blue hover:bg-blue-700 text-white border-none rounded-full px-8 btn-sm">
              Подробнее
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { articles } from '~/data/articles.js'
</script>