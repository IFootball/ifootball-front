import React from 'react';
import styles from "../../../styles/rankingGols.module.scss";
import Header from "@/components/Header";
import Image from "next/image";
import primeiro from "../imagens/primeiro.png";
import segundo from "../imagens/segundo.png";
import terceiro from "../imagens/terceiro.png";

const mockRankingData = [
  { posição: <Image src={primeiro} alt="primeiro" />, jogador: 'Jogador A', pontuação: 100 },
  { posição: <Image src={segundo} alt="segundo" />, jogador: 'Jogador B', pontuação: 90 },
  { posição: <Image src={terceiro} alt="terceiro" />, jogador: 'Jogador C', pontuação: 80 }
];

export default function Home() {
  return (
    <div className={styles.container}>
        <div className={styles.homePage}>
        <Header />
        <div className={styles.homeUtil}>
            <div className={styles.titulo}>
            <h3>TOP PONTUAÇÃO POR ARTILHEIROS</h3>
            </div>
            <div className={styles.ranking}>
              <table className={styles.tabela}>
                  <thead>
                  <tr>
                      <th>Posição</th>
                      <th>Jogador</th>
                      <th>Pontuação</th>
                  </tr>
                  </thead>
                  <tbody>
                  {mockRankingData.map((item, index) => (
                      <tr key={index}>
                      <td>{item.posição}</td>
                      <td>{item.jogador}</td>
                      <td>{item.pontuação}</td>
                      </tr>
                  ))}
                  </tbody>
              </table>
            </div>
        </div>
        <div className={styles.voltar}>VOLTAR</div>
        </div>
    </div>
  );
}
