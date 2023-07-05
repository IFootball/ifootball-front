import Link from 'next/link'
import styles from '../../../styles/header.module.scss'

export default function Navbar() {
  return (

    <header className={styles.header}>
        <div className={styles.container}>
    
            <Link className={styles.logo} href={'homepage'}><img className={styles.logoImg} src="images/logo.png" title="ifootballLogo" /></Link>
    
            <input className={styles.mobile_btn} type="checkbox" id="mobile_btn" />
            <label className={styles.mobile_icon} htmlFor="mobile_btn" ><span className={styles.hamburguer}></span></label>
    
              <ul className={styles.nav}>
                <li><Link className={styles.ops} href={'homepage'}>OPÇÃO-1</Link></li>
                <li><Link className={styles.ops} href={'homepage'}>OPÇÃO-2</Link></li>
                <li><Link className={styles.ops} href={'homepage'}>OPÇÃO-3</Link></li>
                <li><Link className={styles.ops} href={'homepage'}>OPÇÃO-4</Link></li>
    
              </ul>
        </div>
        
    </header>
    
  )
}