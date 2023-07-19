'use client';
import { FormEvent, useEffect, useState } from 'react';
import styles from '../../styles/page.module.scss';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import logo from './imagens/logo.png';
import theme from '../../styles/globals.module.scss';
import quadra from './imagens/quadra.png';
import api from '@/api';

export default function Home() {

  const router = useRouter();

  const login = async (event: FormEvent<HTMLFormElement>): Promise<boolean> => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await api.authentication.login(String(formData.get('user-input')), String(formData.get('password-input')));
    if (!response.error || (response.error.statusCode === 200 || response.error.statusCode === 201)) {
      router.push(`/homepage`);
    }
    return true;
  }
  return (
    <div className={styles.Register} style={isMobile ? {backgroundColor: theme.backgroundColor, height: '100%', width: '100%'} : {backgroundImage: `url(${quadra.src})`, height: '100%', width: '100%'}}>
      <div className={styles.loginUtilArea}>
        <h1 className={styles.loginTitle}>IFootball</h1>
        <form className={styles.loginForm} onSubmit={login}>
          <div className={styles.loginField}>
            <label htmlFor="user-input" className={styles.loginLabel}>Usuário</label>
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
