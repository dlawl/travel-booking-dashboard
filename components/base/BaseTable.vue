<template>
  <div class="overflow-hidden rounded-xl border border-slate-200 bg-white">
    <div v-if="$slots.toolbar" class="px-4 py-3 border-b border-slate-200">
      <slot name="toolbar" />
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-slate-200">
        <thead class="bg-slate-50">
          <tr>
            <th
              v-for="col in columns"
              :key="col.key"
              :class="['px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider', col.class]"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-if="loading">
            <td :colspan="columns.length" class="px-4 py-10 text-center">
              <div class="flex items-center justify-center gap-2 text-slate-400">
                <span class="w-5 h-5 border-2 border-slate-300 border-t-blue-500 rounded-full animate-spin" />
                <span class="text-sm">불러오는 중...</span>
              </div>
            </td>
          </tr>
          <tr v-else-if="!rows.length">
            <td :colspan="columns.length" class="px-4 py-10 text-center text-sm text-slate-400">
              <slot name="empty">데이터가 없습니다.</slot>
            </td>
          </tr>
          <tr
            v-for="(row, idx) in rows"
            v-else
            :key="idx"
            :class="['transition-colors', clickable ? 'hover:bg-slate-50 cursor-pointer' : '']"
            @click="clickable && emit('row-click', row)"
          >
            <td
              v-for="col in columns"
              :key="col.key"
              :class="['px-4 py-3 text-sm text-slate-700 whitespace-nowrap', col.cellClass]"
            >
              <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
                {{ row[col.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="$slots.footer" class="px-4 py-3 border-t border-slate-200 bg-slate-50">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
export interface TableColumn {
  key: string
  label: string
  class?: string
  cellClass?: string
}

interface Props {
  columns: TableColumn[]
  rows: Record<string, unknown>[]
  loading?: boolean
  clickable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  clickable: false,
})

const emit = defineEmits<{
  'row-click': [row: Record<string, unknown>]
}>()
</script>
