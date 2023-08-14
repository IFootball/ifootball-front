import { playerType } from '@/api/types';
import style from '../../../../../styles/playercomponent.module.scss';
import DefaultButton from '@/components/DefaultButton';
import CONSTS from '../../../../api/constants.json';
interface playerProps {
    player: playerType,
    isCaptain?: boolean,
    addPlayer: (id: number) => void,
    dispensePlayer: (id: number) => void,
    setAsCaptain: (id: number) => void,
    unsetAsCaptain: (id: number) => void,
    squad: number[],
    gkId: number
}
export default function PlayerComponent({ player, isCaptain = false, addPlayer, dispensePlayer, setAsCaptain, unsetAsCaptain, squad, gkId }: playerProps) {
    return (
        <div className={style.playerCard}>
            {/* <Image src={goalkeeper.image} alt={`${goalkeeper.name}-image`} quality={100} width={85} height={70} placeholder='blur' /> */}
            <div className={style.leftPart}>
                <img src={player.image} alt={`${player.name}-image`} />
                <div className={style.playerInfos}>
                    <span>{player.name}</span>
                    <span>{player.className}</span>
                </div>
            </div>
            <div className={style.playerConfigs}>
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
                {
                    ((player.playerType === CONSTS.playerTypes.lineplayer) && squad.includes(player.id)) || ((player.playerType === CONSTS.playerTypes.goalkeeper) && (gkId === player.id)) ?
                        <DefaultButton small dispensed text='DISPENSAR' action={dispensePlayer} />
                        :
                        ((player.playerType === CONSTS.playerTypes.lineplayer && squad.length <= 4) || ((player.playerType === CONSTS.playerTypes.goalkeeper) && gkId === 0) ? <DefaultButton small text='ESCALAR' action={addPlayer} /> : <DefaultButton small text='ESCALAR' unactive />)
                }
            </div>
        </div>
    )
}