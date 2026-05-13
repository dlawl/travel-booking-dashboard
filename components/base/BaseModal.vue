<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeOnBackdrop && close()" />
        <div :class="['relative bg-white rounded-xl shadow-xl w-full flex flex-col max-h-[90vh]', sizeClass]">
          <div v-if="title || $slots.header" class="flex items-center justify-between px-6 py-4 border-b border-slate-200">
            <slot name="header">
              <h3 class="text-lg font-semibold text-slate-900">{{ title }}</h3>
            </slot>
            <button
              class="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              @click="close"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="flex-1 overflow-y-auto px-6 py-4">
            <slot />
          </div>
          <div v-if="$slots.footer" class="px-6 py-4 border-t border-slate-200">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
type ModalSize = 'sm' | 'md' | 'lg' | 'xl'

interface Props {
  modelValue: boolean
  title?: string
  size?: ModalSize
  closeOnBackdrop?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  closeOnBackdrop: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const sizeClass: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
}

function close() {
  emit('update:modelValue', false)
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .relative {
  transform: scale(0.95) translateY(-10px);
}
</style>
