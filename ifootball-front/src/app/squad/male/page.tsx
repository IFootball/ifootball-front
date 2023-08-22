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

    const [userGoalkeeper, setUserGoalkeeper] = useState<number>(0);
    const [userTeam, setUserTeam] = useState<number[]>([]);
    const [userReserves, setUserReserves] = useState<number[]>([]);
    const [userCaptain, setUserCaptain] = useState<number>(0);
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

    const loadUserTeam = async (): Promise<boolean> => {
        try {
            const response = await api.team.get(CONSTS.genderIds.male);
            if (!response.error) {
                const { completeTeamUser } = response;
                const { idCaptain, goalkeeper, linePlayerOne, linePlayerTwo, linePlayerThree, linePlayerFour, reservePlayerOne, reservePlayerTwo } = completeTeamUser;
                setUserCaptain(idCaptain);
                setUserGoalkeeper(goalkeeper.id);
                setUserTeam([linePlayerOne.id, linePlayerTwo.id, linePlayerThree.id, linePlayerFour.id]);
                setUserReserves([reservePlayerOne.id, reservePlayerTwo.id]);   
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("An error occurred while loading user team: ", error);
            return false;
        }
    };

    useEffect(() => {
        listGoalkeepers();
        listLinePlayers();
        verifySession();
        loadUserTeam();
    }, [])
    return (
        <div className={styles.maleSquadPage}>
            <Header />
            <h2>MONTE SEU TIME!</h2>
            <Campo genderId={CONSTS.genderIds.male} goalkeepers={goalkeepers} players={players} captainId={userCaptain} goalkeeperId={userGoalkeeper} squad={userTeam} userReserves={userReserves} />
        </div>
    )
}