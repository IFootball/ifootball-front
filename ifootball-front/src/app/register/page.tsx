"use client";
import { FormEvent, useEffect, useState } from "react";
import styles from "../../../styles/register.module.scss";
import Link from "next/link";
import api from "@/api";
import { classes_type } from "@/api/types";

export default function Register() {

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
      console.log(response);
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
    <div>
      <main>
        <div>
          <Link href={"../"}>Entrar</Link>
        </div>

        <div>
          <h1>IFootball</h1>

          <form onSubmit={register}>
            <div>
              <label htmlFor="name">Usuário</label>
              <input
                minLength={6}
                maxLength={30}
                type="text"
                name="name"
                id="name"
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" />
            </div>

            <div>
              <label htmlFor="password">Senha</label>
              <input type="password" name="password" id="password" />
            </div>

            <div>
              <label htmlFor="idClass">Turma</label>
              <select name="idClass" id="idClass">
                {
                  classes && classes.map((turma) => {
                    return (
                      <option key={turma.id} value={turma.id}>{turma.name}</option>
                    )
                  })
                  
                }
              </select>
            </div>

            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </main>
    </div>
  )
}
