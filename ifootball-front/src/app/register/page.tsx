"use client";
import { FormEvent, useEffect, useState } from "react";
import styles from "../../../styles/page.module.scss";
import Link from "next/link";
import api from "@/api";
import { classes_type } from "@/api/types";
import Image from "next/image";
import theme from '../../../styles/globals.module.scss';
import logo from '../../../public/images/logoFoot.png';
import quadra from '../../../public/images/quadra.png';
import { useRouter } from "next/navigation";

export default function Register() {

  const router = useRouter();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const [classes, setClasses] = useState<classes_type[] | undefined>(undefined)

  const register = async (event: FormEvent<HTMLFormElement>): Promise<boolean> => {
    let data: { [key: string]: string } = {};

    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    formData.forEach((value, key) => {
      data[key] = value;
    });

    let response = await api.authentication.createAccount(data);
    if (response) {
      // console.log(response);
      router.push('/')
      return true;
    } else {
      return false;
    }


  };
  const listClasses = async (): Promise<boolean> => {
    const classes = await api.classes.list();
    if (classes) {
      setClasses(classes);
      return true;
    } else {
      return false;
    }
  }
  useEffect(() => {
    listClasses();
    console.log(classes)
  }, [])
  return (
    <main className={styles.main} style={isMobile ? { backgroundColor: theme.backgroundColor, height: '100%', width: '100%' } : { backgroundImage: `url(${quadra.src})`, height: '100%', width: '100%' }}>
      <div className={styles.loginUtilArea}>
        <Image src={logo} alt='Logo IFootball' />
        <form onSubmit={register} className={styles.loginForm}>
          <div className={styles.loginField}>
            <label htmlFor="name">Usuário</label>
            <input
              minLength={6}
              maxLength={30}
              type="text"
              name="name"
              id="name"
              className={styles.loginInput}
            />
          </div>
          <div className={styles.loginField}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" className={styles.loginInput} />
          </div>
          <div className={styles.loginField}>
            <label htmlFor="password">Senha</label>
            <input type="password" name="password" className={styles.loginInput} id="password" />
          </div>
          <div className={styles.loginField}>
            <label htmlFor="idClass">Turma</label>
            <select className={styles.loginInput} name="idClass" id="idClass">
              {
                classes && classes.map((turma) => {
                  return (
                    <option key={turma.id} value={turma.id}>{turma.name}</option>
                  )
                })

              }
            </select>
          </div>
          <button type="submit" className={`${styles.loginButton} ${styles.registerPage}`}>Cadastrar</button>
        </form>
      </div>
    </main>
  )
}
