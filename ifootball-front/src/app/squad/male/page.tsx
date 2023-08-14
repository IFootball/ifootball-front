'use client'
import Header from '../../../components/Header';
import styles from '../../../../styles/malepage.module.scss';
import { useEffect, useState } from 'react';
import { verifyToken } from '@/api/functions';
import { useRouter } from 'next/navigation';
import Campo from '@/components/Campo';
import { playerType } from '@/api/types';
import api from '@/api';
import CONSTS from '../../../api/constants.json';
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
        const response = await api.players.list(50, CONSTS.genderIds.male, CONSTS.playerTypes.goalkeeper);
        if (response) {
            setGoalkeepers(response.data);
            return true;
        }
        return false;
    }

    const listLinePlayers = async (): Promise<boolean> => {
        const response = await api.players.list(200, CONSTS.genderIds.male, CONSTS.playerTypes.lineplayer);
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
        console.log("JOGADORES: " + JSON.stringify(players), "GOLEIROS: " + JSON.stringify(goalkeepers))
    }, [])
    return (
        <div className={styles.maleSquadPage}>
            <Header />
            <h2>MONTE SEU TIME!</h2>
            <Campo goalkeepers={goalkeepers} players={players} />
        </div>
    )
}