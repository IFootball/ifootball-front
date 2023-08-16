import { useState } from "react";
import styles from "../../../../../styles/modalChoseTeam.module.scss";
import GlobalCard from "@/components/globalCard";

export function ModalChoseTeam() {
  interface Team {
    name: string;
  }

  const [teams, setTeams] = useState<Team[]>([
    { name: "Jogador 1" },
    { name: "Jogador 2" },
    { name: "Jogador 3" },
    { name: "Jogador 4" },
    { name: "Jogador 5" },
  ]);

function renderTeam(){
    return teams.map((x,index) => <GlobalCard key={index}>{x.name}</GlobalCard>)
}

  return (
  <div className={styles.modalChoseTeam}>
    {renderTeam()}
  </div>);
}
