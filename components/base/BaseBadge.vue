<template>
  <span :class="classes">
    <span v-if="dot" class="w-1.5 h-1.5 rounded-full mr-1.5" :class="dotColor" />
    <slot />
  </span>
</template>

<script setup lang="ts">
export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'purple'

interface Props {
  variant?: BadgeVariant
  dot?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'neutral',
  dot: false,
})

const variantClasses: Record<BadgeVariant, string> = {
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  warning: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  danger: 'bg-red-50 text-red-700 ring-red-600/20',
  info: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  neutral: 'bg-slate-100 text-slate-600 ring-slate-500/20',
  purple: 'bg-purple-50 text-purple-700 ring-purple-600/20',
}

const dotColorMap: Record<BadgeVariant, string> = {
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
  info: 'bg-blue-500',
  neutral: 'bg-slate-400',
  purple: 'bg-purple-500',
}

const classes = computed(() => [
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset',
  variantClasses[props.variant],
])

const dotColor = computed(() => dotColorMap[props.variant])
</script>
