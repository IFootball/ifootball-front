import { playerType } from '@/api/types';
import style from '../../../../../styles/playercomponent.module.scss';
import DefaultButton from '@/components/DefaultButton';
interface playerProps {
    player: playerType,
    isCaptain?: boolean
}
export default function PlayerComponent({player, isCaptain = false}: playerProps) {
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
                    <div className={`${style.captainButton} ${style.active}`}>
                        C
                    </div>
                    :
                    <div className={style.captainButton}>
                        C
                    </div>
                }
                {
                    player.inSquad || player.id === 5 ?
                    <DefaultButton small dispensed text='DISPENSAR' />
                    :
                    <DefaultButton small text='ESCALAR' />
                }
            </div>
        </div>
    )
}