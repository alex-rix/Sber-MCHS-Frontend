<template>
  <ModalBase :title="'Помощник ГигаЧат'" :name="'ai-chat-modal'" :opened="opened" :content-class="'p-2 pt-2 flex flex-col justify-between flex-1'"
              :modal-class="'modal-top sm:modal-middle z-[100]'"
              :modal-box-class="'w-full max-w-5xl h-[85vh] flex flex-col bg-white shadow-2xl'">
    
    <div class="absolute right-3 top-3 flex gap-2">
      <button class="btn btn-sm btn-circle bg-gray-100 border-none" @click="newContext" title="Очистить диалог">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
      </button>
      <button class="btn btn-sm btn-circle bg-gray-100 border-none" @click="close">✕</button>
    </div>

    <div class="flex flex-col w-full overflow-y-scroll flex-1 p-2" id="messagesContainer">
      <transition-group v-if="contextMessages && contextMessages.length > 0" name="messages">
        <ModalChatMessageView v-for="m in contextMessages" :message="m" :key="m.position"/>
      </transition-group>
      
      <!-- Пустой экран чата (без EmptyPanel) -->
      <div v-else class="flex flex-col items-center justify-center h-full w-full text-center opacity-50">
        <img src="/images/icon-gigachat.png" class="w-20 mb-4 grayscale" alt="Гигачат">
        <p class="text-sm font-medium">Я готов ответить на ваши вопросы.<br>Напишите что-нибудь внизу!</p>
      </div>
    </div>

    <div class="flex gap-2 mt-4 p-2 bg-white border-t border-gray-100">
      <input class="input w-full input-md bg-gray-100 rounded-full focus:outline-none focus:border-sber-blue" v-on:keyup.enter="sendNewMessage" v-model="newMessage" placeholder="Спросить Гигачат...">
      <button class="btn bg-sber-blue hover:bg-blue-700 text-white btn-circle border-none" @click="sendNewMessage">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>
      </button>
    </div>
  </ModalBase>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useApi } from "~/composables/useApi";

const emit = defineEmits(['close'])
const props = defineProps({
  opened: { type: Boolean, required: true },
  taskId: { type: Number, required: false }
})

const errored = ref(false);
const newMessage = ref('');

const contextId = useCookie<string | null>('ai_context_id', { maxAge: 31 * 24 * 60 * 60, sameSite: true })
const contextMessages = useCookie<any[] | null>('ai_context_messages', { maxAge: 31 * 24 * 60 * 60, sameSite: true, watch: true })

const pushMessage = (role: string, message: string | null) => {
  if (!contextMessages.value) contextMessages.value = [];
    const array = contextMessages.value!;
  
  return array.push({ role: role, message: message, position: array.length }) - 1;
}

const sendNewMessage = () => {
  if (!newMessage.value) return;
  ask(newMessage.value)
  newMessage.value = '';
}

function randomUrlSafeString(length = 32) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  let result = '';
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  for (let i = 0; i < length; i++) {
    result += chars.charAt(array[i] % chars.length);
  }
  return result;
}

const newContext = () => {
  contextMessages.value = [];
  contextId.value = randomUrlSafeString();
}

const askGigachat = async (context: string, message: string) => {
  const { data, error } = await useApi<any>("/ai/ask", {
    method: "POST",
    body: { context: context, message: message }
  }, true);
  return { response: data, error: error.value?.data?.message } as const;
}

const ask = (message: string) => {
  if (!contextId.value) return;
  pushMessage("user", message);
  let messageId = -1;
  const timeout = setTimeout(() => { messageId = pushMessage("ai", null); }, 500);

  askGigachat(contextId.value, message).then((r) => {
    if (!r.response.value) { errored.value = true; return; }
    clearTimeout(timeout);
    if (messageId === -1) {
      pushMessage("ai", r.response.value.message);
    } else {
      contextMessages.value![messageId].message = r.response.value.message;
    }
  })
}

const close = () => { emit('close'); }

const scrollToBottom = () => {
  setTimeout(() => {
    const containerElement = document.getElementById('messagesContainer');
    if (!containerElement) return;
    containerElement.scroll({ top: containerElement.scrollHeight + 1000, behavior: 'smooth' });
  }, 50)
}

watch(contextMessages, async () => { scrollToBottom(); }, {deep: true})

watch(() => props.opened, () => {
  if (!props.opened) return;
  errored.value = false;
  if (!contextId.value) newContext();
  scrollToBottom();
});

watch(() => props.taskId, () => {
  newContext();
  contextMessages.value = [];
})
</script>

<style scoped>
.messages-move, .messages-enter-active, .messages-leave-active { transition: all 0.3s ease; }
.messages-enter-from, .messages-leave-to { opacity: 0; transform: translateY(10px); }
.messages-leave-active { position: absolute; }
</style>