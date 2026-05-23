<template>
  <section>
    <h2 class="text-2xl font-bold mb-4">Тестирования</h2>
    <div class="space-y-4">
      <div v-for="test in tests" :key="test.id" class="card bg-white shadow-md border border-gray-100 flex-row items-center p-4">
        
        <div class="mr-4 flex flex-col items-center justify-center w-14">
          <div v-if="savedResults[test.id]" class="w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg" 
            :class="savedResults[test.id].percentage < 50 ? 'bg-red-100 text-red-600' : savedResults[test.id].percentage <= 75 ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'">
            {{ savedResults[test.id].score }}/{{ savedResults[test.id].total }}
          </div>
          <div v-else class="text-4xl">📝</div>
        </div>

        <div class="flex-1">
          <h3 class="font-bold text-md leading-tight mb-1">{{ test.title }}</h3>
          
          <p v-if="savedResults[test.id]" class="text-[11px] font-medium mb-2 uppercase" 
            :class="savedResults[test.id].percentage < 50 ? 'text-red-500' : savedResults[test.id].percentage <= 75 ? 'text-yellow-500' : 'text-green-500'">
            {{ savedResults[test.id].percentage }}% — Тест завершен
          </p>
          <p v-else class="text-xs text-gray-500 mb-2 leading-tight">{{ test.description }}</p>
          
          <NuxtLink :to="test.testLink" class="btn hover:opacity-90 text-white border-none rounded-full btn-sm px-6 shadow-sm"
            :class="savedResults[test.id] ? 'bg-gray-400' : 'bg-sber-red'">
            {{ savedResults[test.id] ? 'Пройти заново' : 'Пройти тест' }}
          </NuxtLink>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { tests } from '~/data/articles.js'
// Получение доступа к стейту результатов
const savedResults = useState('testResults', () => ({}))
</script>