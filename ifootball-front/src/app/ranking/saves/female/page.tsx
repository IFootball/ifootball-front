'use client';
import React, { useEffect, useState } from 'react';
import styles from '../../../../../styles/ranking.module.scss';
import Header from "@/components/Header";
import Tabela from '@/components/Tabela';
import CONSTS from '../../../../api/constants.json';
import api from '@/api';
import { point_fields_type } from '@/api/types';
import { useRouter } from 'next/navigation';
import { verifyTerms, verifyToken } from '@/api/functions';
import TabelaSavesF from '@/components/TabelaSavesF';

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

    const getSaves = async (genderId: number): Promise<boolean> => {
        const response = await api.ranking.saves(genderId);
        if (response) {
            setRanking(response.data);
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        verifySession();
        getSaves(CONSTS.genderIds.female);
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.homePage}>
                <Header />
                <div className={styles.homeUtil}>
                    <div className={styles.titulo}>
                        <h3>MELHORES GOLEIRAS</h3>
                    </div>
                    <div className={styles.ranking}>
                        <TabelaSavesF genderId={CONSTS.genderIds.female} mockRankingData={ranking} />
                    </div>
                </div>
                <div className={styles.voltar} onClick={() => router.back()}>VOLTAR</div>
            </div>
        </div>
    );
}
