import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AccountContent } from '@/components/account/account-content'

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  return <AccountContent user={user} />
}
