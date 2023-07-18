'use client';
import { FormEvent } from 'react';
import styles from '../../../styles/register.module.scss';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import logo from './imagens/logo.png';

export default function Register() {
    const router = useRouter();

    const register = async (event: FormEvent<HTMLFormElement>): Promise<boolean> => {

        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log("Nome: " + formData.get('user-input') + " | Email: " + formData.get('email-input') + " | Senha: " + formData.get('password-input'))
        router.push('/register')
        return true;
    }
    return (
    <div className={styles.Register}>
        <Header />

        

        <main className={styles.main}>
          
          
      <div className={styles.registerUtilArea}>

        <h1 className={styles.registerTitle}>IFootball</h1>

        <form onSubmit={register}  className={styles.registerForm}>

          <div className={styles.registerField}>
            <label htmlFor="user-input" className={styles.registerLabel}>Nome</label>
            <input className={styles.registerInput} type="text" name="user-input" id="user-input" />
          </div>

          <div className={styles.registerField}>
            <label htmlFor="email-input" className={styles.registerLabel}>Email</label>
            <input className={styles.registerInput} type="email" name="email-input" id="email-input" />
          </div>

          <div className={styles.registerField}>
            <label htmlFor="password-input" className={styles.registerLabel}>Senha</label>
            <input className={styles.registerInput} type="password" name="password-input" id="password-input" />
          </div>

          <div className={styles.registerField}>
            <label htmlFor="turma-input" className={styles.registerLabel}>Turma</label>
            <input className={styles.registerInput} type="text" name="turma-input" id="turma-input" />
          </div>

          <div className={styles.registerField}>
            <p className={styles.messageAlert}>Favor, usar o e-mail institucional</p>
          </div>

          <button type='submit' className={styles.registerButton}>Criar Usuário</button>

        </form>
      </div>
    </main>

        
    </div>
    )
}
