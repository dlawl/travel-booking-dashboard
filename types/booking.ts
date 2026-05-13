export type BookingStatus =
  | 'PENDING'      // 결제 대기
  | 'CONFIRMED'    // 결제 완료
  | 'CHECKING'     // 확인 중
  | 'CANCELLED'    // 취소됨
  | 'REFUNDED'     // 환불 완료

export type BookingType = 'FLIGHT' | 'HOTEL' | 'TOUR'

export interface Booking {
  id: string
  customerName: string
  customerEmail: string
  type: BookingType
  status: BookingStatus
  amount: number
  route: string
  createdAt: string
  travelDate: string
}

export interface BookingFilter {
  type: BookingType | 'ALL'
  status: BookingStatus | 'ALL'
  search: string
  page: number
  pageSize: number
}

// 화면 표시용 레이블 맵
export const BOOKING_STATUS_LABEL: Record<BookingStatus, string> = {
  PENDING: '결제 대기',
  CONFIRMED: '결제 완료',
  CHECKING: '확인 중',
  CANCELLED: '취소됨',
  REFUNDED: '환불 완료',
}

export const BOOKING_TYPE_LABEL: Record<BookingType, string> = {
  FLIGHT: '항공',
  HOTEL: '숙박',
  TOUR: '투어',
}

export const BOOKING_STATUS_COLOR: Record<BookingStatus, string> = {
  CONFIRMED: 'text-emerald-600',
  CHECKING: 'text-brand-500',
  PENDING: 'text-amber-500',
  CANCELLED: 'text-slate-400',
  REFUNDED: 'text-slate-400',
}
