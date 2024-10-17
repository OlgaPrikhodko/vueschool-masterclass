import type { Session, User } from '@supabase/supabase-js'

import type { Tables } from 'database/types'
import { profileQuery } from '@/utils/supabaseQueries'
import { supabase } from '@/lib/supabaseClient'

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
      profile.value = null
      user.value = null
      return
    }

    await setProfile()
  }

  const getSession = async () => {
    const { data } = await supabase.auth.getSession()

    if (data.session?.user) {
      await setAuth(data.session)
    }
  }

  return {
    user,
    profile,
    setAuth,
    getSession
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
