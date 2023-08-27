"use client";
import { FormEvent, useEffect, useState } from "react";
import styles from "../../../styles/page.module.scss";
import Link from "next/link";
import api from "@/api";
import { verifyEmail, salvarTokenNoCookie, verifyToken } from "@/api/functions";
import { classes_type } from "@/api/types";
import Image from "next/image";
import theme from '../../../styles/globals.module.scss';
import logo from '../../../public/images/logoFoot.png';
import quadra from '../../../public/images/quadra.png';
import { useRouter } from "next/navigation";
import { ErroCard } from "@/components/erroCard";

export default function Register() {

    const router = useRouter();
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const [classes, setClasses] = useState<classes_type[] | undefined>(undefined)

    const [errorForm, setErrorForm] = useState<string | boolean>(false);
    const [errorEmail, setErrorEmail] = useState<string | boolean>(false);
    const [errorName, setErrorName] = useState<string | boolean>(false);
    const [errorPassword, setErrorPassword] = useState<string | boolean>(false);

    const register = async (event: FormEvent<HTMLFormElement>) => {
        let data: { [key: string]: string } = {};
        
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        formData.forEach((value, key) => {
            data[key] = value;
        });
        let hasError = false;


        if(!data.email) {
            setErrorEmail("Preencha o email")
            hasError = true;        
        }else {
            if(!verifyEmail(data.email)) 
            {   
                setErrorEmail("O email deve ser de domínio do IFRS")
                hasError = true;
            }else setErrorEmail(false)
        }

        if(!data.name){
            setErrorName("Preencha o nome do seu time")  
            hasError = true;
        }else setErrorName(false)

        if(!data.password){
            setErrorPassword("Preencha a senha")  
            hasError = true;
        }else setErrorPassword(false)

        if(!hasError){
            try{
                await api.authentication.createAccount(data);
                var response = await api.authentication.login(data.email, data.password);
                setErrorForm(false);

                if (salvarTokenNoCookie(response.token)) {
                    let token = verifyToken();
                    if (token?.role === 'User') router.push('/homepage')                
                }
            }catch(error) {
                setErrorForm(error.response.data);
            }
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
    }, [])
    return (
        <main className={styles.main} style={isMobile ? { backgroundColor: theme.backgroundColor, height: '100%', width: '100%' } : { backgroundImage: `url(${quadra.src})`, height: '100%', width: '100%' }}>
            <div className={styles.loginUtilArea}>
                <Image src={logo} alt='Logo IFootball' />
                <form onSubmit={register} className={styles.loginForm}>
                    <div className={styles.loginField}>
                    <div className={styles.loginReturn}><p className={styles.loginP}><Link className={styles.loginLink} href={'../'}>Entrar</Link></p></div>
                        <label htmlFor="name">Usuário</label>
                        <input
                            minLength={3}
                            type="text"
                            name="name"
                            id="name"
                            className={styles.loginInput}
                        />
                        {errorName && <ErroCard>{errorName}</ErroCard>}
                    </div>
                    <div className={styles.loginField}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" className={styles.loginInput} />
                        {errorEmail && <ErroCard>{errorEmail}</ErroCard>}
                    </div>
                    <div className={styles.loginField}>
                        <label htmlFor="password">Senha</label>
                        <input type="password" name="password" className={styles.loginInput} id="password" />
                        {errorPassword && <ErroCard>{errorPassword}</ErroCard>}
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
                    {errorForm && <ErroCard>{errorForm}</ErroCard>}
                    <button type="submit" className={`${styles.loginButton} ${styles.registerPage}`}>Cadastrar</button>
                </form>
            </div>
        </main>
    )
}
