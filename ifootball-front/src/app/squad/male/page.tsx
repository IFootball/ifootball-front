'use client'
import Header from '../../../components/Header';
import styles from '../../../../styles/malepage.module.scss';
import { useEffect } from 'react';
import { verifyToken } from '@/api/functions';
import { useRouter } from 'next/navigation';
import Campo from '@/components/Campo';
export default function Male() {
    const router = useRouter();
    const verifySession = (): boolean => {
        const token = verifyToken();

        if (token) {
            return true;
        } else {
            router.push('/');
            return false;
        }
    }

    useEffect(() => {
        verifySession();
    }, [])
    return (
        <div className={styles.maleSquadPage}>
            <Header />
            {/* <Image src={campo} width={100} height={500} alt='campo' /> */}
            <Campo />
        </div>
    )
}