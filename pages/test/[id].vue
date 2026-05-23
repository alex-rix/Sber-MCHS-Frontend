<template>
  <div class="min-h-screen bg-gray-50 font-sans pb-10 flex flex-col">
    
    <header class="bg-white p-4 shadow-sm sticky top-0 z-50 flex items-center gap-4">
      <NuxtLink to="/" class="btn btn-sm btn-ghost btn-circle">←</NuxtLink>
      <h1 class="text-lg font-bold truncate">Тестирование</h1>
    </header>

    <main v-if="testData" class="max-w-md mx-auto p-4 flex-1 w-full flex flex-col">
      
      <!-- Экран вопросов -->
      <div v-if="!showResult" class="flex-1 flex flex-col">
        <div class="mb-6">
          <div class="flex justify-between text-sm text-gray-500 mb-2">
            <span>Вопрос {{ currentQuestionIndex + 1 }} из {{ testData.questions.length }}</span>
            <span class="font-bold text-sber-blue">{{ Math.round(((currentQuestionIndex) / testData.questions.length) * 100) }}%</span>
          </div>
          <progress class="progress progress-info w-full" :value="currentQuestionIndex" :max="testData.questions.length"></progress>
        </div>

        <h2 class="text-xl font-bold mb-6 leading-snug">{{ currentQuestion.text }}</h2>

        <div class="space-y-3 mb-8">
          <button 
            v-for="(option, index) in currentQuestion.options" 
            :key="index"
            @click="!isAnswered && selectOption(index)"
            class="w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between"
            :class="getOptionClass(index)"
          >
            <span class="font-medium" :class="getOptionTextClass(index)">{{ option }}</span>
            
            <!-- Иконки (Галочка / Крестик) показываются только после ответа -->
            <span v-if="isAnswered && index === currentQuestion.correctIndex" class="text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
            </span>
            <span v-else-if="isAnswered && selectedOptionIndex === index" class="text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </span>
          </button>
        </div>

        <div class="mt-auto">
          <!-- Кнопка меняется в зависимости от состояния -->
          <button v-if="!isAnswered" @click="checkAnswer" :disabled="selectedOptionIndex === null" class="btn bg-sber-blue hover:bg-blue-700 text-white w-full rounded-full border-none">
            Ответить
          </button>
          <button v-else @click="nextQuestion" class="btn bg-blue-500 hover:bg-blue-600 text-white w-full rounded-full border-none">
            Далее →
          </button>
        </div>
      </div>

      <!-- Экран результатов -->
      <div v-else class="flex-1 flex flex-col items-center justify-center text-center mt-10">
        <div class="w-24 h-24 rounded-full flex items-center justify-center mb-6" :class="resultColorClass">
          <span class="text-4xl">🌟</span>
        </div>
        <h2 class="text-3xl font-bold mb-2">Ваш результат:</h2>
        <p class="text-2xl font-bold mb-6" :class="resultTextColorClass">{{ score }} из {{ testData.questions.length }}</p>
        
        <div class="bg-white p-5 rounded-2xl shadow-sm border mb-8 w-full">
          <p class="text-gray-700 font-medium">{{ resultMessage }}</p>
        </div>

        <div class="w-full space-y-3 mt-auto">
          <button @click="restartTest" class="btn btn-outline w-full rounded-full text-gray-600">
            ↻ Пройти заново
          </button>
          <NuxtLink to="/" class="btn bg-orange-400 hover:bg-orange-500 text-white w-full rounded-full border-none">
            ✓ Дальше
          </NuxtLink>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { testQuestions } from '~/data/tests.js'

const route = useRoute()
const testId = route.params.id
const testData = testQuestions[testId]

// Глобальное хранилище результатов
const savedResults = useState('testResults', () => ({}))

const currentQuestionIndex = ref(0)
const selectedOptionIndex = ref(null)
const isAnswered = ref(false)
const score = ref(0)
const showResult = ref(false)

const currentQuestion = computed(() => testData.questions[currentQuestionIndex.value])

// Логика выбора ответа
const selectOption = (index) => { selectedOptionIndex.value = index }

const checkAnswer = () => {
  isAnswered.value = true
  if (selectedOptionIndex.value === currentQuestion.value.correctIndex) {
    score.value++
  }
}

const nextQuestion = () => {
  if (currentQuestionIndex.value < testData.questions.length - 1) {
    currentQuestionIndex.value++
    selectedOptionIndex.value = null
    isAnswered.value = false
  } else {
    finishTest()
  }
}

// Завершение теста и сохранение результатов
const finishTest = () => {
  showResult.value = true
  const percentage = Math.round((score.value / testData.questions.length) * 100)
  
  // Сохраняем в глобальный State
  savedResults.value[testId] = {
    score: score.value,
    total: testData.questions.length,
    percentage: percentage
  }
}

const restartTest = () => {
  currentQuestionIndex.value = 0
  selectedOptionIndex.value = null
  isAnswered.value = false
  score.value = 0
  showResult.value = false
}

// Логика отображения результатов и визуальных эффектов
const percentage = computed(() => Math.round((score.value / testData.questions.length) * 100))

const resultMessage = computed(() => {
  if (percentage.value < 50) return 'Вам необходимо изучить данную тему.'
  if (percentage.value <= 75) return 'Вы хорошо разбираетесь в данной теме, но результат стоит улучшить.'
  if (percentage.value <= 85) return 'Вы специалист в данной области, но результат можно улучшить.'
  return 'Вы профи в данной области!'
})

const resultColorClass = computed(() => {
  if (percentage.value < 50) return 'bg-red-100 text-red-600'
  if (percentage.value <= 75) return 'bg-yellow-100 text-yellow-600'
  return 'bg-green-100 text-green-600'
})

const resultTextColorClass = computed(() => {
  if (percentage.value < 50) return 'text-red-500'
  if (percentage.value <= 75) return 'text-yellow-500'
  return 'text-green-500'
})

// Визуал выбора кнопок и отображения правильных/неправильных ответов
const getOptionClass = (index) => {
  if (!isAnswered.value) {
    return selectedOptionIndex.value === index ? 'border-sber-blue bg-blue-50' : 'border-gray-200 bg-white hover:border-blue-300'
  }
  if (index === currentQuestion.value.correctIndex) {
    return 'border-blue-500 bg-blue-50' // Правильный ответ синий
  }
  if (selectedOptionIndex.value === index) {
    return 'border-red-500 bg-red-50' // Ошибочный ответ красный
  }
  return 'border-gray-100 bg-gray-50 opacity-50'
}

const getOptionTextClass = (index) => {
  if (!isAnswered.value) return selectedOptionIndex.value === index ? 'text-sber-blue' : 'text-gray-700'
  if (index === currentQuestion.value.correctIndex) return 'text-blue-700'
  if (selectedOptionIndex.value === index) return 'text-red-600'
  return 'text-gray-400'
}
</script>