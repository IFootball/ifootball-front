'use client'
import { playerType } from '@/api/types';
import style from '../../../styles/resumedpc.module.scss';
import user from '../../app/squad/components/PlayerComponent/user_456212.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
interface ResumedPlayerProps {
    player: playerType,
    className?: string,
    isCaptain: boolean,
    dispensePlayer: (id: number) => void,
    setAsCaptain?: (id: number) => void,
    unsetAsCaptain: (id: number) => void,
    isReserve?: boolean
}

const ResumedPlayerCard = ({ player, className, isCaptain, dispensePlayer, setAsCaptain, unsetAsCaptain, isReserve }: ResumedPlayerProps) => {
    const userImage = player.image || user

    const [showOptions, setShowOptions] = useState<boolean>(false);
    useEffect(() => {
        if (showOptions) {
            const timeoutId = setTimeout(() => {
                setShowOptions(false);
            }, 5000);
            return () => clearTimeout(timeoutId);
        }
    }, [showOptions]);
    return (
        <div className={`${style.playerCard} ${className}`} style={isReserve ? {marginTop: '0'} : {}} onClick={() => setShowOptions(true)}>
            <span>{player.name} {isCaptain && <div className={`${style.captainButton} ${style.active} ${style.small}`} onClick={() => unsetAsCaptain(player.id)}>
                C
            </div>}</span>
            <div className={style.playerImage}>
                <Image alt='Player' src={userImage} width={35} height={35} quality={100} style={{ borderRadius: '50%' }} />
            </div>
            {
                showOptions &&
                <div className={style.playerActions} style={isReserve ? {justifyContent: 'center', alignItems: 'center'} : {}}>
                    {
                        !isReserve && setAsCaptain &&
                        <>
                            {
                                isCaptain ?
                                    <div className={`${style.captainButton} ${style.active}`} onClick={() => unsetAsCaptain(player.id)}>
                                        C
                                    </div>
                                    :
                                    <div className={style.captainButton} onClick={() => setAsCaptain(player.id) }>
                                        C
                                    </div>
                            }
                        </>
                    }
                    <div className={style.dispenseButton} onClick={() => dispensePlayer(player.id)}>
                        X
                    </div>
                </div>
            }
        </div>
    );
}
export default ResumedPlayerCard;