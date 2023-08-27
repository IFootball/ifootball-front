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
import { salvarTokenNoCookie, verifyToken, verifyEmail } from '@/api/functions';
import { ErroCard } from '@/components/erroCard';
export default function Home() {

    const router = useRouter();

    const verifySession = (): boolean => {
        const token = verifyToken();

        if (token) {
            if (token.role === 'Administrator') router.push('/admin/inicio') ;
            else router.push('/homepage');
        }
        return true;
    }

    const [isMobile, setIsMobile] = useState<boolean>(false);

    const [errorForm, setErrorForm] = useState<string | boolean>(false);
    const [errorEmail, setErrorEmail] = useState<string | boolean>(false);
    const [errorPassword, setErrorPassword] = useState<string | boolean>(false);

    const login = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const email = String(formData.get('user-input'))
        const password = String(formData.get('password-input'))
        let hasError = false;

        if(!email) {
            setErrorEmail("Preencha o email")
            hasError = true;        
        }else {
            if(!verifyEmail(email)) 
            {   
                setErrorEmail("O email deve ser de domínio do IFRS")
                hasError = true;
            }else setErrorEmail(false)
        }

        if(!password){
            setErrorPassword("Preencha a senha")  
            hasError = true;
        }else setErrorPassword(false)

        if(!hasError){
            try{
                const response = await api.authentication.login(email, password);
                setErrorForm(false);

                if (salvarTokenNoCookie(response.token)) {
                    let token = verifyToken();
                    if (token?.role === "Administrator") router.push('/admin/inicio')
                    else if (token?.role === 'User') router.push('/homepage')
                }
            }catch(error){
                setErrorForm(error.response.data);
            }
        }
    }

    useEffect(() => {
        verifySession();
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
                        {errorEmail && <ErroCard>{errorEmail}</ErroCard>}
                    </div>
                    <div className={styles.loginField}>
                        <label htmlFor="password-input" className={styles.loginLabel}>Senha</label>
                        <input className={styles.loginInput} type="password" name="password-input" id="password-input" />
                        {errorPassword && <ErroCard>{errorPassword}</ErroCard>}
                    </div>
                    <div className={styles.registerField}>
                        <p className={styles.registerP}><Link className={styles.registerLink} href={'/register'}>Criar Usuário</Link></p>
                    </div>
                    {errorForm && <ErroCard>{errorForm}</ErroCard>}
                    <button type='submit' className={styles.loginButton}>ENTRAR</button>
                </form>
            </div>
        </main>
    )
}