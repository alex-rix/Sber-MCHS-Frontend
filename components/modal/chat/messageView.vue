<template>
  <div class="chat" :class="{'chat-start': isAiAnswer, 'chat-end': !isAiAnswer}">
    <div class="chat-image avatar">
      <div class="w-8 md:w-10">
        <img src="/images/icon-gigachat.png" v-if="isAiAnswer">
        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 md:size-8 text-gray-500">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      </div>
    </div>
    <div class="chat-bubble" :class="isAiAnswer ? 'bg-gray-100 text-gray-800' : 'bg-sber-blue text-white'">
      <MDC v-if="message.message" :value="message.message" class="markdown" />
      <div v-else>
        <span class="loading loading-dots loading-sm"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({ message: { type: Object, required: true } })
const isAiAnswer = computed(() => props.message.role === 'ai')
const message = computed(() => props.message)
</script>