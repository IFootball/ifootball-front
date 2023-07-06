'use client'
import Link from 'next/link'
import styles from '../../../styles/header.module.scss'
import Home from '@/app/page'
import { useState } from 'react'
import { link } from 'fs'

export default function Navbar() {

  const [openSideBar, setOpenSideBar] = useState<boolean>(false)

  return (

    <header className={styles.header}>
      <div className={styles.container}>

        <div className={styles.background}>
        <Link className={styles.logo} href={'homepage'}><img className={styles.logoImg} src="images/logo.png" title="ifootballLogo" /></Link>

        <input className={styles.mobile_btn} type="checkbox" id="mobile_btn" onClick={(() => {
          setOpenSideBar(!openSideBar);
        })} />
        <label className={styles.mobile_icon} htmlFor="mobile_btn" ><span className={styles.hamburguer}></span></label>
        </div>

        {
          !openSideBar?
          <div className={styles.none}></div>
            
            :
            
            <div className={styles.backgroundMenu}>
            <ul className={styles.nav}>
              <li className={styles.titleOps}><h3>Título</h3></li>
              <li><Link className={styles.ops} href={'homepage'}>OPÇÃO-1</Link></li>
              <li><Link className={styles.ops} href={'homepage'}>OPÇÃO-2</Link></li>
              <li className={styles.titleOps}><h3>Pontuação</h3></li>
              <li><Link className={styles.ops} href={'homepage'}>Time</Link></li>
              <li><Link className={styles.ops} href={'homepage'}>Jogador</Link></li>
              <li><Link className={styles.ops} href={'homepage'}>Gols</Link></li>
              <li><Link className={styles.ops} href={'homepage'}>Assistência</Link></li>
              <li><Link className={styles.ops} href={'homepage'}>Defesas</Link></li>

            </ul>
            </div>
            

        }
      </div>


    </header>

  )
}