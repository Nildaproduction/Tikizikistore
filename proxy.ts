import { NextResponse, type NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  // Example: allow all requests, or add simple logic here
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
