'use client';
import { FormEvent } from 'react';
import styles from '../../../styles/register.module.scss';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/api';

export default function Register() {
  const router = useRouter();

  const register = async (event: FormEvent<HTMLFormElement>): Promise<boolean> => {

    let data: { [key: string]: string } = {};
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.forEach((value, key) => {
      data[key] = value;
    });
    const response = await api.authentication.createAccount(data);
    console.log(response)
    // router.push('/register')
    return false;
  }
  return (
    <div className={styles.Register}>
      {/* <Header /> */}



      <main className={styles.main}>

        <div>
          <Link className={styles.backLoginLink} href={'../'}>Entrar</Link>
        </div>


        <div className={styles.registerUtilArea}>

          <h1 className={styles.registerTitle}>IFootball</h1>

          <form onSubmit={register} className={styles.registerForm}>

            <div className={styles.registerField}>
              <label htmlFor="name" className={styles.registerLabel}>Usuário</label>
              <input className={styles.registerInput} minLength={6} maxLength={30} type="text" name="name" id="name" />
            </div>

            <div className={styles.registerField}>
              <label htmlFor="email" className={styles.registerLabel}>Email</label>
              <input className={styles.registerInput} type="email" name="email" id="email" />
            </div>

            <div className={styles.registerField}>
              <label htmlFor="password" className={styles.registerLabel}>Senha</label>
              <input className={styles.registerInput} type="password" name="password" id="password" />
            </div>

            <div className={styles.registerField}>
              <label htmlFor="idClass" className={styles.registerLabel}>Turma</label>
              <select name="idClass" id="idClass">
                <option value={1}>Técnico em Informática I</option>
                <option value={2}>Técnico em Informática II</option>
                <option value={3}>Técnico em Informática III</option>
                <option value={4}>Técnico em Informática IV</option>
                <option value={5}>Técnico em Química I</option>
                <option value={6}>Técnico em Química II</option>
                <option value={7}>Técnico em Química III</option>
                <option value={8}>Técnico em Química IV</option>
                <option value={9}>Técnico em Meio Ambiente I</option>
                <option value={10}>Técnico em Meio Ambiente II</option>
                <option value={11}>Técnico em Meio Ambiente III</option>
                <option value={12}>Técnico em Meio Ambiente IV</option>
                <option value={13}>Técnico em Administração I</option>
                <option value={14}>Técnico em Administração II</option>
                <option value={15}>Técnico em Administração III</option>
                <option value={16}>Técnico em Administração IV</option>
              </select>
            </div>

            <button type='submit' className={styles.registerButton}>Cadastrar</button>

          </form>
        </div>
      </main>


    </div>
  )
}
