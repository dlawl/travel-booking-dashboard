<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center p-4">
    <div class="w-full max-w-sm">
      <!-- Logo / Brand -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center gap-2 mb-2">
          <div class="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
          <span class="text-lg font-bold text-slate-900">TravelBO</span>
        </div>
        <p class="text-sm text-slate-400">관리자 로그인</p>
      </div>

      <!-- Login Card -->
      <div class="bg-white rounded-2xl border border-slate-200 p-8 space-y-5">
        <div v-if="error" class="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {{ error }}
        </div>

        <BaseInput
          v-model="form.email"
          label="이메일"
          type="email"
          placeholder="admin@travelco.com"
          :error="fieldError.email"
          @keyup.enter="submit"
        />

        <BaseInput
          v-model="form.password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요"
          :error="fieldError.password"
          @keyup.enter="submit"
        />

        <BaseButton
          variant="primary"
          class="w-full justify-center"
          :loading="loading"
          @click="submit"
        >
          로그인
        </BaseButton>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

definePageMeta({ layout: false })

const auth = useAuthStore()
const router = useRouter()

const form = reactive({ email: '', password: '' })
const fieldError = reactive({ email: '', password: '' })
const error = ref('')
const loading = ref(false)

function validate() {
  fieldError.email = ''
  fieldError.password = ''
  if (!form.email) { fieldError.email = '이메일을 입력해주세요.'; return false }
  if (!form.password) { fieldError.password = '비밀번호를 입력해주세요.'; return false }
  return true
}

async function submit() {
  if (!validate()) return
  loading.value = true
  error.value = ''

  await new Promise(r => setTimeout(r, 400))

  const ok = auth.login(form.email, form.password)
  loading.value = false

  if (ok) {
    router.push('/')
  } else {
    error.value = '이메일 또는 비밀번호가 올바르지 않습니다.'
  }
}
</script>
