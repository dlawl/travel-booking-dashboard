<template>
  <div :class="['flex flex-col gap-1', full ? 'w-full' : '']">
    <label v-if="label" :for="inputId" class="text-sm font-medium text-slate-700">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-0.5">*</span>
    </label>
    <div class="relative">
      <span v-if="$slots.prefix" class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
        <slot name="prefix" />
      </span>
      <input
        :id="inputId"
        v-model="model"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :class="inputClasses"
        v-bind="$attrs"
      />
      <span v-if="$slots.suffix" class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 pointer-events-none">
        <slot name="suffix" />
      </span>
    </div>
    <p v-if="error" class="text-xs text-red-600">{{ error }}</p>
    <p v-else-if="hint" class="text-xs text-slate-500">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string | number
  label?: string
  type?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  error?: string
  hint?: string
  full?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  readonly: false,
  required: false,
  full: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const model = computed({
  get: () => props.modelValue ?? '',
  set: (val) => emit('update:modelValue', val),
})

const inputId = useId()
const slots = useSlots()

const inputClasses = computed(() => [
  'block w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 transition-colors duration-150',
  'focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent',
  'disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed',
  slots.prefix ? 'pl-9' : '',
  slots.suffix ? 'pr-9' : '',
  props.error
    ? 'border-red-300 focus:ring-red-500'
    : 'border-slate-300',
])
</script>
