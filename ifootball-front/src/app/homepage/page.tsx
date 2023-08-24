'use client'
import React, { useEffect, useState } from "react";
import styles from "../../../styles/home.module.scss";
import Header from "@/components/Header";
import GlobalCard from "@/components/globalCard";
import Link from "next/link";
import DefaultButton from "@/components/DefaultButton";
import { verifyToken } from "@/api/functions";
import { useRouter } from "next/navigation";
import { point_fields_type } from "@/api/types";
import api from "@/api";
import CONSTS from '../../api/constants.json';

export default function Home() {
    const now = new Date();
    const marketEnds = new Date('October 09, 2023 23:59:59')
    const router = useRouter();

    const verifySession = (): boolean => {
        const token = verifyToken();

        if (token) {
            return true;
        } else {
            router.push('/');
            return false;
        }
    }

    const [ranking, setRanking] = useState<point_fields_type[]>([]);

    const loadTopThree = async (genderId: number): Promise<boolean> => {
        const response = await api.ranking.highestScores(genderId, 1, 3);
        if (response) {
            setRanking(response.data);
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        verifySession();
        loadTopThree(CONSTS.genderIds.male);
    }, [])

    return (
        <div className={styles.HomePage}>
            <Header />
            <div className={styles.homeUtil}>
                <div className={styles.relogioUtil}>
                    <div className={styles.relogio}>
                        <h3>ESCALAÇÃO DE TIMES FECHA EM</h3>
                        <span>{marketEnds.getDate()}/{marketEnds.getMonth() + 1} - {marketEnds.getHours()}:{marketEnds.getMinutes()}</span>
                    </div>
                </div>
                <div className={styles.homeCardsArea}>
                    <GlobalCard>
                        <div className={styles.time}>
                            <h1 className={styles.titulo}>{verifyToken()?.name}</h1>
                            <div className={styles.pontuacaoUsuario}>
                                <h5 className={styles.subtitulo}>Pontuação:</h5>
                                <span className={styles.points}>XX.XX</span>
                            </div>

                            <div className={styles.buttons}>
                                <Link href={'squad/male'}>
                                    <DefaultButton text="Time Masculino" />
                                </Link>
                                <Link href={'squad/female'}>
                                    <DefaultButton text="Time Feminino" />
                                </Link>
                            </div>
                        </div>
                    </GlobalCard>

                    <GlobalCard>
                        <div className={styles.pontuacao}>
                            <h1 className={styles.titulo}>Pontuação</h1>
                            <h5 className={styles.subtitulo}>Top 3 Times:</h5>
                            <table>
                                <tbody>
                                    {
                                        ranking.map((user, index) => {
                                            return (
                                                <tr>
                                                    <td className={styles.tableField}>{user.name}</td>
                                                    <td>{user.score}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <div className={styles.buttons}>
                                <DefaultButton text="Ver mais" />
                            </div>
                        </div>
                    </GlobalCard>
                </div>
            </div>
        </div>
    );
}
