import './globals.css'
import { Outfit } from 'next/font/google'

const outfit = Outfit({ subsets: ['latin'] })

export const metadata = {
  title: 'designHall.',
  description: 'A minimal - clumsy playground',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='bg-[#171717] text-[#F5F5F5]'>
      <body className={outfit.className}>{children}</body>
    </html>
  )
}
