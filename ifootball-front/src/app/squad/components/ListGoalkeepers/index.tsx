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
    gkId: number,
    setAsCaptainAction: (id: number) => void,
    unsetAsCaptainAction: (id: number) => void,
    captainId: number,
}
export default function ListGoalkeepers({goalkeepers, callbackAction, addPlayerAction, dispensePlayerAction, gkId, squad, setAsCaptainAction, unsetAsCaptainAction, captainId}: listPlayersProps) {
    return (
        <div className={style.squadPopUp}>
            {goalkeepers.map((goalkeeper) => (
                <PlayerComponent player={goalkeeper} isCaptain={captainId === goalkeeper.id} key={goalkeeper.id} addPlayer={() => addPlayerAction(goalkeeper.id)} gkId={gkId} squad={squad} isReserveChoose={false} dispensePlayer={() => dispensePlayerAction(goalkeeper.id)} setAsCaptain={() => setAsCaptainAction(goalkeeper.id)} unsetAsCaptain={() => unsetAsCaptainAction} />
            ))}
            <DefaultButton
                text='VOLTAR'
                bold
                action={callbackAction}
            />
        </div>
    );
}