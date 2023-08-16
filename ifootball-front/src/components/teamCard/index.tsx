import styles from '../../../styles/teamCard.module.scss';

interface TeamCardProps {
    children: string;
  }

export const TeamCard = ({children}: TeamCardProps) => {
    return (
        <div className={styles.teamCard}>
            {children}
        </div>
    );
}
