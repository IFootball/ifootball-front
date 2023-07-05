import React from "react";
import styles from "../../../styles/home.module.scss";
import Header from "@/components/Header";
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.HomePage}>
      
      <div>
        <p>.</p>
        <div className={styles.relogio}>
          <h3>criação de times fecha em</h3>
        </div>
        <div className={styles.loginUtilArea}>
          <div className={styles.time}>
            <h1 className={styles.titulo}>Nome do Time</h1>
            <h5 className={styles.subtitulo}>Pontução</h5>

            <div className={styles.buttons}>
              <Link href={'/squad/masc'} className={styles.linkMasc}>
                <div className={styles.timeMasc}>
                  Escalar Time M
                </div>
              </Link>

              <Link href={'/squad/fem'} className={styles.linkFem}>
                <div className={styles.timeFem}>
                  Escalar Time F
                </div>
              </Link>
            </div>
          </div>

          <div className={styles.pontuacao}>
            <h1 className={styles.titulo}>Pontuação</h1>
            <h5 className={styles.subtitulo}>Top 3 Times</h5>

            <div className={styles.buttons}>
              <Link href={'/pontuacao'} className={styles.linkVerMais}>
                <div className={styles.verMais}>
                  Ver Mais
                </div>
              </Link>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
