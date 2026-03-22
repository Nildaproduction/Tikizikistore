import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'

export default function SignUpSuccessPage() {
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
                Check your email
              </CardTitle>
              <CardDescription>Confirmation link sent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                We&apos;ve sent a confirmation email to your inbox. Please click the link in the email to verify your account.
              </p>
              <div className="text-center">
                <Link
                  href="/store"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
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
