'use client';
import React, { useEffect, useState } from 'react';
import styles from '../../../../../styles/ranking.module.scss';
import Header from "@/components/Header";
import TabelaGolsF from '@/components/TabelaGolsF';
import CONSTS from '../../../../api/constants.json';
import api from '@/api';
import { point_fields_type } from '@/api/types';
import { useRouter } from 'next/navigation';
import { verifyTerms, verifyToken } from '@/api/functions';

export default function Home() {

    const [ranking, setRanking] = useState<point_fields_type[]>([]);

    const router = useRouter();

    const verifySession = (): boolean => {
    
        const token = verifyToken();
    
        if (token) {
            return true;
        } else {
            if (verifyTerms()) {
                router.push('/login');
            } else {
                router.push('/')
            }
            return false;
        }
    }

    const getGoals = async (genderId: number): Promise<boolean> => {
        const response = await api.ranking.goals(genderId);
        if (response) {
            setRanking(response.data);
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        verifySession();
        getGoals(CONSTS.genderIds.female);
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.homePage}>
                <Header />
                <div className={styles.homeUtil}>
                    <div className={styles.titulo}>
                        <h3>MAIORES ARTILHEIRAS</h3>
                    </div>
                    <div className={styles.ranking}>
                        <TabelaGolsF genderId={CONSTS.genderIds.female} mockRankingData={ranking} />
                    </div>
                </div>
                <div className={styles.voltar} onClick={() => router.back()}>VOLTAR</div>
            </div>
        </div>
    );
}
