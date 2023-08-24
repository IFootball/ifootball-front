import { playerType } from '@/api/types';
import style from '../../../../../styles/playercomponent.module.scss';
import DefaultButton from '@/components/DefaultButton';
import CONSTS from '../../../../api/constants.json';
import userIcon from './user_456212.png';
import Image from 'next/image';
interface playerProps {
    player: playerType,
    isCaptain?: boolean,
    addPlayer: (id: number) => void,
    dispensePlayer: (id: number) => void,
    setAsCaptain: (id: number) => void,
    unsetAsCaptain: (id: number) => void,
    squad: number[],
    gkId: number,
    isReserveChoose: boolean,
    reserves?: number[]
}
export default function PlayerComponent({ player, isCaptain = false, addPlayer, dispensePlayer, setAsCaptain, unsetAsCaptain, squad, gkId, isReserveChoose, reserves }: playerProps) {
    return (
        <>
            {
                !isReserveChoose &&
                <div className={style.playerCard}>
                    {/* <Image src={goalkeeper.image} alt={`${goalkeeper.name}-image`} quality={100} width={85} height={70} placeholder='blur' /> */}
                    <div className={style.leftPart}>
                        <Image src={userIcon} alt='userIcon' height={65} placeholder='blur' quality={100} />
                        {/* {
                            player.image !== 'string' || player.image ?
                            :
                            <img src={player.image} alt={`${player.name}-image`} />
                        } */}
                        <div className={style.playerInfos}>
                            <span>{player.name}</span>
                            <span>{player.className}</span>
                        </div>
                    </div>
                    <div className={style.playerConfigs}>
                        {
                            squad.includes(player.id) || (gkId === player.id) ?
                                <>
                                    {
                                        isCaptain ?
                                            <div className={`${style.captainButton} ${style.active}`} onClick={() => unsetAsCaptain(player.id)}>
                                                C
                                            </div>
                                            :
                                            <div className={style.captainButton} onClick={() => setAsCaptain(player.id)}>
                                                C
                                            </div>
                                    }
                                </>
                                :
                                <div />
                        }
                        {
                            ((player.playerType === CONSTS.playerTypes.lineplayer) && squad.includes(player.id)) || ((player.playerType === CONSTS.playerTypes.goalkeeper) && (gkId === player.id)) ?
                                <DefaultButton small dispensed text='DISPENSAR' action={dispensePlayer} />
                                :
                                ((player.playerType === CONSTS.playerTypes.lineplayer && squad.length < 4) || ((player.playerType === CONSTS.playerTypes.goalkeeper) && gkId === 0) ? <DefaultButton small text='ESCALAR' action={addPlayer} /> : <DefaultButton small text='ESCALAR' unactive />)
                        }
                    </div>
                </div>
            }
            {
                isReserveChoose && (!squad.includes(player.id) || gkId !== player.id) &&
                <div className={style.playerCard}>
                    {/* <Image src={goalkeeper.image} alt={`${goalkeeper.name}-image`} quality={100} width={85} height={70} placeholder='blur' /> */}
                    <div className={style.leftPart}>
                        <Image src={userIcon} alt='userIcon' height={65} placeholder='blur' quality={100} />
                        {/* {
                            player.image !== 'string' || player.image ?
                            :
                            <img src={player.image} alt={`${player.name}-image`} />
                        } */}
                        <div className={style.playerInfos}>
                            <span>{player.name}</span>
                            <span>{player.className}</span>
                        </div>
                    </div>
                    <div className={style.playerConfigs}>
                        <div />
                        {
                            reserves && ((player.playerType === CONSTS.playerTypes.lineplayer) && reserves.includes(player.id)) ?
                                <DefaultButton small dispensed text='DISPENSAR' action={dispensePlayer} />
                                :
                                reserves && ((player.playerType === CONSTS.playerTypes.lineplayer && reserves.length < 2) ? <DefaultButton small text='ESCALAR' action={addPlayer} /> : <DefaultButton small text='ESCALAR' unactive />)
                        }
                    </div>
                </div>
            }
        </>
    )
}