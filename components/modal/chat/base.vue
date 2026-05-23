<template>
  <ClientOnly>
    <Teleport to="body">
      <input type="checkbox" :id="name" class="modal-toggle" :checked="opened" />
      <div class="modal z-10" :class="modalClass">
        <div v-if="title.length > 0" class="modal-box p-0" :class="modalBoxClass">
          <div class="px-6 pt-4 pb-2 border-b border-b-base-200 font-bold text-lg">
            {{ title }}
          </div>
          <div :class="contentClass">
            <slot></slot>
          </div>
        </div>
        <div v-else class="modal-box" :class="modalBoxClass">
          <slot></slot>
        </div>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<script setup>
defineProps({
  name: { type: String, required: true },
  title: { type: String, default: "" },
  opened: { type: Boolean, required: true },
  modalBoxClass: { type: String, default: "h-full max-h-full bg-base-100/80 backdrop-blur" },
  modalClass: { type: String, default: "modal-top sm:modal-middle" },
  contentClass: { type: String, default: "p-6 pt-4" }
})
</script>