<template>
  <div class="min-h-screen bg-gray-50 font-sans pb-10">
    
    <!-- Шапка с логотипом и названием -->
    <header class="bg-white p-4 shadow-sm flex items-center gap-3 sticky top-0 z-50">
      <div class="w-10 h-10 rounded-full bg-gradient-to-br from-white via-sber-blue to-sber-red border shadow-sm flex items-center justify-center overflow-hidden">
        <img src="/images/logo.png" alt="Логотип" class="w-7 h-7 object-contain" />
      </div>
      <h1 class="text-xl font-bold italic">ТыГотов!</h1>
    </header>

    <main class="max-w-md mx-auto p-4">
      
      <!-- Три плитки навигации -->
      <div class="grid grid-cols-3 gap-3 mb-8">
        <!-- Плитка 1: Познай Узнай -->
        <button 
          @click="activeTab = 'learn'" 
          class="card bg-white shadow-sm border-b-4 flex flex-col items-center p-3 transition-all duration-300"
          :class="activeTab === 'learn' ? 'border-sber-blue scale-105 shadow-md' : 'border-transparent text-gray-400 opacity-70'">
          <div class="w-12 h-12 mb-1 mask-icon transition-colors duration-300"
            :class="activeTab === 'learn' ? 'bg-sber-blue' : 'bg-gray-400'"
            style="mask-image: url('/images/icon-learn.png'); -webkit-mask-image: url('/images/icon-learn.png');"></div>
          <span class="text-[10px] font-bold uppercase text-center leading-tight transition-colors" :class="activeTab === 'learn' ? 'text-sber-blue' : 'text-gray-500'">Познай<br>Узнай</span>
        </button>

        <!-- Плитка 2: Задай вопрос -->
        <button 
          @click="activeTab = 'ask'" 
          class="card bg-white shadow-sm border-b-4 flex flex-col items-center p-3 transition-all duration-300"
          :class="activeTab === 'ask' ? 'border-sber-blue scale-105 shadow-md' : 'border-transparent text-gray-400 opacity-70'">
          <div class="w-12 h-12 mb-1 mask-icon transition-colors duration-300"
            :class="activeTab === 'ask' ? 'bg-sber-blue' : 'bg-gray-400'"
            style="mask-image: url('/images/icon-ask.png'); -webkit-mask-image: url('/images/icon-ask.png');"></div>
          <span class="text-[10px] font-bold uppercase text-center leading-tight transition-colors" :class="activeTab === 'ask' ? 'text-sber-blue' : 'text-gray-500'">Задай<br>вопрос</span>
        </button>

        <!-- Плитка 3: Проверь себя -->
        <button 
          @click="activeTab = 'test'" 
          class="card bg-white shadow-sm border-b-4 flex flex-col items-center p-3 transition-all duration-300"
          :class="activeTab === 'test' ? 'border-sber-blue scale-105 shadow-md' : 'border-transparent text-gray-400 opacity-70'">
          <div class="w-12 h-12 mb-1 mask-icon transition-colors duration-300"
            :class="activeTab === 'test' ? 'bg-sber-blue' : 'bg-gray-400'"
            style="mask-image: url('/images/icon-test.png'); -webkit-mask-image: url('/images/icon-test.png');"></div>
          <span class="text-[10px] font-bold uppercase text-center leading-tight transition-colors" :class="activeTab === 'test' ? 'text-sber-blue' : 'text-gray-500'">Проверь<br>себя</span>
        </button>
      </div>

      <!-- Рендеринг компонентов вкладок -->
      <transition name="fade" mode="out-in">
        <TabsTabLearn v-if="activeTab === 'learn'" />
        <TabsTabAsk v-else-if="activeTab === 'ask'" />
        <TabsTabTests v-else-if="activeTab === 'test'" />
      </transition>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Вся навигация сводится к одной переменной
const activeTab = ref('learn')
</script>