'use client';
import React, { useEffect, useState } from 'react';
import styles from '../../../../../styles/ranking.module.scss';
import Header from "@/components/Header";
import Tabela from '@/components/Tabela';
import CONSTS from '../../../../api/constants.json';
import api from '@/api';
import { point_fields_type } from '@/api/types';
import { useRouter } from 'next/navigation';
import { verifySession } from '@/api/functions';

export default function Home() {

    const [ranking, setRanking] = useState<point_fields_type[]>([]);

    const router = useRouter();

    const getScores = async (genderId: number): Promise<boolean> => {
        const response = await api.ranking.scores(genderId);
        if (response) {
            setRanking(response.data);
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        verifySession();
        getScores(CONSTS.genderIds.female);
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.homePage}>
                <Header />
                <div className={styles.homeUtil}>
                    <div className={styles.titulo}>
                        <h3>MELHORES JOGADORAS</h3>
                    </div>
                    <div className={styles.ranking}>
                        <Tabela genderId={CONSTS.genderIds.female} mockRankingData={ranking} />
                    </div>
                </div>
                <div className={styles.voltar} onClick={() => router.back()}>VOLTAR</div>
            </div>
        </div>
    );
}
