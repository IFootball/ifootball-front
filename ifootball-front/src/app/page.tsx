'use client';
import { FormEvent, useEffect, useState } from 'react';
import styles from '../../styles/page.module.scss';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/images/logoFoot.png';
import theme from '../../styles/globals.module.scss';
import quadra from '../../public/images/quadra.png';
import api from '@/api';
import { salvarTokenNoCookie, verifyToken } from '@/api/functions';
export default function Home() {

    const router = useRouter();

    const [isMobile, setIsMobile] = useState<boolean>(false);
    const login = async (event: FormEvent<HTMLFormElement>): Promise<boolean> => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const response = await api.authentication.login(String(formData.get('user-input')), String(formData.get('password-input')));
        if (!response.error || response.error.statusCode === 200 || response.error.statusCode === 201) {
            if (salvarTokenNoCookie(response.token)) {
                let token = verifyToken();
                console.log(token);
                if (token?.role === "Administrator") {
                    router.push('/admin/inicio');
                } else if (token?.role === 'User') {
                    router.push('/homepage')
                }
                return true;
            } else {
                return false;
            }
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
    }, [])
    return (
        <main className={styles.main} style={isMobile ? { backgroundColor: theme.backgroundColor, height: '100%', width: '100%' } : { backgroundImage: `url(${quadra.src})`, height: '100%', width: '100%' }}>
            <div className={styles.loginUtilArea}>
                <Image src={logo} alt='Logo IFootball' />
                <form onSubmit={login} className={styles.loginForm}>
                    <div className={styles.loginField}>
                        <label htmlFor="user-input" className={styles.loginLabel}>Email</label>
                        <input className={styles.loginInput} type="text" name="user-input" id="user-input" />
                    </div>
                    <div className={styles.loginField}>
                        <label htmlFor="password-input" className={styles.loginLabel}>Senha</label>
                        <input className={styles.loginInput} type="password" name="password-input" id="password-input" />
                    </div>
                    <div className={styles.registerField}>
                        <p className={styles.registerP}><Link className={styles.registerLink} href={'/register'}>Criar Usuário</Link></p>
                    </div>
                    <button type='submit' className={styles.loginButton}>ENTRAR</button>
                </form>
            </div>
        </main>
    )
}
