import './globals.css'
import { SidebarProvider } from '@/contexts/SidebarContext'
import { SidebarWrapper } from '@/components/ui/sidebar/client-wrapper'
import { AuthProvider } from '@/contexts/auth'
import { Providers } from './providers'
import { getSupabaseClient } from '@/lib/supabase/client'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = getSupabaseClient()

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AuthProvider>
          <Providers>
            <SidebarProvider>
              <div className="flex min-h-screen">
                <SidebarWrapper />
                <main className="flex-1 transition-all duration-300 ease-in-out">
                  <div className="p-6">{children}</div>
                </main>
              </div>
            </SidebarProvider>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  )
}