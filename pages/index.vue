<template>
  <div class="min-h-screen font-sans">

    <div class="block lg:hidden bg-gray-50 pb-10 min-h-screen">
      
      <header class="bg-white p-4 shadow-sm flex items-center gap-3 sticky top-0 z-50">
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-white via-sber-blue to-sber-red border shadow-sm flex items-center justify-center overflow-hidden">
          <img src="/images/logo.png" alt="Логотип" class="w-7 h-7 object-contain" />
        </div>
        <h1 class="text-xl font-bold italic">ТыГотов!</h1>
      </header>

      <main class="max-w-md mx-auto p-4">
        
        <div class="grid grid-cols-4 gap-2 mb-8">
          
          <button 
            @click="activeTab = 'learn'" 
            class="card bg-white shadow-sm border-b-4 flex flex-col items-center p-3 transition-all duration-300"
            :class="activeTab === 'learn' ? 'border-sber-blue scale-105 shadow-md' : 'border-transparent text-gray-400 opacity-70'">
            <div class="w-12 h-12 mb-1 mask-icon transition-colors duration-300"
              :class="activeTab === 'learn' ? 'bg-sber-blue' : 'bg-gray-400'"
              style="mask-image: url('/images/icon-learn.png'); -webkit-mask-image: url('/images/icon-learn.png');"></div>
            <span class="text-[10px] font-bold uppercase text-center leading-tight transition-colors" :class="activeTab === 'learn' ? 'text-sber-blue' : 'text-gray-500'">Познай<br>Узнай</span>
          </button>

          <button 
            @click="activeTab = 'ask'" 
            class="card bg-white shadow-sm border-b-4 flex flex-col items-center p-3 transition-all duration-300"
            :class="activeTab === 'ask' ? 'border-sber-blue scale-105 shadow-md' : 'border-transparent text-gray-400 opacity-70'">
            <div class="w-12 h-12 mb-1 mask-icon transition-colors duration-300"
              :class="activeTab === 'ask' ? 'bg-sber-blue' : 'bg-gray-400'"
              style="mask-image: url('/images/icon-ask.png'); -webkit-mask-image: url('/images/icon-ask.png');"></div>
            <span class="text-[10px] font-bold uppercase text-center leading-tight transition-colors" :class="activeTab === 'ask' ? 'text-sber-blue' : 'text-gray-500'">Задай<br>вопрос</span>
          </button>

          <button 
            @click="activeTab = 'test'" 
            class="card bg-white shadow-sm border-b-4 flex flex-col items-center p-3 transition-all duration-300"
            :class="activeTab === 'test' ? 'border-sber-blue scale-105 shadow-md' : 'border-transparent text-gray-400 opacity-70'">
            <div class="w-12 h-12 mb-1 mask-icon transition-colors duration-300"
              :class="activeTab === 'test' ? 'bg-sber-blue' : 'bg-gray-400'"
              style="mask-image: url('/images/icon-test.png'); -webkit-mask-image: url('/images/icon-test.png');"></div>
            <span class="text-[10px] font-bold uppercase text-center leading-tight transition-colors" :class="activeTab === 'test' ? 'text-sber-blue' : 'text-gray-500'">Проверь<br>себя</span>
          </button>

          <button
            @click="activeTab = 'labor'"
            class="card bg-white shadow-sm border-b-4 flex flex-col items-center p-3 transition-all duration-300"
            :class="activeTab === 'labor' ? 'border-sber-blue scale-105 shadow-md' : 'border-transparent text-gray-400 opacity-70'">
            <div class="w-12 h-12 mb-1 mask-icon transition-colors duration-300"
              :class="activeTab === 'labor' ? 'bg-sber-blue' : 'bg-gray-400'"
              style="mask-image:url('/images/icon-labor.png');-webkit-mask-image:url('/images/icon-labor.png');"></div>
            <span class="text-[10px] font-bold uppercase text-center leading-tight" :class="activeTab === 'labor' ? 'text-sber-blue' : 'text-gray-500'">Охрана<br>труда</span>
          </button>
        </div>

        <transition name="fade" mode="out-in">
          <TabsTabLearn v-if="activeTab === 'learn'" :articles="articles" />
          <TabsTabAsk v-else-if="activeTab === 'ask'" />
          <TabsTabTests v-else-if="activeTab === 'test'" />
          <TabsTabLearn v-else-if="activeTab === 'labor'" :articles="laborArticles" />
        </transition>

      </main>
    </div>


    <div class="hidden lg:block bg-gray-100 min-h-screen">
      
      <header class="bg-white shadow-md">
        <div class="max-w-7xl mx-auto flex items-center gap-4 px-8 py-5">
          <div class="w-14 h-14 rounded-full bg-gradient-to-br from-white via-sber-blue to-sber-red border shadow-sm flex items-center justify-center overflow-hidden">
            <img src="/images/logo.png" alt="Логотип" class="w-10 h-10 object-contain" />
          </div>
          <h1 class="text-3xl font-bold italic">ТыГотов!</h1>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-8 py-8">

        <div class="grid grid-cols-4 gap-5 max-w-4xl mx-auto mb-10">

          <button
            @click="activeTab='learn'"
            class="card bg-white shadow-md border-b-4 flex flex-col items-center p-6 transition-all duration-300"
            :class="activeTab==='learn' ? 'border-sber-blue scale-105 shadow-xl' : 'border-transparent hover:shadow-lg'">
            <div class="w-16 h-16 mb-3 mask-icon transition-colors duration-300"
              :class="activeTab==='learn' ? 'bg-sber-blue' : 'bg-gray-400'"
              style="mask-image:url('/images/icon-learn.png');-webkit-mask-image:url('/images/icon-learn.png');"></div>
            <span class="font-bold text-base text-center" :class="activeTab==='learn' ? 'text-sber-blue' : 'text-gray-500'">Познай<br>Узнай</span>
          </button>

          <button
            @click="activeTab='ask'"
            class="card bg-white shadow-md border-b-4 flex flex-col items-center p-6 transition-all duration-300"
            :class="activeTab==='ask' ? 'border-sber-blue scale-105 shadow-xl' : 'border-transparent hover:shadow-lg'">
            <div class="w-16 h-16 mb-3 mask-icon"
              :class="activeTab==='ask' ? 'bg-sber-blue' : 'bg-gray-400'"
              style="mask-image:url('/images/icon-ask.png');-webkit-mask-image:url('/images/icon-ask.png');"></div>
            <span class="font-bold text-base text-center" :class="activeTab==='ask' ? 'text-sber-blue' : 'text-gray-500'">Задай<br>вопрос</span>
          </button>

          <button
            @click="activeTab='test'"
            class="card bg-white shadow-md border-b-4 flex flex-col items-center p-6 transition-all duration-300"
            :class="activeTab==='test' ? 'border-sber-blue scale-105 shadow-xl' : 'border-transparent hover:shadow-lg'">
            <div class="w-16 h-16 mb-3 mask-icon"
              :class="activeTab==='test' ? 'bg-sber-blue' : 'bg-gray-400'"
              style="mask-image:url('/images/icon-test.png');-webkit-mask-image:url('/images/icon-test.png');"></div>
            <span class="font-bold text-base text-center" :class="activeTab==='test' ? 'text-sber-blue' : 'text-gray-500'">Проверь<br>себя</span>
          </button>

          <button
            @click="activeTab='labor'"
            class="card bg-white shadow-md border-b-4 flex flex-col items-center p-6 transition-all duration-300"
            :class="activeTab==='labor' ? 'border-sber-blue scale-105 shadow-xl' : 'border-transparent hover:shadow-lg'">
            <div class="w-16 h-16 mb-3 mask-icon"
              :class="activeTab==='labor' ? 'bg-sber-blue' : 'bg-gray-400'"
              style="mask-image:url('/images/icon-labor.png');-webkit-mask-image:url('/images/icon-labor.png');"></div>
            <span class="font-bold text-base text-center" :class="activeTab==='labor' ? 'text-sber-blue' : 'text-gray-500'">Охрана<br>труда</span>
          </button>

        </div>

        <div class="max-w-5xl mx-auto">
          <transition name="fade" mode="out-in">
            <TabsTabLearn v-if="activeTab==='learn'" :articles="articles" />
            <TabsTabAsk v-else-if="activeTab==='ask'" />
            <TabsTabTests v-else-if="activeTab==='test'" />
            <TabsTabLearn v-else-if="activeTab==='labor'" :articles="laborArticles" />
          </transition>
        </div>

      </main>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { articles } from '~/data/articles'
import { laborArticles } from '~/data/laborArticles'

// Обе навигации теперь синхронно зависят от одной реактивной переменной
const activeTab = ref('learn')
</script>