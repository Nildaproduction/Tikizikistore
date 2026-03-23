
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Supabase URL and Anon Key must be set in environment variables')
      return null
    } else {
      throw new Error('Supabase URL and Anon Key must be set in environment variables')
    }
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
