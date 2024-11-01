import type { Session, User } from '@supabase/supabase-js'

import type { Tables } from 'database/types'
import { profileQuery } from '@/utils/supabaseQueries'
import { supabase } from '@/lib/supabaseClient'

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref<User | null>(null)
  const profile = ref<Tables<'profiles'> | null>(null)
  const isTrackingAuthChanges = ref(false)

  const setProfile = async () => {
    if (!user.value) return (profile.value = null)

    if (!profile.value || profile.value.id != user.value.id) {
      const { data } = await profileQuery({
        column: 'id',
        value: user.value.id
      })

      profile.value = data || null
    }
  }

  const setAuth = async (userSession: null | Session) => {
    if (!userSession) {
      profile.value = null
      user.value = null
      return
    }

    user.value = userSession.user
    await setProfile()
  }

  const getSession = async () => {
    const { data } = await supabase.auth.getSession()

    if (data.session?.user) {
      await setAuth(data.session)
    }
  }

  const trackAuthChanged = () => {
    if (isTrackingAuthChanges.value) return

    isTrackingAuthChanges.value = true

    supabase.auth.onAuthStateChange((event, session) => {
      setTimeout(async () => {
        await setAuth(session)
      }, 0)
    })
  }

  return {
    user,
    profile,
    setAuth,
    getSession,
    trackAuthChanged
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
