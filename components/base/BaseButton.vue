<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="classes"
    v-bind="$attrs"
  >
    <span v-if="loading" class="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
    <slot />
  </button>
</template>

<script setup lang="ts">
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface Props {
  variant?: ButtonVariant
  size?: ButtonSize
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  full?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  full: false,
})

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700',
  secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200 active:bg-slate-300',
  danger: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
  ghost: 'bg-transparent text-slate-600 hover:bg-brand-50 hover:text-brand-600 active:bg-brand-100',
  outline: 'bg-transparent border border-brand-300 text-brand-600 hover:bg-brand-50',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

const classes = computed(() => [
  'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed',
  variantClasses[props.variant],
  sizeClasses[props.size],
  props.full ? 'w-full' : '',
])
</script>
