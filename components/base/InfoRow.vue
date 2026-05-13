<template>
  <div>
    <p class="text-xs text-slate-400 mb-0.5">{{ label }}</p>
    <slot>
      <p :class="['text-sm text-slate-800', mono ? 'font-mono font-medium' : 'font-medium']">{{ value }}</p>
    </slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value?: string | number
  mono?: boolean
}>()
</script>
