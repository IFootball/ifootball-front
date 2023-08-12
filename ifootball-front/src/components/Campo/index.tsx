import { classes_type, playerType } from '@/api/types';
import style from '../../../styles/campo.module.scss';
import theme from '../../../styles/globals.module.scss';
import { useState } from 'react';
import PopUp from '../PopUp';
import DefaultButton from '../DefaultButton';
import Image from 'next/image';

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
                {/* {
                    linePlayers.map((data) => {
                        return (
                            <div className={`${style.choosePlayer} ${`style.b` + data}`}>
                                {`J${data}`}
                            </div>
                        );
                    })
                } */}
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
                    <div
                        className={style.squadPopUp}
                        style={{
                            backgroundColor: 'white',
                            height: '100%',
                            padding: '20px',
                            borderRadius: '12px',
                            border: '1px solid #000',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '5px'
                        }}
                    >
                        {goalkeepers.map((goalkeeper, index) => (
                            <div
                                style={{
                                    backgroundColor: theme.primaryGreen,
                                    width: '100%',
                                    height: '70px',
                                    boxShadow: '0px 4px 5px 0px rgba(0, 0, 0, 0.25);',
                                    display: 'flex'
                                }}
                                key={index}
                            >
                                {/* <Image src={goalkeeper.image} alt={`${goalkeeper.name}-image`} quality={100} width={85} height={70} placeholder='blur' /> */}
                                <img src={goalkeeper.image} alt={`${goalkeeper.name}-image`} />
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <p>{goalkeeper.name}</p>
                                    <p>
                                        {/* {classes.map((data) => {
                                            if (data.id === goalkeeper.idTeamClass) {
                                                return data.name
                                            }
                                        })} */}
                                    </p>
                                </div>
                            </div>
                        ))}
                        <DefaultButton
                            text='VOLTAR'
                            bold
                            action={() => {
                                setListPlayers({
                                    ...listPlayers,
                                    list: false
                                });
                                return false;
                            }}
                        />
                    </div>
                </PopUp>
            )}
        </>
    );
}