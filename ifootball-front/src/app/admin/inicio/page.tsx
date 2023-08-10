'use client';
import Link from 'next/link'
import styles from "../../../../styles/inicio.module.scss";
import Header from "@/components/Header";
import React, { useState } from 'react';

interface Player {
  name: string;
  score: number;
}

const Scoreboard: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([
    { name: 'Jogador 1', score: 0 },
    { name: 'Jogador 2', score: 150 },
    { name: 'Jogador 3', score: 75 },
    { name: 'Jogador 4', score: 50 },
    { name: 'Jogador 5', score: 25 }
  ]);

  const handleChooseTeam = () => {
    // Lógica para escolher o time
  };

  const handleConfirm = () => {
    // Lógica para confirmar a seleção
  };

  const handleExit = () => {
    // Lógica para sair
  };

  return (
    <div className={styles.div_container}>
      <div className={styles.container_2}>
      <Link href={'homepage'}><img src="images/logoFoot.png" title="ifootballLogo" /></Link>
      
      <table className={styles.table_score}>
        <thead>
          <tr className={styles.tr_score}>
            <th>Jogador</th>
            <th>Pontuação</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index}>
              <td className={styles.jogadores_name}>{player.name}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.botoes}>
        <div>
          <button className={styles.escolher_time} onClick={handleChooseTeam}>Escolher Time</button>
        </div>
        <div>
          <button onClick={handleConfirm}>Confirmar</button>
        </div>
        <div>
          <button onClick={handleExit}>Sair</button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Scoreboard;
