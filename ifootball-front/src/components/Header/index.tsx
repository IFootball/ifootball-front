'use client'
import Link from 'next/link'
import styles from '../../../styles/header.module.scss'
import { useState } from 'react'

export default function Navbar() {

  const [openSideBar, setOpenSideBar] = useState<boolean>(false)
  const [openMenuBar, setOpenMenuBar] = useState<boolean>(false)

  return (

    <header className={styles.header}>
      <div>
        <div className={styles.background}>
          <div className={styles.imgDiv}>
            <Link href={'homepage'}><img className={styles.logoImg} src="images/logoFoot.png" title="ifootballLogo" /></Link>
          </div>

          <input className={styles.mobile_btn} type="checkbox" id="mobile_btn" onClick={(() => {
            setOpenSideBar(!openSideBar);
          })} />
          <label className={styles.mobile_icon} htmlFor="mobile_btn" ><span className={styles.hamburguer}></span></label>
        </div>

        {
          !openSideBar ?
            <div></div>
            :
            <div className={styles.backgroundMenu}>
              <ul className={styles.nav}>
                <li className={styles.titleOps}>
                  <div className={styles.menu_in_menu}>
                    <Link className={styles.ops} href={'homepage'}>TIME M</Link>
                    <Link className={styles.ops} href={'homepage'}>TIME F</Link>
                  </div>
                </li>

                <li className={styles.titleOps}>
                  <div className={styles.menu_in_menu}>
                    <input className={styles.mobile_btn_ops} type="checkbox" id="mobile_btn_ops" onClick={(() => {
                      setOpenMenuBar(!openMenuBar);
                    })}></input><label className={styles.mobile_icon_ops} htmlFor="mobile_btn_ops" >PONTUAÇÃO<p className={styles.hamburguer_ops}>▼</p></label>

                    <div>
                      {
                        !openMenuBar ?
                          <div></div>
                          :
                          <div className={styles.menu_in_menu_ops}>
                            <Link className={styles.ops} href={'homepage'}>Time</Link>
                            <Link className={styles.ops} href={'homepage'}>Jogador</Link>
                            <Link className={styles.ops} href={'homepage'}>Gols</Link>
                            <Link className={styles.ops} href={'homepage'}>Assistência</Link>
                            <Link className={styles.ops} href={'homepage'}>Defesas</Link>
                          </div>
                      }
                    </div>
                  </div>
                </li>
              </ul>

              <div className={styles.outDiv}>
                <Link className={styles.outA} href="../"><img className={styles.outImg} src="images/out.png" title="outLogo" /><h4 className={styles.outH4}>SAIR</h4></Link>
              </div>
            </div>
        }
      </div>
    </header>
  )
}