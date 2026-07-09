<template>
  <section>

    <div class="block lg:hidden">
      <h2 class="text-2xl font-bold mb-4">Теоретическая часть</h2>

      <div class="space-y-4">
        <div v-for="article in articles" :key="article.id" class="card bg-white shadow-md border border-gray-100 overflow-hidden">
          
          <figure class="bg-gray-200 h-48 relative w-full">
            <img
              v-if="article.image"
              :src="article.image"
              :alt="article.title"
              class="w-full h-full object-cover"
              :class="{
                'object-[center_13%]': article.id === 'terror',
                'object-[center_14%]': article.id === 'pandemic',
                'object-[center_10%] scale-125': article.id === 'fire-safety',
                'object-[center_15%]': article.id === 'enterprise',
                'object-[center_20%]': article.id === 'office'
              }"
            />
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
    </div>

    <div class="hidden lg:block">
      <h2 class="text-2xl font-bold mb-6">Теоретическая часть</h2>

      <div class="grid md:grid-cols-2 gap-6">
        <div v-for="article in articles" :key="article.id" class="card bg-white shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition duration-300 h-full">
          
          <figure class="bg-gray-200 h-56 relative w-full">
            <img
              v-if="article.image"
              :src="article.image"
              :alt="article.title"
              class="w-full h-full object-cover"
              :class="{
                'object-[center_13%]': article.id === 'terror',
                'object-[center_14%]': article.id === 'pandemic',
                'object-[center_10%] scale-125': article.id === 'fire-safety',
                'object-[center_15%]': article.id === 'enterprise',
                'object-[center_20%]': article.id === 'office'
              }"
            />
            <div v-else class="w-full h-full flex items-center justify-center bg-gray-100">
              <span class="text-gray-400 text-sm">Нет фото</span>
            </div>
          </figure>

          <div class="card-body p-4">
            <h3 class="card-title text-lg">{{ article.title }}</h3>
            <p class="text-sm text-gray-600 mb-2">{{ article.description }}</p>
            <div class="card-actions justify-start">
              <NuxtLink :to="article.articleLink" class="btn bg-sber-blue hover:bg-blue-700 text-white border-none rounded-full px-10 btn-sm">
                Подробнее
              </NuxtLink>
            </div>
          </div>

        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
const props = defineProps({
  articles: {
    type: Array,
    required: true
  }
})
</script>