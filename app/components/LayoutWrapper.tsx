'use client'

import { usePathname } from 'next/navigation'
import Navigation from './Navigation'
import Footer from './Footer'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isJobDetailsPage = /^\/open-jobs\/\d+$/.test(pathname)

  return (
    <>
      {!isJobDetailsPage && <Navigation />}
      <main>{children}</main>
      {!isJobDetailsPage && <Footer />}
    </>
  )
}
