import { classes_type, playerType } from '@/api/types';
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
    classes
}: {
    players: playerType[],
    goalkeepers: playerType[],
    classes: classes_type[]
}) {
    const [listPlayers, setListPlayers] = useState<listPlayers>({
        list: false,
        type: 'goalkeeper'
    });

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
                    }} />
                </PopUp>
            )}
        </>
    );
}