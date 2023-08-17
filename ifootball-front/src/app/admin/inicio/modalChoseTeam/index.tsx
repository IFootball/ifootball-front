import { useState } from "react";
import styles from "../../../../../styles/modalChoseTeam.module.scss";
import { TeamCard } from "@/components/teamCard";

interface ModalChoseTeamProps {
  closeModal: () => void;
  setChoseTeam: (id: number) => void;
}

export function ModalChoseTeam({
  closeModal,
  setChoseTeam,
}: ModalChoseTeamProps) {
  interface Team {
    name: string;
    id: number;
  }

  const [teams, setTeams] = useState<Team[]>([
    { name: "Jogador 1", id: 1 },
    { name: "Jogador 2", id: 2 },
    { name: "Jogador 3", id: 3 },
    { name: "Jogador 4", id: 4 },
    { name: "Jogador 5", id: 5 },
  ]);

  function renderTeam() {
    return teams.map((x, index) => <TeamCard onClick={() => setChoseTeam(x.id)} key={index}>{x.name}</TeamCard>);
  }

  return (
    <>
      <div onClick={closeModal} className={styles.blur}></div>
      <div className={styles.modalChoseTeam}>
        <button onClick={closeModal}>
          <img src="/images/voltar.png" alt="" />
        </button>
        <div className={styles.modalListTeam}>{renderTeam()}</div>
      </div>
    </>
  );
}
