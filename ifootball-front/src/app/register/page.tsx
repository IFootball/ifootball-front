"use client";
import { FormEvent } from "react";
import styles from "../../../styles/register.module.scss";
import Link from "next/link";
import api from "@/api";

export default function Register() {

  const register = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<boolean> => {
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
  return (
    <div>
      {/* <Header /> */}

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

            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </main>
    </div>
  );
}
