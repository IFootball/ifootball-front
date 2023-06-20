'use client'
import { useState } from 'react';
import styles from '../../../styles/header.module.scss';
import { getIcon } from '../SVGHelper/tools';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const Header = () => {
    const [unactive, setUnactive] = useState<boolean>(true);
    const icon = getIcon();
    const router = useRouter();
    return (
        <header className={styles.globalHeader}>
            <div className={styles.mainHeader}>
                <nav className={unactive ? `${styles.activeSidebar} ${styles.navbar}` : `${styles.mainHeader}`} style={unactive ? {marginLeft: '-260px', display: 'block'} : {left: '0', marginLeft: '0'}}>
                    <button type="button" className={(!unactive ? `${styles.toggleCollapse} ${styles.show}` : `${styles.toggleCollapse}`)} id='toggle-button' onClick={(() => {
                        setUnactive(!unactive);
                    })}>
                        <div className={(unactive ? `${styles.icon}` : `${styles.active} ${styles.icon}`)}>
                            {icon}
                        </div>
                    </button>
                    <ul className={styles.sideNav}>
                        <div className={styles.logoSB}>
                            IFootball
                        </div>
                        <div className={styles.navItem}>
                            <Link href={'/'}>
                                Homepage
                            </Link>
                        </div>
                        <div className={styles.navItem}>
                            <Link href={'/squad'}>
                                Escalação
                            </Link>
                        </div>
                    </ul>
                    {
                        unactive &&
                        <div className={styles.ocupadorEspaco} onClick={(() => {
                            setUnactive(!unactive);
                        })}>
                            <div className={styles.opacity} />
                        </div>
                    }
                </nav>
                <div className={styles.logoSpace} onClick={(() => {
                    router.push('/');
                })}>
                    IFootball
                </div>
            </div>
        </header>
    );
}
export default Header;