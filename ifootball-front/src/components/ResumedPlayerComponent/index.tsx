'use client'
import { playerType } from '@/api/types';
import style from '../../../styles/resumedpc.module.scss';
import user from '../../app/squad/components/PlayerComponent/user_456212.png';
import Image from 'next/image';
import { useState } from 'react';
interface ResumedPlayerProps {
    player: playerType,
    className?: string
}
const ResumedPlayerCard = ({player, className} : ResumedPlayerProps) => {
    const [showOptions, setShowOptions] = useState<boolean>(false);
    return (
        <div className={`${style.playerCard} ${className}`} onClick={() => setShowOptions(true)}>
            <span>{player.name}</span>
            <div className={style.playerImage} style={{backgroundImage: `url('${user}')`}}>
                <Image alt='Player' src={user} width={35} height={35} quality={100} placeholder='blur' style={{borderRadius: '50%'}} />
            </div>
            {
                showOptions &&
                <div>
                    
                </div>
            }
        </div>
    );
}
export default ResumedPlayerCard;