<template>
  <aside class="flex flex-col h-full w-60 bg-slate-950 shrink-0">
    <!-- 로고 -->
    <div class="px-5 py-5 border-b border-slate-800">
      <div class="flex items-center gap-2.5">
        <div class="w-7 h-7 rounded-md bg-brand-500 flex items-center justify-center shrink-0">
          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </div>
        <div>
          <p class="text-white text-sm font-semibold tracking-tight">TravelBook</p>
          <p class="text-slate-500 text-xs">Admin Console</p>
        </div>
      </div>
    </div>

    <!-- 네비게이션 -->
    <nav class="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
      <p class="px-2 mb-2 text-xs font-medium text-slate-600 uppercase tracking-wider">Overview</p>
      <LayoutSidebarItem to="/" icon="dashboard" label="대시보드" />

      <p class="px-2 mt-5 mb-2 text-xs font-medium text-slate-600 uppercase tracking-wider">예약 관리</p>
      <LayoutSidebarItem to="/bookings" icon="list" label="전체 예약" :badge="12" />
      <LayoutSidebarItem to="/bookings/flights" icon="flight" label="항공" />
      <LayoutSidebarItem to="/bookings/hotels" icon="hotel" label="숙박" />
      <LayoutSidebarItem to="/bookings/tours" icon="tour" label="투어 · 액티비티" />

      <p class="px-2 mt-5 mb-2 text-xs font-medium text-slate-600 uppercase tracking-wider">정산 · 결제</p>
      <LayoutSidebarItem to="/payments" icon="payment" label="결제 현황" />
      <LayoutSidebarItem to="/settlements" icon="report" label="정산 리포트" />

      <p class="px-2 mt-5 mb-2 text-xs font-medium text-slate-600 uppercase tracking-wider">관리자</p>
      <LayoutSidebarItem to="/admin/users" icon="users" label="회원 관리" />
      <LayoutSidebarItem to="/admin/settings" icon="settings" label="시스템 설정" />
    </nav>

    <!-- 하단 유저 영역 -->
    <div class="px-3 py-4 border-t border-slate-800">
      <div class="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-900 transition-colors cursor-pointer">
        <div class="w-7 h-7 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
          A
        </div>
        <div class="min-w-0">
          <p class="text-slate-300 text-xs font-medium truncate">관리자</p>
          <p class="text-slate-600 text-xs truncate">admin@travelbook.io</p>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
</script>
