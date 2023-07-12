'use client';
import { FormEvent } from 'react';
import styles from '../../styles/page.module.scss';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {

  const router = useRouter();

  const login = async (event: FormEvent<HTMLFormElement>): Promise<boolean> => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log("Usuário: " + formData.get('user-input') + " | Senha: " + formData.get('password-input'));
    router.push('/homepage')
    return true;
  }
  return (
    <main className={styles.main}>
      <div className={styles.loginUtilArea}>
        <img className={styles.loginLogo} src="imagens/logo.png" alt="Logo" />
        <form onSubmit={login}  className={styles.loginForm}>
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
          <div className={styles.loginAdmField}>
            <p className={styles.loginAdmin}><Link className={styles.registerLink} href={'/login-adm'}>Login Adm</Link></p>
          </div>
        </form>
      </div>
    </main>
  )
}
