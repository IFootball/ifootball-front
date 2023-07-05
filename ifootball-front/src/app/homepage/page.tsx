import React from "react";
import styles from "../../../styles/home.module.scss";
import Header from "@/components/Header";
import GlobalCard from "@/components/globalCard";
import Link from "next/link";
import DefaultButton from "@/components/DefaultButton";


export default function Home() {
  return (
    <div className={styles.HomePage}>
      {/* <Header /> */}
      <div className={styles.homeUtil}>
        <div className={styles.relogio}>
          <h3>criação de times fecha em</h3>
        </div>
        <div className={styles.homeCardsArea}>
            <GlobalCard>
              <div className={styles.time}>
                <h1 className={styles.titulo}>Nome do Time</h1>
                <h5 className={styles.subtitulo}>Pontução</h5>

                <div className={styles.buttons}>
                  <Link href={'/squad/male'}>
                    <DefaultButton text="Time Masculino" />
                  </Link> 
                  <Link href={'/squad/female'}>
                    <DefaultButton text="Time Feminino" />
                  </Link>
                </div>
              </div>
            </GlobalCard>

          <GlobalCard>
            <div className={styles.pontuacao}>
              <h1 className={styles.titulo}>Pontuação</h1>
              <h5 className={styles.subtitulo}>Top 3 Times</h5>

              <div className={styles.buttons}>
                <a href="" className={styles.verMais}>Ver Mais</a>
              </div>
            </div>
          </GlobalCard>
        </div>
      </div>
    </div>
  );
}
