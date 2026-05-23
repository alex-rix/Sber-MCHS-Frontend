<template>
  <section class="flex flex-col h-[65vh]">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-2xl font-bold mb-1">ГигаЧат</h2>
        <p class="text-sm text-gray-500 leading-tight">Персональный ИИ-помощник</p>
      </div>
      <button @click="newContext" class="btn btn-sm btn-circle bg-gray-200 border-none text-gray-500 hover:bg-gray-300" title="Очистить диалог">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
      </button>
    </div>
    
    <div id="chatContainer" class="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 overflow-y-auto flex flex-col gap-2">
      <div v-if="!chatMessages || chatMessages.length === 0" class="flex flex-col items-center justify-center h-full text-center opacity-60">
        <img src="/images/icon-gigachat.png" class="w-16 h-16 grayscale mb-4" alt="Гигачат">
        <p class="text-sm font-medium">Спросите меня о правилах<br>безопасности или первой помощи</p>
      </div>

      <div v-for="m in chatMessages" :key="m.position" class="chat" :class="m.role === 'ai' ? 'chat-start' : 'chat-end'">
        <div class="chat-image avatar">
          <div class="w-8 rounded-full border border-gray-100 shadow-sm bg-white flex items-center justify-center">
            <img v-if="m.role === 'ai'" src="/images/icon-gigachat.png" alt="ГигаЧат" />
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 text-gray-400">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </div>
        </div>
        <div class="chat-bubble text-sm" :class="m.role === 'ai' ? 'bg-gray-100 text-gray-800' : 'bg-sber-blue text-white'">
          <MDC v-if="m.message" :value="m.message" class="markdown" />
          <span v-else class="loading loading-dots loading-sm"></span>
        </div>
      </div>
    </div>

    <div class="mt-4 flex gap-2">
      <input type="text" placeholder="Опишите вашу ситуацию..." v-model="newMessage" @keyup.enter="sendNewMessage" class="input input-bordered w-full rounded-full bg-white shadow-sm focus:border-sber-blue focus:outline-none pl-5" />
      <button @click="sendNewMessage" :disabled="!newMessage.trim()" class="btn bg-sber-blue hover:bg-blue-700 text-white border-none rounded-full btn-circle shadow-sm disabled:bg-gray-300">
        ↑
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { useApi } from '~/composables/useApi'

const newMessage = ref('')
const chatErrored = ref(false)
const chatContextId = useCookie('ai_context_id', { maxAge: 31 * 24 * 60 * 60, sameSite: true })
const chatMessages = useCookie('ai_context_messages', { maxAge: 31 * 24 * 60 * 60, sameSite: true, watch: true })

if (!chatMessages.value) chatMessages.value = []

function randomUrlSafeString(length = 32) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
  let result = ''
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  for (let i = 0; i < length; i++) result += chars.charAt(array[i] % chars.length)
  return result
}

const newContext = () => {
  chatMessages.value = []
  chatContextId.value = randomUrlSafeString()
}
if (!chatContextId.value) newContext()

const askGigachat = async (context, message) => {
  const { data, error } = await useApi("/ai/ask", {
    method: "POST",
    body: { context: context, message: message }
  }, true)
  return { response: data, error: error.value?.data?.message }
}

const pushMessage = (role, message) => {
  if (!chatMessages.value) chatMessages.value = []
  const array = chatMessages.value
  return array.push({ role: role, message: message, position: array.length }) - 1
}

const sendNewMessage = () => {
  if (!newMessage.value.trim()) return
  const msg = newMessage.value
  newMessage.value = ''
  
  if (!chatContextId.value) newContext()
  pushMessage("user", msg)
  
  let messageId = -1
  const timeout = setTimeout(() => { messageId = pushMessage("ai", null) }, 500)

  askGigachat(chatContextId.value, msg).then((r) => {
    if (!r.response?.value) {
      chatErrored.value = true
      return
    }
    clearTimeout(timeout)
    if (messageId === -1) {
      pushMessage("ai", r.response.value.message)
    } else {
      chatMessages.value[messageId].message = r.response.value.message
    }
  })
}

const scrollToBottom = () => {
  nextTick(() => {
    const el = document.getElementById('chatContainer')
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  })
}
watch(chatMessages, scrollToBottom, { deep: true })
</script>