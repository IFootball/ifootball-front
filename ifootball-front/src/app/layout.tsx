import styles from '../../styles/layout.module.scss';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'IFootball',
  description: 'O Cartola das intersséries do IFRS - Câmpus Feliz de 2023',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={styles.body}>{children}</body>
    </html>
  )
}
