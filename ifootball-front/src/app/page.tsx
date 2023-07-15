'use client';
import { FormEvent } from 'react';
import styles from '../../styles/page.module.scss';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/api';

export default function Home() {

  const router = useRouter();

  const login = async (event: FormEvent<HTMLFormElement>): Promise<boolean> => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await api.authentication.login(String(formData.get('user-input')), String(formData.get('password-input')))
    console.log(response);
    return true;
  }
  return (
    <main className={styles.main}>
      <div className={styles.loginUtilArea}>
        <h1 className={styles.loginTitle}>IFootball</h1>
        <form onSubmit={login}  className={styles.loginForm}>
          <div className={styles.loginField}>
            <label htmlFor="user-input" className={styles.loginLabel}>Usuário</label>
            <input className={styles.loginInput} type="text" name="user-input" id="user-input" />
          </div>
          <div className={styles.loginField}>
            <label htmlFor="password-input" className={styles.loginLabel}>Senha</label>
            <input className={styles.loginInput} type="password" name="password-input" id="password-input" />
          </div>
          <div className={styles.registerField}>
            <p className={styles.registerP}>Não tem conta? <Link className={styles.registerLink} href={'/register'}>Clique aqui</Link></p>
          </div>
          <button type='submit' className={styles.loginButton}>Logar</button>
        </form>
      </div>
    </main>
  )
}
