'use client'
import Link from 'next/link'
import styles from '../../../styles/header.module.scss'
import { useState } from 'react'
import Image from 'next/image'
import logo from '../../../public/images/logoFoot.png';
import out from '../../../public/images/out.png'

export default function Navbar() {

    const [openSideBar, setOpenSideBar] = useState<boolean>(false)
    const [openMenuBar, setOpenMenuBar] = useState<boolean>(false)

    return (

        <header className={styles.header}>
            <div className={styles.background}>
                <input className={styles.mobile_btn} type="checkbox" id="mobile_btn" onClick={(() => {
                    setOpenSideBar(!openSideBar);
                })} />
                <label className={styles.mobile_icon} htmlFor="mobile_btn" ><span className={styles.hamburguer}></span></label>

                <Link href={'/homepage'} className={styles.navLink}><Image src={logo} width={128} height={45} quality={100} alt="ifootballLogo" placeholder='blur' /></Link>

            </div>


            <div className={`${styles.backgroundMenu} ${!openSideBar && styles.backgroundMenuClose}`}>
                <ul className={styles.nav}>
                    <li className={styles.titleOps}>
                        <div className={styles.menu_in_menu}>
                            <Link className={styles.ops} href={'/squad/male'}>TIME M</Link>
                            <Link className={styles.ops} href={'/squad/female'}>TIME F</Link>
                        </div>
                    </li>

                    <li className={styles.titleOps}>
                        <div className={styles.menu_in_menu}>
                            <input className={styles.mobile_btn_ops} type="checkbox" id="mobile_btn_ops"
                                onClick={() => setOpenMenuBar(!openMenuBar)}></input>
                            <label className={styles.mobile_icon_ops} htmlFor="mobile_btn_ops" >
                                <p className={`${styles.hamburguer_ops} ${openMenuBar && styles.menu_bar_open}`}>▶</p>
                                PONTUAÇÃO
                            </label>

                            <div>
                                {
                                    openMenuBar &&
                                    <div className={styles.menu_in_menu_ops}>
                                        <Link className={styles.ops} href={'/ranking/teams'}>Time</Link>
                                        <Link className={styles.ops} href={'/ranking/players'}>Jogador</Link>
                                        <Link className={styles.ops} href={'/ranking/goals'}>Gols</Link>
                                        <Link className={styles.ops} href={'/ranking/assists'}>Assistência</Link>
                                        <Link className={styles.ops} href={'/ranking/saves'}>Defesas</Link>
                                    </div>
                                }
                            </div>
                        </div>
                    </li>
                </ul>

                <div className={styles.outDiv}>
                    <Link className={styles.outA} href="/"><Image className={styles.outImg} src={out} alt="outLogo" width={32} height={32} /><h4 className={styles.outH4}>SAIR</h4></Link>
                </div>
            </div>

        </header>
    )
}
