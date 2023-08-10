'use client'
import Header from '../../../components/Header';
import styles from '../../../../styles/malepage.module.scss';
import { useEffect, useState } from 'react';
import { verifyToken } from '@/api/functions';
import { useRouter } from 'next/navigation';
import Campo from '@/components/Campo';
import { playerType } from '@/api/types';
import api from '@/api';
export default function Male() {
    const [goalkeepers, setGoalkeepers] = useState<playerType[]>([]);
    const [players, setPlayers] = useState<playerType[]>([]);
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

    const listGoalkeepers = async (): Promise<boolean> => {
        const response = await api.players.male.goalkeeper.list(50);
        if (response) {
            setGoalkeepers(response.data);
            return true;
        }
        return false;
    }

    const listLinePlayers = async (): Promise<boolean> => {
        const response = await api.players.male.line.list(200);
        if (response) {
            setPlayers(response.data);
            return true;
        }
        return false;
    }

    useEffect(() => {
        listGoalkeepers();
        listLinePlayers();
        verifySession();
    }, [])
    return (
        <div className={styles.maleSquadPage}>
            <Header />
            <h2>MONTE SEU TIME!</h2>
            <Campo goalkeepers={goalkeepers} players={players} />
        </div>
    )
}