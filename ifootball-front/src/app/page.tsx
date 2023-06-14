'use client';
import { FormEvent } from 'react';
import styles from '../../styles/page.module.scss';

export default function Home() {

  const login = async (event: FormEvent<HTMLFormElement>): Promise<boolean> => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log("Usuário: " + formData.get('user-input') + " | Senha: " + formData.get('password-input'));
    return false;
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
          <button type='submit' className={styles.loginButton}>Logar</button>
        </form>
      </div>
    </main>
  )
}
