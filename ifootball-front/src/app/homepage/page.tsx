'use client'
import React, { useEffect, useState } from "react";
import styles from "../../../styles/home.module.scss";
import Header from "@/components/Header";
import GlobalCard from "@/components/globalCard";
import Link from "next/link";
import DefaultButton from "@/components/DefaultButton";
import { splitName, verifyToken } from "@/api/functions";
import { useRouter } from "next/navigation";
import { point_fields_type } from "@/api/types";
import api from "@/api";
import CONSTS from '../../api/constants.json';

export default function Home() {
    const now = new Date();
    const marketEnds = new Date('October 09, 2023 23:59:59')
    const router = useRouter();

    const [userData, setUserData] = useState<{
        name: string,
        scoreMale: number,
        scoreFemale: number
    }>({
        name: verifyToken()?.name ?? '',
        scoreFemale: 0,
        scoreMale: 0
    })

    const verifySession = (): boolean => {
        const token = verifyToken();

        if (token) {
            return true;
        } else {
            router.push('/');
            return false;
        }
    }

    const getUserData = async (): Promise<boolean> => {
        const response = await api.authentication.getUserData();
        if (!response.error) {
            setUserData(response.userLoged);
            return true;
        }
        return false;
    }

    const [rankingM, setRankingM] = useState<point_fields_type[]>([]);
    const [rankingF, setRankingF] = useState<point_fields_type[]>([]);

    const loadTopThree = async (): Promise<boolean> => {
        const responseM = await api.ranking.highestScores(CONSTS.genderIds.male, 1, 3);
        const responseF = await api.ranking.highestScores(CONSTS.genderIds.female, 1, 3);
        if (responseM && responseF) {
            setRankingM(responseM.data);
            setRankingF(responseF.data);
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        verifySession();
        getUserData();
        loadTopThree();
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
                            <h1 className={styles.titulo}>{userData.name}</h1>
                            <div style={{display: 'flex'}}>
                                <div className={styles.pontuacaoUsuario}>
                                    <h5 className={styles.subtitulo}>Pontuação M:</h5>
                                    <span className={styles.points}>{userData.scoreMale.toFixed(2)}</span>
                                </div>

                                <div className={styles.pontuacaoUsuario}>
                                    <h5 className={styles.subtitulo}>Pontuação F:</h5>
                                    <span className={styles.points}>{userData.scoreFemale.toFixed(2)}</span>
                                </div>
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
                            <h1 className={styles.titulo}>PONTUAÇÃO F</h1>
                            <h5 className={styles.subtitulo}>TOP 3 TIMES:</h5>
                            <table>
                                <tbody>
                                    {
                                        rankingF.map((user, index) => {
                                            return (
                                                <tr>
                                                    <td className={styles.tableField}>{splitName(user.name)}</td>
                                                    <td>{user.score} pontos</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <div className={styles.buttons}>
                                <Link href={'/ranking/teams/female'}><DefaultButton text="Ver mais" /></Link>
                            </div>
                        </div>
                    </GlobalCard>
                    <GlobalCard>
                        <div className={styles.pontuacao}>
                            <h1 className={styles.titulo}>PONTUAÇÃO M</h1>
                            <h5 className={styles.subtitulo}>TOP 3 TIMES:</h5>
                            <table>
                                <tbody>
                                    {
                                        rankingM.map((user, index) => {
                                            return (
                                                <tr>
                                                    <td className={styles.tableField}>{splitName(user.name)}</td>
                                                    <td>{user.score} pontos</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <div className={styles.buttons}>
                                <Link href={'/ranking/teams/male'}><DefaultButton text="Ver mais" /></Link>
                            </div>
                        </div>
                    </GlobalCard>

                </div>
            </div>
        </div>
    );
}
