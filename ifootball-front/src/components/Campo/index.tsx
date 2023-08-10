'use client'
import { playerType } from '@/api/types';
import style from '../../../styles/campo.module.scss';
import { useState } from 'react';
type listPlayers = {
    list: boolean,
    type: 'player' | 'goalkeeper'
}
export default function Campo({ players, goalkeepers }: { players: playerType[], goalkeepers: playerType[] }) {
    const [listPlayers, setListPlayers] = useState<listPlayers>({
        list: false,
        type: 'goalkeeper'
    });
    const linePlayers = ['1', '2', '3', '4', '5'];
    return (
        <>
            <div className={style.field}>
                <div className={`${style.lateral} ${style.linha}`}>
                    <div className={`${style.linha} ${style.area} ${style.left}`}></div>
                    <div className={`${style.circulo} ${style.linha}`}></div>
                    <div className={`${style.linha} ${style.centro}`}></div>
                    <div className={`${style.linha} ${style.area} ${style.right}`}></div>
                </div>
                <div className={`${style.choosePlayer} ${style.b1}`} onClick={() => {
                    setListPlayers({
                        list: true,
                        type: 'goalkeeper'
                    });
                }}>J1</div>
                {/* {
                linePlayers.map((data) => {
                    return (
                        <div className={`${style.choosePlayer} ${`style.b` + data}`}>{`J${data}`}</div>            
                    )
                })
            } */}
                <div className={`${style.choosePlayer} ${style.b2}`} onClick={() => {
                    setListPlayers({
                        list: true,
                        type: 'player'
                    })
                }}>J2</div>
                <div className={`${style.choosePlayer} ${style.b3}`}>J3</div>
                <div className={`${style.choosePlayer} ${style.b4}`}>J4</div>
                <div className={`${style.choosePlayer} ${style.b5}`}>J5</div>
            </div>
            {
                listPlayers.list && listPlayers.type === 'goalkeeper' &&
                <div></div>
            }
        </>
    )
}