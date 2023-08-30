import { useEffect, useState } from 'react';
import style from '../../../styles/campo.module.scss';
import { playerType } from '@/api/types';
import PopUp from '../PopUp';
import ListGoalkeepers from '../../app/squad/components/ListGoalkeepers';
import ListLinePlayers from '@/app/squad/components/ListLinePlayers';
import DefaultButton from '../DefaultButton';
import api from '@/api';
import ResumedPlayerCard from '../ResumedPlayerComponent';
import user from '../../app/squad/components/PlayerComponent/user_456212.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ErroCard } from '../erroCard';
import {IoMdCloseCircle} from "react-icons/io"

type ListPlayersType = {
    list: boolean;
    type: 'player' | 'goalkeeper' | 'reserve';
};

export default function Campo({
    players,
    goalkeepers,
    genderId,
    squad,
    goalkeeperId,
    captainId,
    userReserves
}: {
    players: playerType[];
    goalkeepers: playerType[];
    genderId: number,
    squad: number[],
    goalkeeperId: number,
    captainId: number,
    userReserves: number[]
}) {
    const [captain, setCaptain] = useState<number>(0);
    const [listPlayers, setListPlayers] = useState<ListPlayersType>({
        list: false,
        type: 'goalkeeper',
    });

    const [modalError, setModalError] = useState<boolean>(false);
    const [error, setError] = useState<string>("false");
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

    const getPlayer = (playerId: number): playerType => {
        const player = players.find(player => playerId === player.id);
        const defaultPlayer: playerType = { id: 0, idGender: genderId, idTeamClass: 0, image: user, name: "Jogador", playerType: 1, className: 'Classe' }
        return player || defaultPlayer;
    }

    const getGoalkeeper = (gkId: number): playerType => {
        const gk = goalkeepers.find(g => g.id === gkId);
        const defaultGoalkeeper: playerType = { id: 0, idGender: genderId, idTeamClass: 0, image: user, name: "Jogador", playerType: 0, className: 'Classe' }
        return gk || defaultGoalkeeper
    }

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
        return reserves;
    }

    const isValidTeam = () => gkId > 0 && linePlayers.length === 4 && reservePlayers.length === 2;

    const sendTeam = async (genderId: number): Promise<boolean> => {
        if (isValidTeam()) {

            try{
                await api.team.save(
                    gkId,
                    linePlayers[3], linePlayers[2], linePlayers[1], linePlayers[0],
                    reservePlayers[1], reservePlayers[0],
                    captain,
                    genderId
                );
                toast.success("Time criado com sucesso!")
                setError("")
            } catch(error){
                setModalError(true);
                setError(error.response?.data);
            }
        } else {
            setModalError(true);
            setError("Você deve escalar o time completo, definindo um capitão e dois reservas para escalar o time!");
        }
    };

    useEffect(() => {
        setCaptain(captainId);
        setLinePlayers(squad);
        setReservePlayers(userReserves);
        setGkId(goalkeeperId)
    }, [captainId, squad, userReserves, goalkeeperId])

    return (
        <>
            <div className={style.field}>
                <ToastContainer
                theme="colored"
                />
                <div className={`${style.lateral} ${style.linha}`}>
                    <div className={`${style.linha} ${style.area} ${style.left}`}></div>
                    <div className={`${style.circulo} ${style.linha}`}></div>
                    <div className={`${style.linha} ${style.centro}`}></div>
                    <div className={`${style.linha} ${style.area} ${style.right}`}></div>
                </div>
                {
                    gkId > 0 ?
                        <ResumedPlayerCard isCaptain={captain === gkId} dispensePlayer={unsetGkId} setAsCaptain={() => setAsCaptain(gkId)} unsetAsCaptain={() => unsetAsCaptain()} className={style.b1} player={getGoalkeeper(gkId)} />
                        :
                        <div className={`${style.choosePlayer} ${style.b1}`} onClick={() => handleListPlayersClick('goalkeeper')}>J1</div>
                }
                {
                    linePlayers[0] ?
                        <ResumedPlayerCard isCaptain={captain === linePlayers[0]} setAsCaptain={() => setAsCaptain(linePlayers[0])} unsetAsCaptain={() => unsetAsCaptain()} dispensePlayer={() => removeLinePlayer(linePlayers[0])} className={style.b2} player={getPlayer(linePlayers[0])} />
                        :
                        <div className={`${style.choosePlayer} ${style.b2}`} onClick={() => handleListPlayersClick('player')}>J2</div>
                }
                {
                    linePlayers[1] ?
                        <ResumedPlayerCard isCaptain={captain === linePlayers[1]} setAsCaptain={() => setAsCaptain(linePlayers[1])} unsetAsCaptain={() => unsetAsCaptain()} dispensePlayer={() => removeLinePlayer(linePlayers[1])} className={style.b3} player={getPlayer(linePlayers[1])} />
                        :
                        <div className={`${style.choosePlayer} ${style.b3}`} onClick={() => handleListPlayersClick('player')}>J3</div>
                }
                {
                    linePlayers[2] ?
                        <ResumedPlayerCard isCaptain={captain === linePlayers[2]} setAsCaptain={() => setAsCaptain(linePlayers[2])} unsetAsCaptain={() => unsetAsCaptain()} dispensePlayer={() => removeLinePlayer(linePlayers[2])} className={style.b4} player={getPlayer(linePlayers[2])} />
                        :
                        <div className={`${style.choosePlayer} ${style.b4}`} onClick={() => handleListPlayersClick('player')}>J4</div>
                }
                {
                    linePlayers[3] ?
                        <ResumedPlayerCard isCaptain={captain === linePlayers[3]} setAsCaptain={() => setAsCaptain(linePlayers[3])} unsetAsCaptain={() => unsetAsCaptain()} dispensePlayer={() => removeLinePlayer(linePlayers[3])} className={style.b5} player={getPlayer(linePlayers[3])} />
                        :
                        <div className={`${style.choosePlayer} ${style.b5}`} onClick={() => handleListPlayersClick('player')}>J5</div>
                }
            </div>

            <div className={style.teamActions}>
                <div className={style.reserves}>
                    <h4 className={style.reservasBot}>RESERVAS</h4>
                    <div className={style.reservesArea}>
                        {
                            reservePlayers[0] ?
                                <ResumedPlayerCard isCaptain={captain === reservePlayers[0]} isReserve unsetAsCaptain={() => unsetAsCaptain()} dispensePlayer={() => removeReservePlayer(reservePlayers[0])} className={style.r1} player={getPlayer(reservePlayers[0])} />
                                :
                                <div className={`${style.choosePlayer} ${style.r1}`} onClick={() => handleListPlayersClick('reserve')}>R</div>
                        }
                        {
                            reservePlayers[1] ?
                                <ResumedPlayerCard isCaptain={captain === reservePlayers[1]} isReserve unsetAsCaptain={() => unsetAsCaptain()} dispensePlayer={() => removeReservePlayer(reservePlayers[1])} className={style.r2} player={getPlayer(reservePlayers[1])} />
                                :
                                <div className={`${style.choosePlayer} ${style.r2}`} onClick={() => handleListPlayersClick('reserve')}>R</div>
                        }
                    </div>
                </div>
                <div className={style.buttons}>
                    <DefaultButton text='CONFIRMAR' action={() => { sendTeam(genderId) }} />
                    <DefaultButton text='LIMPAR' dispensed action={() => {
                        unsetAsCaptain();
                        setLinePlayers([]);
                        setReservePlayers([]);
                        unsetGkId()
                    }} />
                </div>
            </div>

            {modalError && (
                <PopUp cancelcallback={() => setModalError(false)} >
                    <div className={style.modalError}>
                        <div>                        
                            <IoMdCloseCircle size="30" color="red" /><ErroCard>{error}</ErroCard>
                        </div>
                            <DefaultButton
                                text='VOLTAR'
                                bold
                                action={() => setModalError(false)}
    />                    </div>
                </PopUp>)
            }
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
