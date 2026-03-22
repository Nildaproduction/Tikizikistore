import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>
}) {
  const params = await searchParams

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <Link href="/store" className="inline-block">
              <h1 className="font-serif text-3xl font-bold tracking-tight">TIKIZIKI</h1>
            </Link>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-serif">
                Something went wrong
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {params?.error ? (
                <p className="text-sm text-muted-foreground">
                  Error: {params.error}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  An unexpected error occurred during authentication.
                </p>
              )}
              <div className="flex flex-col gap-2 text-center text-sm">
                <Link
                  href="/auth/login"
                  className="text-primary hover:underline underline-offset-4"
                >
                  Try logging in again
                </Link>
                <Link
                  href="/store"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Back to store
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
