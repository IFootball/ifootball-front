'use client';
import Link from 'next/link'
import styles from "../../../../styles/inicio.module.scss";
import Header from "@/components/Header";
import { useState } from 'react'
import { ModalChoseTeam } from '@/app/admin/inicio/modalChoseTeam';

interface Player {
  name: string;
  score: number;
}

const Scoreboard = () => {
  const [players, setPlayers] = useState<Player[]>([
    { name: 'Jogador 1', score: 0 },
    { name: 'Jogador 2', score: 150 },
    { name: 'Jogador 3', score: 75 },
    { name: 'Jogador 4', score: 50 },
    { name: 'Jogador 5', score: 25 }
  ]);

  const [idTeam, setIdTeam] = useState<number>();
  const [modalChoseTeam, setModalChoseTeam] = useState<boolean>(false);
  
  const handleChooseTeam = () => {
    setModalChoseTeam(oldModal => !oldModal)
  };

  const handleConfirm = () => {
    // Lógica para confirmar a seleção
  };

  const handleExit = () => {
    // Lógica para sair
  };

  function renderPlayers(){
    return players.map((player, index) => (
      <tr key={index}>

        <Link className={styles.Link_jogador_name} href={''}>
          <td className={styles.jogadores_name}>
            <div className={styles.jogador_div}>
              <h4>▶</h4>
              {player.name}
            </div>
          </td>
        </Link>

        <td>{player.score}</td>
      </tr>
    ))
  }

  return (
    <main>

    {modalChoseTeam && <ModalChoseTeam closeModal={handleChooseTeam} setChoseTeam={setIdTeam}></ModalChoseTeam>}

    <div className={styles.divlogoadm}>
      <div className={styles.logo}><Link href={''}><img src="/images/logoFootCurtoDireita.png" title="ifootballLogo" placeholder='blur' /></Link><h1>ADM</h1></div>
    </div>

    <div className={styles.div_container}>  
      <div className={styles.container_2}>
      
      <div className={styles.table}>

      <table className={styles.table_score}>

        <thead>
          <tr className={styles.tr_score}>
            <th>Jogador</th>
            <th>Pontuação</th>
          </tr>
        </thead>

        <tbody>
          {renderPlayers()}
        </tbody>
      </table>
      </div>

      <div className={styles.botoes}>
        <div className={styles.div_escolher_time}>
          <button className={styles.escolher_time} onClick={handleChooseTeam}>ESCOLHER TIME</button>
        </div>
        <div className={styles.div_confirmar}>
          <button className={styles.confirmar} onClick={handleConfirm}>CONFIRMAR</button>
        </div>
        <div className={styles.div_sair}>
          <button className={styles.sair} onClick={handleExit}>Sair</button>
        </div>
      </div>
      </div>
    </div>
    </main>
  );
};

export default Scoreboard;
