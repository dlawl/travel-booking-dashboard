import { defineStore } from 'pinia'
import type { Booking, BookingFilter, BookingType, BookingStatus } from '~/types/booking'

// Mock 데이터 — 실제 API 연동 전 사용
const MOCK_BOOKINGS: Booking[] = [
  { id: 'TK-008421', customerName: '김민수', customerEmail: 'kim@example.com', type: 'FLIGHT', status: 'CONFIRMED', amount: 320000, route: '서울(ICN) → 도쿄(NRT)', createdAt: '2026-05-13', travelDate: '2026-06-01' },
  { id: 'TK-008420', customerName: '이지은', customerEmail: 'lee@example.com', type: 'HOTEL', status: 'CHECKING', amount: 185000, route: '그랜드 하얏트 서울 2박', createdAt: '2026-05-13', travelDate: '2026-05-20' },
  { id: 'TK-008419', customerName: '박준호', customerEmail: 'park@example.com', type: 'TOUR', status: 'CONFIRMED', amount: 95000, route: '제주 올레길 투어 1일', createdAt: '2026-05-12', travelDate: '2026-05-25' },
  { id: 'TK-008418', customerName: '최수아', customerEmail: 'choi@example.com', type: 'FLIGHT', status: 'CANCELLED', amount: 450000, route: '서울(GMP) → 오사카(KIX)', createdAt: '2026-05-12', travelDate: '2026-05-18' },
  { id: 'TK-008417', customerName: '정하늘', customerEmail: 'jung@example.com', type: 'HOTEL', status: 'PENDING', amount: 220000, route: '롯데호텔 부산 1박', createdAt: '2026-05-11', travelDate: '2026-05-22' },
  { id: 'TK-008416', customerName: '한소희', customerEmail: 'han@example.com', type: 'FLIGHT', status: 'CONFIRMED', amount: 610000, route: '서울(ICN) → 방콕(BKK)', createdAt: '2026-05-11', travelDate: '2026-06-10' },
  { id: 'TK-008415', customerName: '오민준', customerEmail: 'oh@example.com', type: 'TOUR', status: 'CONFIRMED', amount: 130000, route: '부산 야경 투어 반일', createdAt: '2026-05-10', travelDate: '2026-05-16' },
  { id: 'TK-008414', customerName: '윤서연', customerEmail: 'yoon@example.com', type: 'HOTEL', status: 'REFUNDED', amount: 340000, route: '신라호텔 제주 2박', createdAt: '2026-05-10', travelDate: '2026-05-15' },
  { id: 'TK-008413', customerName: '임도현', customerEmail: 'lim@example.com', type: 'FLIGHT', status: 'CONFIRMED', amount: 280000, route: '서울(ICN) → 싱가포르(SIN)', createdAt: '2026-05-09', travelDate: '2026-06-05' },
  { id: 'TK-008412', customerName: '강지우', customerEmail: 'kang@example.com', type: 'TOUR', status: 'CHECKING', amount: 75000, route: '경주 역사 투어 1일', createdAt: '2026-05-09', travelDate: '2026-05-17' },
]

export const useBookingStore = defineStore('booking', () => {
  const filter = ref<BookingFilter>({
    type: 'ALL',
    status: 'ALL',
    search: '',
    page: 1,
    pageSize: 8,
  })

  const isLoading = ref(false)

  // 필터 적용된 예약 목록
  const filteredBookings = computed(() => {
    return MOCK_BOOKINGS.filter((b) => {
      if (filter.value.type !== 'ALL' && b.type !== filter.value.type) return false
      if (filter.value.status !== 'ALL' && b.status !== filter.value.status) return false
      if (filter.value.search) {
        const q = filter.value.search.toLowerCase()
        if (!b.id.toLowerCase().includes(q) && !b.customerName.includes(q)) return false
      }
      return true
    })
  })

  // 페이지네이션
  const totalCount = computed(() => filteredBookings.value.length)
  const totalPages = computed(() => Math.ceil(totalCount.value / filter.value.pageSize))

  const pagedBookings = computed(() => {
    const start = (filter.value.page - 1) * filter.value.pageSize
    return filteredBookings.value.slice(start, start + filter.value.pageSize)
  })

  function setTypeFilter(type: BookingType | 'ALL') {
    filter.value.type = type
    filter.value.page = 1
  }

  function setStatusFilter(status: BookingStatus | 'ALL') {
    filter.value.status = status
    filter.value.page = 1
  }

  function setSearch(search: string) {
    filter.value.search = search
    filter.value.page = 1
  }

  function setPage(page: number) {
    filter.value.page = page
  }

  function findById(id: string) {
    return MOCK_BOOKINGS.find(b => b.id === id) ?? null
  }

  return {
    filter,
    isLoading,
    pagedBookings,
    totalCount,
    totalPages,
    setTypeFilter,
    setStatusFilter,
    setSearch,
    setPage,
    findById,
  }
})
