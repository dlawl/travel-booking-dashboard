import { defineStore } from 'pinia'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager'
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<AuthUser | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  function login(email: string, password: string): boolean {
    // Mock credentials — replace with real API call
    const MOCK_USERS: Record<string, { password: string; user: AuthUser }> = {
      'admin@travelco.com': {
        password: 'admin1234',
        user: { id: 'u-001', name: '관리자', email: 'admin@travelco.com', role: 'admin' },
      },
      'manager@travelco.com': {
        password: 'manager1234',
        user: { id: 'u-002', name: '매니저', email: 'manager@travelco.com', role: 'manager' },
      },
    }

    const match = MOCK_USERS[email]
    if (!match || match.password !== password) return false

    token.value = `mock-jwt-${match.user.id}-${Date.now()}`
    user.value = match.user

    if (import.meta.client) {
      localStorage.setItem('auth_token', token.value)
      localStorage.setItem('auth_user', JSON.stringify(match.user))
    }

    return true
  }

  function logout() {
    token.value = null
    user.value = null
    if (import.meta.client) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
    }
  }

  function restoreSession() {
    if (!import.meta.client) return
    const saved = localStorage.getItem('auth_token')
    const savedUser = localStorage.getItem('auth_user')
    if (saved && savedUser) {
      token.value = saved
      user.value = JSON.parse(savedUser) as AuthUser
    }
  }

  return { token, user, isAuthenticated, login, logout, restoreSession }
})
