import styles from '../../styles/layout.module.scss';
import theme from '../../styles/globals.module.scss';
import { Roboto_Flex as Roboto, Open_Sans, Poppins, Inter } from 'next/font/google';

const roboto = Roboto({ subsets: ['latin'] })
const opensans = Open_Sans({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

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
    <html lang="en" style={{backgroundColor: theme.backgroundColor}}>
      <body className={`${styles.body} ${roboto.className} ${opensans.className} ${inter.className}`}>{children}</body>
    </html>
  )
}
