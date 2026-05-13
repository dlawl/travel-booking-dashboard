<template>
  <div class="p-6 space-y-5 max-w-3xl">
    <!-- 뒤로가기 + 헤더 -->
    <div class="flex items-center gap-3">
      <NuxtLink to="/bookings"
        class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </NuxtLink>
      <div>
        <h1 class="text-lg font-semibold text-slate-900">예약 상세</h1>
        <p class="text-sm text-slate-400 font-mono">{{ booking?.id }}</p>
      </div>
      <div class="ml-auto flex items-center gap-2">
        <span v-if="booking" :class="['inline-flex items-center gap-1.5 text-xs font-medium', BOOKING_STATUS_COLOR[booking.status]]">
          <span class="w-1.5 h-1.5 rounded-full bg-current" />
          {{ BOOKING_STATUS_LABEL[booking.status] }}
        </span>
      </div>
    </div>

    <div v-if="!booking" class="bg-white rounded-xl border border-slate-200 p-12 text-center text-sm text-slate-400">
      예약 정보를 찾을 수 없습니다.
    </div>

    <template v-else>
      <!-- 예약 기본 정보 -->
      <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div class="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
          <h2 class="text-sm font-semibold text-slate-700">예약 정보</h2>
        </div>
        <div class="grid grid-cols-2 divide-x divide-slate-100">
          <div class="px-5 py-4 space-y-4">
            <InfoRow label="예약번호" :value="booking.id" mono />
            <InfoRow label="예약 유형" :value="BOOKING_TYPE_LABEL[booking.type]" />
            <InfoRow label="상품 · 노선" :value="booking.route" />
            <InfoRow label="여행일" :value="booking.travelDate" />
          </div>
          <div class="px-5 py-4 space-y-4">
            <InfoRow label="예약자명" :value="booking.customerName" />
            <InfoRow label="이메일" :value="booking.customerEmail" />
            <InfoRow label="예약일" :value="booking.createdAt" />
            <InfoRow label="결제금액">
              <span class="font-bold text-slate-900 tabular-nums">{{ booking.amount.toLocaleString() }}원</span>
            </InfoRow>
          </div>
        </div>
      </div>

      <!-- 결제 상태 -->
      <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div class="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60">
          <h2 class="text-sm font-semibold text-slate-700">결제 상태</h2>
        </div>
        <div class="px-5 py-4">
          <ol class="flex items-center gap-0">
            <li v-for="(step, idx) in paymentSteps" :key="step.key" class="flex items-center flex-1">
              <div class="flex flex-col items-center gap-1.5">
                <div :class="['w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-colors',
                  stepState(step.key) === 'done' ? 'bg-brand-500 border-brand-500 text-white' :
                  stepState(step.key) === 'current' ? 'bg-white border-brand-500 text-brand-500' :
                  'bg-white border-slate-200 text-slate-300']">
                  <svg v-if="stepState(step.key) === 'done'" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span v-else>{{ idx + 1 }}</span>
                </div>
                <span :class="['text-xs font-medium',
                  stepState(step.key) === 'done' ? 'text-brand-600' :
                  stepState(step.key) === 'current' ? 'text-slate-800' : 'text-slate-300']">
                  {{ step.label }}
                </span>
              </div>
              <div v-if="idx < paymentSteps.length - 1"
                :class="['flex-1 h-0.5 mb-5 mx-1', stepState(step.key) === 'done' ? 'bg-brand-400' : 'bg-slate-200']" />
            </li>
          </ol>
        </div>
      </div>

      <!-- 바우처 -->
      <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div class="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <h2 class="text-sm font-semibold text-slate-700">바우처</h2>
          <BaseBadge :variant="voucherBadge.variant">{{ voucherBadge.label }}</BaseBadge>
        </div>
        <div class="px-5 py-4">
          <div v-if="booking.status === 'CONFIRMED'" class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-slate-700">바우처 발급 가능</p>
              <p class="text-xs text-slate-400 mt-0.5">결제 완료 후 바우처를 발급할 수 있습니다.</p>
            </div>
            <BaseButton variant="primary" size="sm">바우처 발급</BaseButton>
          </div>
          <div v-else-if="booking.status === 'CANCELLED' || booking.status === 'REFUNDED'"
            class="text-sm text-slate-400">
            취소 또는 환불된 예약은 바우처를 발급할 수 없습니다.
          </div>
          <div v-else class="text-sm text-slate-400">
            결제 완료 후 바우처 발급이 가능합니다.
          </div>
        </div>
      </div>

      <!-- 액션 버튼 -->
      <div class="flex justify-end gap-2">
        <BaseButton variant="secondary" size="sm" @click="$router.push('/bookings')">목록으로</BaseButton>
        <BaseButton
          v-if="booking.status !== 'CANCELLED' && booking.status !== 'REFUNDED'"
          variant="danger" size="sm">
          예약 취소
        </BaseButton>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useBookingStore } from '~/stores/booking'
import type { BadgeVariant } from '~/components/base/BaseBadge.vue'
import { BOOKING_STATUS_LABEL, BOOKING_STATUS_COLOR, BOOKING_TYPE_LABEL } from '~/types/booking'
import type { BookingStatus } from '~/types/booking'

const route = useRoute()
const store = useBookingStore()

const booking = computed(() =>
  store.findById(route.params.id as string)
)

const paymentSteps: { key: BookingStatus; label: string }[] = [
  { key: 'PENDING', label: '결제 대기' },
  { key: 'CHECKING', label: '확인 중' },
  { key: 'CONFIRMED', label: '결제 완료' },
]

const stepOrder: BookingStatus[] = ['PENDING', 'CHECKING', 'CONFIRMED']

function stepState(key: BookingStatus): 'done' | 'current' | 'upcoming' {
  if (!booking.value) return 'upcoming'
  const current = booking.value.status
  if (current === 'CANCELLED' || current === 'REFUNDED') return 'upcoming'
  const currentIdx = stepOrder.indexOf(current)
  const stepIdx = stepOrder.indexOf(key)
  if (stepIdx < currentIdx) return 'done'
  if (stepIdx === currentIdx) return 'current'
  return 'upcoming'
}

const voucherBadge = computed((): { variant: BadgeVariant; label: string } => {
  switch (booking.value?.status) {
    case 'CONFIRMED': return { variant: 'success', label: '발급 가능' }
    case 'CANCELLED':
    case 'REFUNDED': return { variant: 'neutral', label: '발급 불가' }
    default: return { variant: 'warning', label: '대기 중' }
  }
})
</script>
