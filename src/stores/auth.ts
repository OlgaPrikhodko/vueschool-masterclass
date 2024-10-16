import type { Session, User } from '@supabase/supabase-js'

import type { Tables } from 'database/types'
import { profileQuery } from '@/utils/supabaseQueries'

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref<User | null>(null)
  const profile = ref<Tables<'profiles'> | null>(null)

  const setProfile = async () => {
    if (!user.value) return (profile.value = null)

    if (!profile.value || profile.value.id != user.value.id) {
      const { data } = await profileQuery(user.value.id)

      profile.value = data || null
    }
  }

  const setAuth = async (userSession: null | Session) => {
    if (!userSession) {
      return (user.value = null)
    }

    user.value = userSession.user

    await setProfile()
  }

  return {
    user,
    profile,
    setAuth
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
