import React from "react";
import styles from "../../../styles/home.module.scss";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className={styles.HomePage}>
      {/* <Header /> */}
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
              <a href="" className={styles.timeMasc}>Escalar Time M</a>
              <a href="" className={styles.timeFem}>Escalar Time F</a>
            </div>
          </div>

          <div className={styles.pontuacao}>
            <h1 className={styles.titulo}>Pontuação</h1>
            <h5 className={styles.subtitulo}>Top 3 Times</h5>

            <div className={styles.buttons}>
              <a href="" className={styles.verMais}>Ver Mais</a>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
