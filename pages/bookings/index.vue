<template>
  <div class="p-6 space-y-5">
    <!-- 헤더 -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-lg font-semibold text-slate-900">전체 예약</h1>
        <p class="text-sm text-slate-400 mt-0.5">총 {{ store.totalCount }}건</p>
      </div>
      <BaseButton variant="primary" size="sm">예약 등록</BaseButton>
    </div>

    <!-- 타입 탭 -->
    <div class="flex gap-1 bg-slate-100 rounded-lg p-1 w-fit">
      <button
        v-for="tab in typeTabs"
        :key="tab.value"
        :class="['px-4 py-1.5 text-sm font-medium rounded-md transition-colors', store.filter.type === tab.value ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700']"
        @click="store.setTypeFilter(tab.value)"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- 필터 바 -->
    <div class="flex items-center gap-3">
      <BaseInput
        :model-value="store.filter.search"
        placeholder="예약번호, 고객명 검색"
        class="w-64"
        @update:model-value="store.setSearch(String($event))"
      />
      <select
        :value="store.filter.status"
        class="h-9 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-400"
        @change="store.setStatusFilter(($event.target as HTMLSelectElement).value as BookingStatus | 'ALL')"
      >
        <option value="ALL">전체 상태</option>
        <option v-for="s in statusOptions" :key="s.value" :value="s.value">{{ s.label }}</option>
      </select>
    </div>

    <!-- 테이블 -->
    <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b border-slate-100 bg-slate-50/60">
            <th class="text-left px-5 py-3 text-xs font-medium text-slate-400">예약번호</th>
            <th class="text-left px-4 py-3 text-xs font-medium text-slate-400">고객명</th>
            <th class="text-left px-4 py-3 text-xs font-medium text-slate-400">유형</th>
            <th class="text-left px-4 py-3 text-xs font-medium text-slate-400">상품</th>
            <th class="text-left px-4 py-3 text-xs font-medium text-slate-400">여행일</th>
            <th class="text-left px-4 py-3 text-xs font-medium text-slate-400">상태</th>
            <th class="text-right px-5 py-3 text-xs font-medium text-slate-400">결제금액</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">
          <tr v-if="!store.pagedBookings.length">
            <td colspan="7" class="px-5 py-12 text-center text-sm text-slate-400">
              조건에 맞는 예약이 없습니다.
            </td>
          </tr>
          <tr
            v-for="row in store.pagedBookings"
            :key="row.id"
            class="hover:bg-slate-50 cursor-pointer transition-colors"
            @click="selected = row; showModal = true"
          >
            <td class="px-5 py-3.5 text-xs font-mono text-brand-500 font-medium">{{ row.id }}</td>
            <td class="px-4 py-3.5">
              <div class="flex items-center gap-2">
                <div class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-semibold text-slate-500 shrink-0">
                  {{ row.customerName[0] }}
                </div>
                <span class="text-sm text-slate-700">{{ row.customerName }}</span>
              </div>
            </td>
            <td class="px-4 py-3.5 text-sm text-slate-500">
              {{ BOOKING_TYPE_LABEL[row.type] }}
            </td>
            <td class="px-4 py-3.5 text-sm text-slate-700 max-w-[200px] truncate">{{ row.route }}</td>
            <td class="px-4 py-3.5 text-sm text-slate-500 tabular-nums">{{ row.travelDate }}</td>
            <td class="px-4 py-3.5">
              <span :class="['inline-flex items-center gap-1.5 text-xs font-medium', BOOKING_STATUS_COLOR[row.status]]">
                <span class="w-1.5 h-1.5 rounded-full bg-current" />
                {{ BOOKING_STATUS_LABEL[row.status] }}
              </span>
            </td>
            <td class="px-5 py-3.5 text-sm font-semibold text-slate-800 text-right tabular-nums">
              {{ row.amount.toLocaleString() }}원
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 페이지네이션 -->
      <div class="flex items-center justify-between px-5 py-3.5 border-t border-slate-100 bg-slate-50/60">
        <p class="text-xs text-slate-400">
          {{ (store.filter.page - 1) * store.filter.pageSize + 1 }}–{{ Math.min(store.filter.page * store.filter.pageSize, store.totalCount) }} / {{ store.totalCount }}건
        </p>
        <div class="flex items-center gap-1">
          <button
            :disabled="store.filter.page <= 1"
            class="px-2.5 py-1.5 text-xs rounded-md border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            @click="store.setPage(store.filter.page - 1)"
          >
            이전
          </button>
          <button
            v-for="p in store.totalPages"
            :key="p"
            :class="['px-2.5 py-1.5 text-xs rounded-md border transition-colors', p === store.filter.page ? 'bg-brand-500 border-brand-500 text-white' : 'border-slate-200 text-slate-500 hover:bg-slate-100']"
            @click="store.setPage(p)"
          >
            {{ p }}
          </button>
          <button
            :disabled="store.filter.page >= store.totalPages"
            class="px-2.5 py-1.5 text-xs rounded-md border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            @click="store.setPage(store.filter.page + 1)"
          >
            다음
          </button>
        </div>
      </div>
    </div>

    <!-- 상세 모달 -->
    <BaseModal v-model="showModal" title="예약 상세">
      <div v-if="selected" class="space-y-3 text-sm">
        <div class="grid grid-cols-2 gap-2">
          <div class="bg-slate-50 rounded-lg p-3">
            <p class="text-xs text-slate-400 mb-1">예약번호</p>
            <p class="font-mono font-semibold text-brand-600">{{ selected.id }}</p>
          </div>
          <div class="bg-slate-50 rounded-lg p-3">
            <p class="text-xs text-slate-400 mb-1">상태</p>
            <span :class="['inline-flex items-center gap-1.5 text-xs font-medium', BOOKING_STATUS_COLOR[selected.status]]">
              <span class="w-1.5 h-1.5 rounded-full bg-current" />
              {{ BOOKING_STATUS_LABEL[selected.status] }}
            </span>
          </div>
          <div class="bg-slate-50 rounded-lg p-3">
            <p class="text-xs text-slate-400 mb-1">예약자</p>
            <p class="font-semibold text-slate-800">{{ selected.customerName }}</p>
            <p class="text-xs text-slate-400 mt-0.5">{{ selected.customerEmail }}</p>
          </div>
          <div class="bg-slate-50 rounded-lg p-3">
            <p class="text-xs text-slate-400 mb-1">결제금액</p>
            <p class="font-bold text-slate-900 tabular-nums">{{ selected.amount.toLocaleString() }}원</p>
          </div>
        </div>
        <div class="border border-slate-200 rounded-lg p-3">
          <p class="text-xs text-slate-400 mb-1">상품 · 노선</p>
          <p class="font-medium text-slate-800">{{ selected.route }}</p>
          <p class="text-xs text-slate-400 mt-1">여행일: {{ selected.travelDate }}</p>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <BaseButton variant="ghost" size="sm" @click="showModal = false">닫기</BaseButton>
          <BaseButton variant="outline" size="sm" @click="$router.push(`/bookings/${selected?.id}`)">상세 보기</BaseButton>
          <BaseButton variant="primary" size="sm">바우처 발급</BaseButton>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { useBookingStore } from '~/stores/booking'
import type { Booking, BookingStatus } from '~/types/booking'
import { BOOKING_STATUS_LABEL, BOOKING_STATUS_COLOR, BOOKING_TYPE_LABEL } from '~/types/booking'

const store = useBookingStore()
const showModal = ref(false)
const selected = ref<Booking | null>(null)

const typeTabs = [
  { label: '전체', value: 'ALL' as const },
  { label: '항공', value: 'FLIGHT' as const },
  { label: '숙박', value: 'HOTEL' as const },
  { label: '투어', value: 'TOUR' as const },
]

const statusOptions = [
  { label: '결제 완료', value: 'CONFIRMED' },
  { label: '확인 중', value: 'CHECKING' },
  { label: '결제 대기', value: 'PENDING' },
  { label: '취소됨', value: 'CANCELLED' },
  { label: '환불 완료', value: 'REFUNDED' },
]
</script>
