'use client';
import Link from 'next/link'
import styles from "../../../../styles/inicio.module.scss";
import { FormEvent, useEffect, useState } from 'react'
import { ModalChoseTeam } from '@/app/admin/inicio/modalChoseTeam';
import axios from "../../../api/index"
import { teamClassPlayer } from '@/api/types';
import exit from "../../../../public/images/porta.png"
import Image from 'next/image';
import logoIfootbal from "../../../../public/images/logoFootCurtoDireita.png"
import { useRouter } from 'next/navigation';
import { deleteCookie, verifySession } from '@/api/functions';
import PopUp from '@/components/PopUp';
import {FaCalendarAlt} from "react-icons/fa"
import {IoMdCloseCircle} from "react-icons/io"
import { ToastContainer, toast } from 'react-toastify';

const Scoreboard = () => {
    const [players, setPlayers] = useState<teamClassPlayer[]>([]);
    const [idTeam, setIdTeam] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [modalChoseTeam, setModalChoseTeam] = useState<boolean>(false);
    const [modalDate, setModalDate] = useState<boolean>(false);

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


    async function setStartDate(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        let data: { [key: string]: string } = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        if(data.startDate == ''){
            toast.error("Insira uma data válida!")
        }else{
            await axios.startDate.set(data.startDate)
            toast.success("Data de início alterada com sucesso!")
            setModalDate(false)
        }
    }

    useEffect(() => {
        verifySession();
    }, [])

    useEffect(() => {

        getPlayers()
    }, [idTeam])

    function renderPlayers() {
        if (idTeam == 0) return <h2>Escolha um time</h2>
        if (players.length == 0) return <h2>Não há jogadores nesse time</h2>

        return (
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
                ))}
                </tbody>
            </table>
        );
    }

    return (
        <main>
            <ToastContainer
                theme="colored"
            />
            {modalChoseTeam && <ModalChoseTeam closeModal={handleChooseTeam} setChoseTeam={handleSetIdTeam} />}

            {modalDate && (
                <PopUp cancelcallback={() => setModalDate(false)} >
                    <div className={styles.modalDate}>
                        <button onClick={() => setModalDate(false)}><IoMdCloseCircle size="30" color="red" /></button>
                        <form onSubmit={setStartDate}>                        
                            <input type="datetime-local" name='startDate' />
                            <button>Enviar</button>
                        </form>
                    </div>
                </PopUp>)
            }
            
            <div className={styles.divlogoadm}>
                <div className={styles.logo}>
                    <button className={styles.calendar} onClick={() => setModalDate(true)}><FaCalendarAlt color='black' size="50" /></button>
                    <Link href={'/'}><Image src={logoIfootbal} title="ifootballLogo" placeholder='blur' alt="logo ifootbal" /></Link>
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
                        {renderPlayers()}
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
