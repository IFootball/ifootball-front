import { playerType } from '@/api/types';
import style from '../../../../../styles/listplayers.module.scss';
import DefaultButton from '@/components/DefaultButton';
import PlayerComponent from '../PlayerComponent';
interface listPlayersProps {
    linePlayers: playerType[],
    callbackAction: () => boolean,
    addPlayerAction: (id: number) => void,
    dispensePlayerAction: (id: number) => void,
    squad: number[],
    gkId: number,
    setAsCaptainAction: (id: number) => void,
    unsetAsCaptainAction: (id: number) => void,
    captainId: number,
    isReserve: boolean
}
export default function ListLinePlayers({linePlayers, callbackAction, addPlayerAction, dispensePlayerAction, gkId, squad, setAsCaptainAction, unsetAsCaptainAction, captainId, isReserve}: listPlayersProps) {
    return (
        <div className={style.squadPopUp}>
            {linePlayers.map((linePlayer) => (
                <PlayerComponent player={linePlayer} isReserveChoose={isReserve} key={linePlayer.id} addPlayer={() => addPlayerAction(linePlayer.id)} gkId={gkId} squad={squad} isCaptain={captainId === linePlayer.id} dispensePlayer={() => dispensePlayerAction(linePlayer.id)} setAsCaptain={() => setAsCaptainAction(linePlayer.id)} unsetAsCaptain={() => unsetAsCaptainAction(linePlayer.id)} />
            ))}
            <DefaultButton
                text='VOLTAR'
                bold
                action={callbackAction}
            />
        </div>
    );
}