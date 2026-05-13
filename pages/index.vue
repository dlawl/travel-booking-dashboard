<template>
  <div class="p-6 space-y-5">
    <!-- 페이지 타이틀 -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-lg font-semibold text-slate-900">대시보드</h1>
        <p class="text-sm text-slate-400 mt-0.5">2026년 5월 13일</p>
      </div>
      <BaseButton variant="outline" size="sm">리포트 내보내기</BaseButton>
    </div>

    <!-- KPI 카드 -->
    <div class="grid grid-cols-4 gap-4">
      <div v-for="stat in stats" :key="stat.label"
        class="bg-white rounded-xl border border-slate-200 px-5 py-4">
        <p class="text-xs text-slate-500 mb-3">{{ stat.label }}</p>
        <p class="text-2xl font-bold text-slate-900 tracking-tight">{{ stat.value }}</p>
        <p :class="['text-xs mt-2 font-medium', stat.up ? 'text-emerald-600' : 'text-red-500']">
          {{ stat.change }} 전월 대비
        </p>
      </div>
    </div>

    <!-- 예약 현황 + 최근 예약 -->
    <div class="grid grid-cols-3 gap-4">
      <!-- 상태별 현황 -->
      <div class="bg-white rounded-xl border border-slate-200 p-5">
        <h3 class="text-sm font-semibold text-slate-700 mb-4">상태별 현황</h3>
        <div class="space-y-4">
          <div v-for="item in statusSummary" :key="item.label">
            <div class="flex justify-between text-xs mb-1.5">
              <span class="text-slate-500">{{ item.label }}</span>
              <span class="font-medium text-slate-700">{{ item.count.toLocaleString() }}건</span>
            </div>
            <div class="h-1 bg-slate-100 rounded-full">
              <div class="h-1 bg-brand-500 rounded-full" :style="{ width: `${item.pct}%` }" />
            </div>
          </div>
        </div>
        <div class="mt-5 pt-4 border-t border-slate-100 flex justify-between">
          <span class="text-xs text-slate-400">전체</span>
          <span class="text-xs font-semibold text-slate-800">1,284건</span>
        </div>
      </div>

      <!-- 최근 예약 테이블 -->
      <div class="col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div class="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h3 class="text-sm font-semibold text-slate-700">최근 예약</h3>
          <NuxtLink to="/bookings" class="text-xs text-brand-500 hover:text-brand-600 font-medium">
            전체보기 →
          </NuxtLink>
        </div>
        <table class="w-full">
          <thead>
            <tr class="border-b border-slate-100 bg-slate-50/60">
              <th class="text-left px-5 py-2.5 text-xs font-medium text-slate-400">예약번호</th>
              <th class="text-left px-4 py-2.5 text-xs font-medium text-slate-400">고객명</th>
              <th class="text-left px-4 py-2.5 text-xs font-medium text-slate-400">상품</th>
              <th class="text-left px-4 py-2.5 text-xs font-medium text-slate-400">상태</th>
              <th class="text-right px-5 py-2.5 text-xs font-medium text-slate-400">결제금액</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-for="row in recentBookings" :key="row.id"
              class="hover:bg-slate-50 cursor-pointer transition-colors"
              @click="selectedBooking = row; showModal = true">
              <td class="px-5 py-3.5 text-xs font-mono text-brand-500 font-medium">{{ row.id }}</td>
              <td class="px-4 py-3.5">
                <div class="flex items-center gap-2.5">
                  <div class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-semibold text-slate-500 shrink-0">
                    {{ row.name[0] }}
                  </div>
                  <span class="text-sm text-slate-700">{{ row.name }}</span>
                </div>
              </td>
              <td class="px-4 py-3.5 text-sm text-slate-600">{{ row.route }}</td>
              <td class="px-4 py-3.5">
                <span :class="['inline-flex items-center gap-1.5 text-xs font-medium', statusClass(row.status)]">
                  <span class="w-1.5 h-1.5 rounded-full bg-current" />
                  {{ row.status }}
                </span>
              </td>
              <td class="px-5 py-3.5 text-sm font-semibold text-slate-800 text-right tabular-nums">
                {{ row.amount.toLocaleString() }}원
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 예약 상세 모달 -->
    <BaseModal v-model="showModal" title="예약 상세">
      <div v-if="selectedBooking" class="space-y-3 text-sm">
        <div class="grid grid-cols-2 gap-2">
          <div class="bg-slate-50 rounded-lg p-3">
            <p class="text-xs text-slate-400 mb-1">예약번호</p>
            <p class="font-mono font-semibold text-brand-600">{{ selectedBooking.id }}</p>
          </div>
          <div class="bg-slate-50 rounded-lg p-3">
            <p class="text-xs text-slate-400 mb-1">상태</p>
            <span :class="['inline-flex items-center gap-1.5 text-xs font-medium', statusClass(selectedBooking.status)]">
              <span class="w-1.5 h-1.5 rounded-full bg-current" />
              {{ selectedBooking.status }}
            </span>
          </div>
          <div class="bg-slate-50 rounded-lg p-3">
            <p class="text-xs text-slate-400 mb-1">예약자</p>
            <p class="font-semibold text-slate-800">{{ selectedBooking.name }}</p>
          </div>
          <div class="bg-slate-50 rounded-lg p-3">
            <p class="text-xs text-slate-400 mb-1">결제금액</p>
            <p class="font-bold text-slate-900 tabular-nums">{{ selectedBooking.amount.toLocaleString() }}원</p>
          </div>
        </div>
        <div class="border border-slate-200 rounded-lg p-3">
          <p class="text-xs text-slate-400 mb-1">상품</p>
          <p class="font-medium text-slate-800">{{ selectedBooking.route }}</p>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <BaseButton variant="secondary" size="sm" @click="showModal = false">닫기</BaseButton>
          <BaseButton variant="primary" size="sm">바우처 발급</BaseButton>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
const showModal = ref(false)
const selectedBooking = ref<(typeof recentBookings)[0] | null>(null)

const stats = [
  { label: '이번달 총 예약', value: '1,284', change: '+12%', up: true },
  { label: '결제 완료', value: '1,047', change: '+8%', up: true },
  { label: '취소 · 환불', value: '93', change: '-3%', up: false },
  { label: '정산 대기', value: '144', change: '+5%', up: true },
]

const statusSummary = [
  { label: '결제완료', count: 1047, pct: 82 },
  { label: '확인중', count: 144, pct: 11 },
  { label: '대기중', count: 57, pct: 4 },
  { label: '취소됨', count: 36, pct: 3 },
]

const recentBookings = [
  { id: 'TK-008421', name: '김민수', status: '결제완료', amount: 320000, route: '서울 → 도쿄 항공' },
  { id: 'TK-008420', name: '이지은', status: '확인중', amount: 185000, route: '그랜드 하얏트 서울 2박' },
  { id: 'TK-008419', name: '박준호', status: '결제완료', amount: 95000, route: '제주 올레길 투어 1일' },
  { id: 'TK-008418', name: '최수아', status: '취소됨', amount: 450000, route: '서울 → 오사카 항공' },
  { id: 'TK-008417', name: '정하늘', status: '대기중', amount: 220000, route: '롯데호텔 부산 1박' },
]

function statusClass(status: string): string {
  const map: Record<string, string> = {
    '결제완료': 'text-emerald-600',
    '확인중': 'text-brand-500',
    '대기중': 'text-amber-500',
    '취소됨': 'text-slate-400',
  }
  return map[status] ?? 'text-slate-400'
}
</script>
