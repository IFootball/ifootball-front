'use client';
import React, { useEffect, useState } from 'react';
import styles from '../../../../../styles/ranking.module.scss';
import Header from "@/components/Header";
import Tabela from '@/components/Tabela';
import CONSTS from '../../../../api/constants.json';
import api from '@/api';
import { point_fields_type } from '@/api/types';

export default function Home() {

    const [ranking, setRanking] = useState<point_fields_type[]>([]);

    const getAssists = async (genderId: number): Promise<boolean> => {
        const response = await api.ranking.goals(genderId);
        if (response) {
            setRanking(response.data);
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        getAssists(CONSTS.genderIds.female);
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.homePage}>
                <Header />
                <div className={styles.homeUtil}>
                    <div className={styles.titulo}>
                        <h3>MAIORES ARTILHEIROS</h3>
                    </div>
                    <div className={styles.ranking}>
                        <Tabela genderId={CONSTS.genderIds.female} mockRankingData={ranking} />
                    </div>
                </div>
                <div className={styles.voltar}>VOLTAR</div>
            </div>
        </div>
    );
}
