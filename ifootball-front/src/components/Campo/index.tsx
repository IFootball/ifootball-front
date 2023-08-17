import { useState } from 'react';
import style from '../../../styles/campo.module.scss';
import { playerType } from '@/api/types';
import PopUp from '../PopUp';
import ListGoalkeepers from '../../app/squad/components/ListGoalkeepers';
import ListLinePlayers from '@/app/squad/components/ListLinePlayers';

type ListPlayersType = {
    list: boolean;
    type: 'player' | 'goalkeeper' | 'reserve';
};

export default function Campo({
    players,
    goalkeepers,
}: {
    players: playerType[];
    goalkeepers: playerType[];
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

    const handlePopupCancel = () => {
        setListPlayers({
            ...listPlayers,
            list: false,
        });
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
            <div className={style.reserves}>
                <h4>RESERVAS</h4>
                <div className={style.reservesArea}>
                    <div className={`${style.choosePlayer} ${style.r1}`} onClick={() => handleListPlayersClick('reserve')}>R</div>
                    <div className={`${style.choosePlayer} ${style.r2}`} onClick={() => handleListPlayersClick('reserve')}>R</div>
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
                        linePlayers={players}
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
                        linePlayers={players}
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
                    />
                </PopUp>
            )}
        </>
    );
}