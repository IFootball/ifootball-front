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
          <div className={styles.imgDiv}>
            <Link className={styles.logo} href={'homepage'}><img className={styles.logoImg} src="images/logoFoot.png" title="ifootballLogo" /></Link>
          </div>

          <input className={styles.mobile_btn} type="checkbox" id="mobile_btn" onClick={(() => {
            setOpenSideBar(!openSideBar);
          })} />
          <label className={styles.mobile_icon} htmlFor="mobile_btn" ><span className={styles.hamburguer}></span></label>
        </div>

        {
          !openSideBar ?
            <div className={styles.none}></div>

            :

            <div className={styles.backgroundMenu}>
              <ul className={styles.nav}>
                <li className={styles.titleOps}><h3>TÍTULO</h3></li>
                <li><Link className={styles.ops} href={'homepage'}>Opção1</Link></li>
                <li><Link className={styles.ops} href={'homepage'}>Opção2</Link></li>
                <li className={styles.titleOps}><h3>PONTUAÇÃO</h3></li>
                <li><Link className={styles.ops} href={'homepage'}>Time</Link></li>
                <li><Link className={styles.ops} href={'homepage'}>Jogador</Link></li>
                <li><Link className={styles.ops} href={'homepage'}>Gols</Link></li>
                <li><Link className={styles.ops} href={'homepage'}>Assistência</Link></li>
                <li><Link className={styles.ops} href={'homepage'}>Defesas</Link></li>

              </ul>

              <div className={styles.outDiv}>
                <a className={styles.outA} href=""><div className={styles.outDivA}><img className={styles.outImg} src="images/out.png" title="outLogo" /><h4 className={styles.outH4}>SAIR</h4></div></a> 
              </div>

              

            </div>


        }
      </div>


    </header>

  )
}