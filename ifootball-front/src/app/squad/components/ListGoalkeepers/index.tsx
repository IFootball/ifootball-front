import { playerType } from '@/api/types';
import style from '../../../../../styles/listplayers.module.scss';
import DefaultButton from '@/components/DefaultButton';
import PlayerComponent from '../PlayerComponent';
interface listPlayersProps {
    goalkeepers: playerType[],
    callbackAction: () => boolean,
    addPlayerAction: (id: number) => void,
    dispensePlayerAction: (id: number) => void,
    squad: number[],
    gkId: number
}
export default function ListGoalkeepers({goalkeepers, callbackAction, addPlayerAction, dispensePlayerAction, gkId, squad}: listPlayersProps) {
    return (
        <div className={style.squadPopUp}>
            {goalkeepers.map((goalkeeper) => (
                <PlayerComponent player={goalkeeper} key={goalkeeper.id} addPlayer={() => addPlayerAction(goalkeeper.id)} gkId={gkId} squad={squad} dispensePlayer={() => dispensePlayerAction(goalkeeper.id)} setAsCaptain={() => {}} unsetAsCaptain={() => {}} />
            ))}
            <DefaultButton
                text='VOLTAR'
                bold
                action={callbackAction}
            />
        </div>
    );
}