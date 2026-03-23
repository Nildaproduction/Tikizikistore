import { createClient } from '@/lib/supabase/client'

const supabase = createClient()

export async function signIn(email: string, password: string) {
  if (!supabase) return { data: null, error: new Error('Supabase client not initialized') }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
    options: { redirectTo: `${window.location.origin}/store` }
  })

  return { data, error }
}

export async function signUp(email: string, password: string) {
  if (!supabase) return { data: null, error: new Error('Supabase client not initialized') }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { redirectTo: `${window.location.origin}/store` }
  })

  return { data, error }
}

export async function signOut() {
  if (!supabase) return
  await supabase.auth.signOut()
}
