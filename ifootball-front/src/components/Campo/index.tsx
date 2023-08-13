import { playerType } from '@/api/types';
import style from '../../../styles/campo.module.scss';
import { useState } from 'react';
import PopUp from '../PopUp';
import ListPlayers from '../../app/squad/components/ListGoalkeepers';
import ListGoalkeepers from '../../app/squad/components/ListGoalkeepers';

type listPlayers = {
    list: boolean,
    type: 'player' | 'goalkeeper'
};

export default function Campo({
    players,
    goalkeepers,
}: {
    players: playerType[],
    goalkeepers: playerType[],
}) {
    const [listPlayers, setListPlayers] = useState<listPlayers>({
        list: false,
        type: 'goalkeeper'
    });

    const [gkId, setGkId] = useState<number>(0);

    const addGkId = (id: number) => {
        setGkId(id);
    }

    const unsetGkId = (id: number) => {
        setGkId(id)
    }

    const squad: number[] = [];

    return (
        <>
            <div className={style.field}>
                <div className={`${style.lateral} ${style.linha}`}>
                    <div className={`${style.linha} ${style.area} ${style.left}`}></div>
                    <div className={`${style.circulo} ${style.linha}`}></div>
                    <div className={`${style.linha} ${style.centro}`}></div>
                    <div className={`${style.linha} ${style.area} ${style.right}`}></div>
                </div>
                <div
                    className={`${style.choosePlayer} ${style.b1}`}
                    onClick={() => {
                        setListPlayers({
                            list: true,
                            type: 'goalkeeper'
                        });
                    }}
                >
                    J1
                </div>
                <div
                    className={`${style.choosePlayer} ${style.b2}`}
                    onClick={() => {
                        setListPlayers({
                            list: true,
                            type: 'player'
                        });
                    }}
                >
                    J2
                </div>
                <div className={`${style.choosePlayer} ${style.b3}`}>J3</div>
                <div className={`${style.choosePlayer} ${style.b4}`}>J4</div>
                <div className={`${style.choosePlayer} ${style.b5}`}>J5</div>
            </div>
            {listPlayers.list && listPlayers.type === 'goalkeeper' && (
                <PopUp
                    cancelcallback={() => {
                        setListPlayers({
                            ...listPlayers,
                            list: false
                        });
                    }}
                >
                    <ListGoalkeepers goalkeepers={goalkeepers} callbackAction={() => {
                        setListPlayers({
                            ...listPlayers,
                            list: false
                        });
                        return false;
                    }} addPlayerAction={(id: number) => setGkId(id)} dispensePlayerAction={(id: number) => unsetGkId(0)} gkId={gkId} squad={squad} />
                </PopUp>
            )}
        </>
    );
}