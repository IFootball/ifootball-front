import React from 'react';
import styles from "../../../styles/rankingTimes.module.scss";
import Header from "@/components/Header";

const mockRankingData = [
  { posição: 1, jogador: 'Jogador A', pontuação: 100 },
  { posição: 2, jogador: 'Jogador B', pontuação: 90 },
  { posição: 3, jogador: 'Jogador C', pontuação: 80 }
];

export default function Home() {
  return (
    <div className={styles.container}>
        <div className={styles.homePage}>
        <Header />
        <div className={styles.homeUtil}>
            <div className={styles.titulo}>
            <h3>TOP PONTUAÇÃO POR TIME</h3>
            </div>
            <div className={styles.ranking}>
            <table>
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
