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
    lpId: number
}
export default function ListLinePlayers({linePlayers, callbackAction, addPlayerAction, dispensePlayerAction, lpId, squad}: listPlayersProps) {
    return (
        <div className={style.squadPopUp}>
            {linePlayers.map((linePlayer) => (
                <PlayerComponent player={linePlayer} key={linePlayer.id} addPlayer={() => addPlayerAction(linePlayer.id)} gkId={lpId} squad={squad} dispensePlayer={() => dispensePlayerAction(linePlayer.id)} setAsCaptain={() => {}} unsetAsCaptain={() => {}} />
            ))}
            <DefaultButton
                text='VOLTAR'
                bold
                action={callbackAction}
            />
        </div>
    );
}