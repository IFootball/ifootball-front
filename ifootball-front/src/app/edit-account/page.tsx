'use client';
import { FormEvent, useEffect, useState } from 'react';
import styles from '../../../styles/page.module.scss';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/images/logoFoot.png';
import theme from '../../../styles/globals.module.scss';
import quadra from '../../../public/images/quadra.png';
import api from '@/api';
import { verifyTerms, verifyToken } from '@/api/functions';
export default function Home() {

    const router = useRouter();

    const verifySession = (): boolean => {
    
        const token = verifyToken();
    
        if (token) {
            return true;
        } else {
            if (verifyTerms()) {
                router.push('/login');
            } else {
                router.push('/')
            }
            return false;
        }
    }
    
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [editAccount, setEditAccount] = useState<{
        teamName: string,
        password: string,
        newPassword: string
    }>({
        teamName: verifyToken()?.name ?? '',
        password: '',
        newPassword: ''
    })

    const editAccountAction = async (event: FormEvent<HTMLFormElement>): Promise<boolean> => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const response = await api.authentication.editAccount(editAccount.teamName, editAccount.password, editAccount.newPassword);
        if (!response.error || response.error.statusCode === 200 || response.error.statusCode === 201) {
            router.push('/homepage');
            return true;
        } else {
            return false
        }
    }
    useEffect(() => {
        if (window.screen.width < 700) {
            setIsMobile(true);
        } else {
            setIsMobile(false)
        }
        verifySession();
    }, [])
    return (
        <main className={styles.main} style={isMobile ? { backgroundColor: theme.backgroundColor, height: '100%', width: '100%' } : { backgroundImage: `url(${quadra.src})`, height: '100%', width: '100%' }}>
            <div className={styles.loginUtilArea}>
                <Image src={logo} alt='Logo IFootball' />
                <form onSubmit={editAccountAction} className={styles.loginForm}>
                    <div className={styles.loginField}>
                        <label htmlFor="user-input" className={styles.loginLabel}>Nome do Time</label>
                        <input className={styles.loginInput} value={editAccount.teamName} type="text" name="user-input" id="user-input" onChange={(e) => {
                            setEditAccount({
                                ...editAccount,
                                teamName: e.target.value
                            })
                        }} />
                    </div>
                    <div className={styles.loginField}>
                        <label htmlFor="password-input" className={styles.loginLabel}>Senha</label>
                        <input className={styles.loginInput} value={editAccount.password} type="password" name="password-input" id="password-input" onChange={(e) => {
                            setEditAccount({
                                ...editAccount,
                                password: e.target.value
                            })
                        }} />
                    </div>
                    <div className={styles.loginField}>
                        <label htmlFor="new-password-input" className={styles.loginLabel}>Nova Senha</label>
                        <input className={styles.loginInput} value={editAccount.newPassword} type="password" name="new-password-input" id="new-password-input" onChange={(e) => {
                            setEditAccount({
                                ...editAccount,
                                newPassword: e.target.value
                            })
                        }} />
                    </div>
                    <button type='submit' className={styles.loginButton}>EDITAR USUÁRIO</button>
                </form>
            </div>
        </main>
    )
}