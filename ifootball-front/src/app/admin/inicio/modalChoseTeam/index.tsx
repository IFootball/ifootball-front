import { useEffect, useState } from "react";
import styles from "../../../../../styles/modalChoseTeam.module.scss";
import { TeamCard } from "@/components/teamCard";
import axios from "../../../../api/index"
import { classes_type } from "@/api/types";

interface ModalChoseTeamProps {
    closeModal: () => void;
    setChoseTeam: (id: number) => void;
}

export function ModalChoseTeam({
    closeModal,
    setChoseTeam,
}: ModalChoseTeamProps) {


    const [page, setPage] = useState<number>(1)
    const [teams, setTeams] = useState<classes_type[]>([]);

    async function getTeamsClasses() {
        var response = await axios.teamClass.list(page, 35)
        setTeams(response.data)
    }

    useEffect(() => {
        getTeamsClasses()
    }, [])

    function renderTeam() {
        return teams.map((x, index) => <TeamCard onClick={() => setChoseTeam(x.id)} key={index} idGender={x.idGender}>{x.className}</TeamCard>);
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
