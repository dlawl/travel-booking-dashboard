# Travel Booking Dashboard

여행사 항공·숙박·투어 예약·결제·바우처 통합 관리 B2B 대시보드

[![Nuxt 3](https://img.shields.io/badge/Nuxt-3.x-00DC82?logo=nuxt.js)](https://nuxt.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Pinia](https://img.shields.io/badge/Pinia-3.x-FFD859?logo=pinia)](https://pinia.vuejs.org)

---

## 기술 스택

### Core
| 기술 | 버전 | 용도 |
|------|------|------|
| Nuxt 3 | 3.x | SSR 프레임워크, 파일 기반 라우팅 |
| Vue 3 | 3.x | Composition API, `<script setup>` |
| TypeScript | 5.x | 정적 타입, 도메인 타입 설계 |
| Pinia | 3.x | 예약 필터·결제 상태 전역 관리 |

### Styling
| 기술 | 용도 |
|------|------|
| Tailwind CSS | 유틸리티 기반 UI |
| SCSS | 디자인 토큰, 컴포넌트 스타일 |

---

## 프로젝트 구조

```
travel-booking-dashboard/
├── pages/
│   ├── index.vue                  # 메인 대시보드 (KPI 카드, 예약 현황, 최근 예약)
│   ├── login.vue                  # 로그인 페이지
│   └── bookings/
│       ├── index.vue              # 예약 목록 (탭·필터·페이지네이션)
│       └── [id].vue               # 예약 상세 (결제 스텝퍼, 바우처, 취소)
├── layouts/
│   └── default.vue                # 사이드바 + 헤더 + 로그아웃 드롭다운
├── middleware/
│   └── auth.global.ts             # 전역 인증 가드, localStorage 세션 복원
├── stores/
│   ├── auth.ts                    # 로그인·로그아웃·세션 복원
│   └── booking.ts                 # 예약 목록 필터·페이지·findById
├── types/
│   └── booking.ts                 # BookingStatus·BookingType 타입 + 레이블·색상 맵
├── components/
│   ├── base/
│   │   ├── BaseButton.vue
│   │   ├── BaseBadge.vue
│   │   ├── BaseInput.vue
│   │   ├── BaseModal.vue
│   │   ├── BaseTable.vue
│   │   └── InfoRow.vue
│   └── layout/
│       ├── AppSidebar.vue
│       └── SidebarItem.vue
├── assets/scss/
│   ├── main.scss
│   └── _variables.scss
└── tailwind.config.js
```

---

## 예약 상태 흐름

```
결제 대기(PENDING) → 확인 중(CHECKING) → 결제 완료(CONFIRMED)
                                       → 취소(CANCELLED) / 환불(REFUNDED)
```

---

## 시작하기

### 요구사항
- Node.js 20.x 이상
- npm 9.x 이상

### 설치 및 실행

```bash
git clone https://github.com/dlawl/travel-booking-dashboard.git
cd travel-booking-dashboard
npm install
npm run dev
```

개발 서버: http://localhost:3000

### 빌드

```bash
npm run build
npm run preview
```

---

## 개발 로드맵

### 1단계 — 공통 UI 컴포넌트 완료
- [x] 프로젝트 초기 설정 (Nuxt 3, TypeScript, Tailwind CSS v3, Pinia)
- [x] BaseButton, BaseBadge, BaseInput, BaseModal, BaseTable
- [x] AppSidebar — 다크 사이드바, 활성 라우트 하이라이트
- [x] 대시보드 메인 — KPI 카드 4종, 상태 현황 바, 최근 예약 테이블

### 2단계 — 예약 목록·상세 완료
- [x] 예약 목록 — 항공/숙박/투어 탭, 상태 필터, 페이지네이션
- [x] 예약 상세 — 결제 스텝퍼, 바우처 상태, 취소 버튼
- [x] Pinia booking 스토어 (필터, 페이지, findById)

### 3단계 — 인증 완료
- [x] 로그인 페이지 — 이메일/비밀번호 폼, 유효성 검사
- [x] auth.global 미들웨어 — 미인증 시 /login 리다이렉트
- [x] 로그아웃 — 헤더 드롭다운, 세션 삭제

### 4단계 — 예정
- [ ] 결제 현황 페이지
- [ ] 정산 리포트 (기간별 매출·수수료 차트)

### 5단계 — FO (사용자 화면)
- [ ] 항공·숙박·투어 상품 검색
- [ ] 예약 목록 (사용자 본인 예약)
- [ ] 마이페이지 (회원 정보, 예약 이력)
- [ ] 역할 기반 라우팅 (BO / FO 분리)

### 6단계 — 배포·CI/CD
- [ ] GitHub Actions 워크플로우
- [ ] AWS Amplify 배포

---

## 라이선스

MIT
