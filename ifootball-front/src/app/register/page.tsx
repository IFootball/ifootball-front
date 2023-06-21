import { FormEvent } from 'react';
import styles from '../../styles/page.module.scss';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
      <div className={styles.loginUtilArea}>
        <h1 className={styles.loginTitle}>IFootball</h1>
        <form onSubmit={register}  className={styles.loginForm}>
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

        
    </div>
    )
}
