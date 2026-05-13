<template>
  <div class="flex h-screen bg-slate-100 overflow-hidden">
    <AppSidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- 상단 헤더 -->
      <header class="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between shrink-0">
        <div class="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-1.5 w-64">
          <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input class="bg-transparent text-sm text-slate-600 placeholder-slate-400 outline-none w-full" placeholder="예약번호, 고객명 검색..." />
        </div>
        <div class="flex items-center gap-3">
          <button class="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span class="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-brand-500 rounded-full" />
          </button>
          <div class="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer">
            A
          </div>
        </div>
      </header>
      <!-- 메인 콘텐츠 -->
      <main class="flex-1 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>
