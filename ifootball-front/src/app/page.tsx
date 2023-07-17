'use client';
import { FormEvent, useEffect, useState } from 'react';
import styles from '../../styles/page.module.scss';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import logo from './imagens/logo.png';
import theme from '../../styles/globals.module.scss';
import quadra from './imagens/quadra.png';

export default function Home() {

  const router = useRouter();

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const login = async (event: FormEvent<HTMLFormElement>): Promise<boolean> => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log("Usuário: " + formData.get('user-input') + " | Senha: " + formData.get('password-input'));
    router.push('/homepage')
    return true;
  }
  useEffect(() => {
    if (window.screen.width < 700) {
      setIsMobile(true);
    } else {
      setIsMobile(false)
    }
  }, [])
  return (
    <main className={styles.main} style={isMobile ? {backgroundColor: theme.backgroundColor, height: '100%', width: '100%'} : {backgroundImage: `url(${quadra.src})`, height: '100%', width: '100%'}}>
      <div className={styles.loginUtilArea}>
        <Image src={logo} alt='Logo IFootball' />
        <form onSubmit={login} className={styles.loginForm}>
          <div className={styles.loginField}>
            <label htmlFor="user-input" className={styles.loginLabel}>E-mail</label>
            <input className={styles.loginInput} type="text" name="user-input" id="user-input" />
          </div>
          <div className={styles.loginField}>
            <label htmlFor="password-input" className={styles.loginLabel}>Senha</label>
            <input className={styles.loginInput} type="password" name="password-input" id="password-input" />
          </div>
          <div className={styles.registerField}>
            <p className={styles.registerP}><Link className={styles.registerLink} href={'/register'}>Criar Usuário</Link></p>
          </div>
          <button type='submit' className={styles.loginButton}>Entrar</button>
        </form>
      </div>
    </main>
  )
}
