# ✈️ Travel Booking Dashboard

> 항공·숙박·투어 예약부터 결제·바우처·정산까지 통합 관리하는 여행 SaaS 플랫폼 프론트엔드

[![Nuxt 3](https://img.shields.io/badge/Nuxt-3.x-00DC82?logo=nuxt.js)](https://nuxt.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Pinia](https://img.shields.io/badge/Pinia-3.x-FFD859?logo=pinia)](https://pinia.vuejs.org)

---

## 📌 프로젝트 개요

여행 산업의 복잡한 비즈니스 로직(예약 → 결제 → 발권 → 정산)을 단일 웹 플랫폼으로 통합합니다.  
B2B 파트너사 관리자(BO)와 일반 사용자(FO) 두 가지 화면을 하나의 Nuxt 3 애플리케이션에서 제공합니다.

### 해결하려는 문제

| 문제 | 해결 방향 |
|------|-----------|
| 수작업 중심의 예약·정산 프로세스 | 예약 상태 자동화 및 실시간 상태 관리 |
| GDS 기반의 복잡한 항공 데이터 | 사용자 친화적 UI로 재구성 |
| B2B/B2C 시스템 파편화 | 단일 플랫폼 내 역할 기반 라우팅으로 통합 |
| 실시간 예약·결제 상태 불일치 | Pinia 중앙 상태 관리 + SSE/Polling |

---

## 🛠 기술 스택

### Core
| 기술 | 버전 | 용도 |
|------|------|------|
| **Nuxt 3** | 3.x | SSR 프레임워크, 파일 기반 라우팅 |
| **Vue 3** | 3.x | Composition API, `<script setup>` |
| **TypeScript** | 5.x | 정적 타입, 인터페이스 기반 설계 |
| **Pinia** | 3.x | 예약·결제·사용자 전역 상태 관리 |

### Styling & UI
| 기술 | 용도 |
|------|------|
| **Tailwind CSS** | 유틸리티 기반 빠른 UI 구성 |
| **SCSS** | 디자인 토큰, 컴포넌트 스타일 |

### Infra / DevOps
| 기술 | 용도 |
|------|------|
| **GitHub Actions** | CI/CD 자동화 |
| **AWS Amplify** | 정적 호스팅 및 배포 |

---

## 🗂 프로젝트 구조

```
travel-booking-dashboard/
├── pages/
│   └── index.vue                  # 메인 대시보드 (KPI 카드, 예약 현황, 최근 예약)
├── layouts/
│   └── default.vue                # 사이드바 + 헤더 공통 레이아웃
├── components/
│   ├── base/                      # 재사용 가능한 순수 UI 컴포넌트
│   │   ├── BaseButton.vue         # 5가지 variant, 3가지 size, loading/disabled 상태
│   │   ├── BaseBadge.vue          # 예약 상태 표시용 (success/warning/danger/info 등)
│   │   ├── BaseInput.vue          # label, error, hint, prefix/suffix slot
│   │   ├── BaseModal.vue          # Teleport 기반 모달, 애니메이션 포함
│   │   └── BaseTable.vue          # 컬럼 설정 기반 테이블, slot으로 셀 커스터마이징
│   └── layout/
│       ├── AppSidebar.vue         # 다크 사이드바 네비게이션
│       └── SidebarItem.vue        # 활성 라우트 하이라이트 포함 메뉴 아이템
├── assets/
│   └── scss/
│       ├── main.scss              # Tailwind 진입점
│       └── _variables.scss        # 디자인 토큰 (추후 확장)
└── tailwind.config.js             # brand 컬러(sky) + accent 컬러 커스텀
```

> **예정 구조** (구현 진행 중)
> `stores/`, `composables/`, `types/`, `middleware/`, `utils/` 등은 다음 단계에서 추가됩니다.

---

## 🔄 예약 상태 흐름

```
검색 → 선택 → 예약요청 → 결제대기 → 결제완료 → 발권 → 바우처발급 → 정산
                             │
                         결제실패 → 재시도 or 취소
```

각 상태는 Pinia store에서 중앙 관리되며, API 응답에 따라 실시간으로 UI에 반영됩니다.

---

## 📱 주요 화면

### FO (일반 사용자)
- **대시보드** — 내 예약 현황, 다가오는 여행 일정, 최근 결제 내역
- **항공 검색** — 출발지·목적지·날짜 검색, 좌석 등급 선택
- **숙박/투어 검색** — 필터 기반 상품 탐색
- **예약 목록** — 상태별 필터 (예약중/결제완료/취소), 페이지네이션
- **예약 상세** — 결제 정보, 바우처 다운로드, 취소·환불 요청
- **마이페이지** — 회원 정보, 적립금, 예약 이력

### BO (B2B 관리자)
- **통합 대시보드** — 매출 통계, 예약 건수 차트, 파트너사별 현황
- **예약 관리** — 전체 예약 조회, 상태 수동 변경, 발권 처리
- **상품 관리** — 항공·숙박·투어 상품 등록·수정·노출 관리
- **파트너사 관리** — B2B 계정 관리, 수수료 설정
- **정산 리포트** — 기간별 매출·수수료·정산 내역 엑셀 다운로드

---

## ⚙️ 시작하기

### 요구사항
- Node.js 20.x 이상
- npm 9.x 이상

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/dlawl/travel-booking-dashboard.git
cd travel-booking-dashboard

# 환경변수 설정
cp .env.example .env

# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:3000)
npm run dev
```

### 환경변수

```env
NUXT_PUBLIC_API_BASE=http://localhost:3001/api
```

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

---

## 🏗 아키텍처 설계 원칙

### 역할 기반 레이아웃 분리
`middleware/admin.ts`에서 JWT 토큰의 role 필드를 확인해 BO 전용 라우트를 보호합니다.  
FO와 BO는 각각 독립된 레이아웃(`default.vue`, `admin.vue`)을 사용합니다.

### 상태 관리 전략
- **서버 상태** — `useFetch` / `useAsyncData` (Nuxt 내장, SSR 지원)
- **클라이언트 상태** — Pinia store (예약 필터, 결제 진행 상태 등)
- **URL 상태** — 검색 조건, 페이지, 정렬은 query string으로 관리 (공유·북마크 가능)

### TypeScript 타입 설계
모든 API 응답과 도메인 모델은 `types/` 디렉터리에 인터페이스로 정의합니다.  
`any` 사용을 금지하고, API 클라이언트는 제네릭으로 타입 안정성을 보장합니다.

### 컴포넌트 설계
- `components/ui/` — 비즈니스 로직 없는 순수 UI 컴포넌트
- `components/booking/`, `components/dashboard/` — 도메인 로직 포함
- Composition API + `<script setup>` 방식으로 통일

---

## 📋 개발 로드맵

### 1단계 — 공통 UI 컴포넌트 ✅
- [x] 프로젝트 초기 설정 (Nuxt 3, TypeScript, Tailwind CSS v3, Pinia)
- [x] BaseButton — variant(5종), size(3종), loading/disabled 상태
- [x] BaseBadge — 예약 상태별 색상 (success/warning/danger/info/neutral/purple)
- [x] BaseInput — label, error, hint, required 표시
- [x] BaseModal — Teleport 기반, 애니메이션, header/footer 슬롯
- [x] BaseTable — 컬럼 config 기반, 셀 슬롯 커스터마이징, 클릭 이벤트
- [x] AppSidebar — 다크 사이드바, 활성 라우트 하이라이트
- [x] 대시보드 메인 — KPI 카드 4종, 상태 현황 바, 최근 예약 테이블

### 2단계 — 예약 목록·상세 (진행 예정)
- [ ] 예약 목록 페이지 — 항공/숙박/투어 탭, 상태 필터, 페이지네이션
- [ ] 예약 상세 페이지 — 결제 정보, 바우처 상태
- [ ] Pinia store 연동 (booking, ui)

### 3단계 — 인증·권한
- [ ] 로그인 페이지
- [ ] auth 미들웨어 (FO/BO 역할 분리)

### 4단계 — 정산·리포트
- [ ] 결제 현황 페이지
- [ ] 정산 리포트 (차트 포함)

### 5단계 — 배포·CI/CD
- [ ] GitHub Actions 워크플로우
- [ ] AWS Amplify 배포

---

## 📄 라이선스

MIT
