'use client';
import Link from 'next/link'
import styles from "../../../../styles/inicio.module.scss";
import Header from "@/components/Header";
import { useEffect, useState } from 'react'
import { ModalChoseTeam } from '@/app/admin/inicio/modalChoseTeam';
import axios from "../../../api/index"
import { teamClassPlayer } from '@/api/types';
import exit from "../../../../public/images/porta.png"
import Image from 'next/image';
import logoIfootbal from "../../../../public/images/logoFootCurtoDireita.png"
import { useRouter } from 'next/navigation';
import { deleteCookie } from '@/api/functions';

const Scoreboard = () => {

    const [players, setPlayers] = useState<teamClassPlayer[]>([]);
    const [idTeam, setIdTeam] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [modalChoseTeam, setModalChoseTeam] = useState<boolean>(false);

    const router = useRouter();

    function handleChooseTeam() {
        setModalChoseTeam(oldModal => !oldModal)
    };

    function handleSetIdTeam(id: number) {
        setIdTeam(id)
        handleChooseTeam()
    };
    async function getPlayers() {
        var players = await axios.teamClass.listPlayers(idTeam, 20, page);
        setPlayers(players.data)
    }

    useEffect(() => {

        getPlayers()
    }, [idTeam])

    function renderPlayers() {
        if (idTeam == 0) return <p>Escolha um time</p>
        if (players.length == 0) return <p>Não há jogadores nesse time</p>

        return players.map((player, index) => (
            <tr key={index}>

                <Link className={styles.Link_jogador_name} href={`/admin/pontuacao-jogador/${player.id}`}>
                    <td className={styles.jogadores_name}>
                        <div className={styles.h4link}><h4>▶</h4></div>
                        <div className={styles.playername}>
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

            {modalChoseTeam && <ModalChoseTeam closeModal={handleChooseTeam} setChoseTeam={handleSetIdTeam}></ModalChoseTeam>}

            <div className={styles.divlogoadm}>
                <div className={styles.logo}>
                    <Link href={''}><Image src={logoIfootbal} title="ifootballLogo" placeholder='blur' alt="logo ifootbal" /></Link>
                    <h1>ADM</h1>
                </div>
                <Image className={styles.logoSair} src={exit} alt="simbolo sair" onClick={() => {
                    router.push('/');
                    deleteCookie('user_token');
                }} />
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

                    <div className={styles.div_escolher_time}>
                        <button className={styles.escolher_time} onClick={handleChooseTeam}>ESCOLHER TIME</button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Scoreboard;
