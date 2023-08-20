import { useState } from 'react';
import style from '../../../styles/campo.module.scss';
import { playerType } from '@/api/types';
import PopUp from '../PopUp';
import ListGoalkeepers from '../../app/squad/components/ListGoalkeepers';
import ListLinePlayers from '@/app/squad/components/ListLinePlayers';
import DefaultButton from '../DefaultButton';
import api from '@/api';

type ListPlayersType = {
    list: boolean;
    type: 'player' | 'goalkeeper' | 'reserve';
};

export default function Campo({
    players,
    goalkeepers,
    genderId,
}: {
    players: playerType[];
    goalkeepers: playerType[];
    genderId: number
}) {
    const [captain, setCaptain] = useState<number>(0);
    const [listPlayers, setListPlayers] = useState<ListPlayersType>({
        list: false,
        type: 'goalkeeper',
    });

    const [gkId, setGkId] = useState<number>(0);
    const [linePlayers, setLinePlayers] = useState<number[]>([]);
    const [reservePlayers, setReservePlayers] = useState<number[]>([]);

    const addGkId = (id: number) => {
        setGkId(id);
    };

    const unsetGkId = () => {
        setGkId(0);
    };

    const setAsCaptain = (id: number) => {
        setCaptain(id);
    };

    const unsetAsCaptain = () => {
        setCaptain(0);
    };

    const addPlayer = (id: number, isReserve: boolean) => {
        if (isReserve) {
            addReservePlayer(id);
        } else {
            setLinePlayers((prevState) => [...prevState, id]);
        }
    };

    const removeLinePlayer = (id: number) => {
        setLinePlayers((prevState) => prevState.filter((playerId) => playerId !== id));
        if (captain === id) {
            unsetAsCaptain();
        }
    };

    const addReservePlayer = (id: number) => {
        if (!reservePlayers.includes(id)) {
            if (reservePlayers.length < 2) {
                setReservePlayers((prevReserves) => [...prevReserves, id]);
            } else {
                console.log('Você já adicionou o máximo de jogadores reservas.');
            }
        }
    };

    const removeReservePlayer = (id: number) => {
        setReservePlayers((prevReserves) => prevReserves.filter((playerId) => playerId !== id));
    };

    const handleListPlayersClick = (type: 'player' | 'goalkeeper' | 'reserve') => {
        setListPlayers({
            list: true,
            type,
        });
    };

    const getPossiblePlayers = () => {
        let pPlayers: playerType[] = []
        players.forEach((player) => {
            if (!reservePlayers.includes(player.id)) pPlayers.push(player);
        })
        return pPlayers;
    }
    const getPossibleReserves = () => {
        let reserves: playerType[] = []
        players.forEach((player) => {
            if (!linePlayers.includes(player.id)) reserves.push(player);
        })
        console.log(reservePlayers)
        return reserves;

    }

    const isValidTeam = () => gkId > 0 && linePlayers.length === 4 && reservePlayers.length === 2;

    const sendTeam = async (genderId: number): Promise<boolean> => {
        if (isValidTeam()) {
            const response = await api.team.save(
                gkId,
                linePlayers[3], linePlayers[2], linePlayers[1], linePlayers[0],
                reservePlayers[1], reservePlayers[0],
                captain,
                genderId
            );
            const { error, simpleTeamUser } = response;
            if (error?.statusCode === 200 || error?.statusCode === 201) {
                const {
                    idPlayerOne,
                    idPlayerTwo,
                    idPlayerThree,
                    idPlayerFour,
                    idCaptain,
                    idReservePlayerOne,
                    idReservePlayerTwo,
                } = simpleTeamUser;
                setLinePlayers([
                    idPlayerOne,
                    idPlayerTwo,
                    idPlayerThree,
                    idPlayerFour,
                ]);
                setCaptain(idCaptain);
                setReservePlayers([idReservePlayerOne, idReservePlayerTwo]);
                return true;
            } else {
                alert(error?.message);
            }
        } else {
            alert(
                "Você deve escalar o time completo, definindo um capitão e dois reservas para escalar o time!"
            );
            return false;
        }
        return false;
    };

    return (
        <>
            <div className={style.field}>
                <div className={`${style.lateral} ${style.linha}`}>
                    <div className={`${style.linha} ${style.area} ${style.left}`}></div>
                    <div className={`${style.circulo} ${style.linha}`}></div>
                    <div className={`${style.linha} ${style.centro}`}></div>
                    <div className={`${style.linha} ${style.area} ${style.right}`}></div>
                </div>
                <div className={`${style.choosePlayer} ${style.b1}`} onClick={() => handleListPlayersClick('goalkeeper')}>J1</div>
                <div className={`${style.choosePlayer} ${style.b2}`} onClick={() => handleListPlayersClick('player')}>J2</div>
                <div className={`${style.choosePlayer} ${style.b3}`} onClick={() => handleListPlayersClick('player')}>J3</div>
                <div className={`${style.choosePlayer} ${style.b4}`} onClick={() => handleListPlayersClick('player')}>J4</div>
                <div className={`${style.choosePlayer} ${style.b5}`} onClick={() => handleListPlayersClick('player')}>J5</div>
            </div>

            <div className={style.teamActions}>
                <div className={style.reserves}>
                    <h4>RESERVAS</h4>
                    <div className={style.reservesArea}>
                        <div className={`${style.choosePlayer} ${style.r1}`} onClick={() => handleListPlayersClick('reserve')}>R</div>
                        <div className={`${style.choosePlayer} ${style.r2}`} onClick={() => handleListPlayersClick('reserve')}>R</div>
                    </div>
                </div>
                <div className={style.buttons}>
                    <DefaultButton text='CONFIRMAR' action={() => { sendTeam(genderId) }} />
                    <DefaultButton text='CANCELAR' dispensed action={() => {
                        unsetAsCaptain();
                        setLinePlayers([]);
                        setReservePlayers([]);
                        unsetGkId()
                    }} />
                </div>
            </div>
            {listPlayers.list && listPlayers.type === 'goalkeeper' && (
                <PopUp
                    cancelcallback={() => {
                        setListPlayers({
                            ...listPlayers,
                            list: false,
                        });
                    }}
                >
                    <ListGoalkeepers
                        captainId={captain}
                        goalkeepers={goalkeepers}
                        callbackAction={() => {
                            setListPlayers({
                                ...listPlayers,
                                list: false,
                            });
                            return false;
                        }}
                        addPlayerAction={(id: number) => addGkId(id)}
                        dispensePlayerAction={() => unsetGkId()}
                        gkId={gkId}
                        squad={linePlayers}
                        setAsCaptainAction={(id: number) => setCaptain(id)}
                        unsetAsCaptainAction={() => unsetAsCaptain()}
                    />
                </PopUp>
            )}
            {listPlayers.list && listPlayers.type === 'player' && (
                <PopUp
                    cancelcallback={() => {
                        setListPlayers({
                            ...listPlayers,
                            list: false,
                        });
                    }}
                >
                    <ListLinePlayers
                        captainId={captain}
                        setAsCaptainAction={(id: number) => setAsCaptain(id)}
                        unsetAsCaptainAction={(id: number) => unsetAsCaptain()}
                        linePlayers={getPossiblePlayers()}
                        callbackAction={() => {
                            setListPlayers({
                                ...listPlayers,
                                list: false,
                            });
                            return false;
                        }}
                        addPlayerAction={(id: number) => addPlayer(id, false)}
                        dispensePlayerAction={(id: number) => removeLinePlayer(id)}
                        gkId={gkId}
                        squad={linePlayers}
                        isReserve={false}
                        reserves={reservePlayers}
                    />
                </PopUp>
            )}
            {listPlayers.list && listPlayers.type === 'reserve' && (
                <PopUp
                    cancelcallback={() => {
                        setListPlayers({
                            ...listPlayers,
                            list: false,
                        });
                    }}
                >
                    <ListLinePlayers
                        captainId={captain}
                        setAsCaptainAction={(id: number) => setAsCaptain(id)}
                        unsetAsCaptainAction={(id: number) => unsetAsCaptain()}
                        linePlayers={getPossibleReserves()}
                        callbackAction={() => {
                            setListPlayers({
                                ...listPlayers,
                                list: false,
                            });
                            return false;
                        }}
                        addPlayerAction={(id: number) => addPlayer(id, true)}
                        dispensePlayerAction={(id: number) => removeReservePlayer(id)}
                        gkId={gkId}
                        squad={reservePlayers}
                        isReserve
                        reserves={reservePlayers}
                    />
                </PopUp>
            )}
        </>
    );
}
