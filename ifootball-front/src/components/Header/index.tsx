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
                <li className={styles.titleOps}><h3>TÍTULO</h3></li>
                <li><Link className={styles.ops} href={'homepage'}>Opção1</Link></li>
                <li><Link className={styles.ops} href={'homepage'}>Opção2</Link></li>
                <li className={styles.titleOps}><input className={styles.mobile_btn_ops} type="checkbox" id="mobile_btn_ops" onClick={(() => {
                  setOpenMenuBar(!openMenuBar);
                })} />PONTUAÇÃO</li>
                <li className={styles.titleOps}>
                  <div>
                    {
                      !openMenuBar ?
                        <div></div>
                        :
                        <div>
                          <img src="images/logoFoot.png" alt="" />
                        </div>
                    }
                  </div></li>


                <li><Link className={styles.ops} href={'homepage'}>Time</Link></li>
                <li><Link className={styles.ops} href={'homepage'}>Jogador</Link></li>
                <li><Link className={styles.ops} href={'homepage'}>Gols</Link></li>
                <li><Link className={styles.ops} href={'homepage'}>Assistência</Link></li>
                <li><Link className={styles.ops} href={'homepage'}>Defesas</Link></li>

              </ul>

              <div className={styles.outDiv}>
                <Link className={styles.outA} href=""><img className={styles.outImg} src="images/out.png" title="outLogo" /><h4 className={styles.outH4}>SAIR</h4></Link>
              </div>
            </div>
        }
      </div>
    </header>
  )
}