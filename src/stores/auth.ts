import type { Session, User } from '@supabase/supabase-js'

import type { Tables } from 'database/types'

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref<User | null>(null)
  const profile = ref<Tables<'profiles'> | null>(null)

  const setAuth = (userSession: null | Session) => {
    if (!userSession) {
      return (user.value = null)
    }

    user.value = userSession.user
  }

  return {
    user,
    profile,
    setAuth
  }
})
