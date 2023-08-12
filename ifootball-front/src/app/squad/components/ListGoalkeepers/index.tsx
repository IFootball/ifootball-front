import { playerType } from '@/api/types';
import style from '../../../../../styles/listplayers.module.scss';
import DefaultButton from '@/components/DefaultButton';
import PlayerComponent from '../PlayerComponent';
interface listPlayersProps {
    goalkeepers: playerType[],
    callbackAction: () => boolean
}
export default function ListGoalkeepers({goalkeepers, callbackAction}: listPlayersProps) {
    return (
        <div className={style.squadPopUp}>
            {goalkeepers.map((goalkeeper) => (
                <PlayerComponent player={goalkeeper} isCaptain={goalkeeper.id === 2} key={goalkeeper.id}  />
            ))}
            <DefaultButton
                text='VOLTAR'
                bold
                action={callbackAction}
            />
        </div>
    );
}