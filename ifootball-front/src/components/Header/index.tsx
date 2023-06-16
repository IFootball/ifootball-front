'use client'
import { useState } from 'react';
import styles from '../../../styles/header.module.scss';
const Header = () => {
    const [unactive, setUnactive] = useState<boolean>(true);
    return (
        <header className={styles.globalHeader}>
            <div className={styles.mainHeader}>
                <nav className={unactive ? `${styles.activeSidebar} ${styles.navbar}` : `${styles.mainHeader}`}>
                    <button type="button" className={(!unactive ? `${styles.toggleCollapse} ${styles.show}` : `${styles.toggleCollapse}`)} id='toggle-button' onClick={(() => {
                        setUnactive(!unactive);
                    })}>
                        <div className={(unactive ? `${styles.icon}` : `${styles.active} ${styles.icon}`)}>

                        </div>
                    </button>
                </nav>
            </div>

        </header>
    );
}
export default Header;