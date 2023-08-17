import styles from "../../../styles/teamCard.module.scss";

interface TeamCardProps {
  children: string;
  onClick: () => void;
}

export const TeamCard = ({ children, onClick }: TeamCardProps) => {
  return (
    <div className={styles.teamCard}>
      <p>{children}</p>
      <button onClick={onClick} className={styles.choseButton}>CONFIRMAR</button>
    </div>
  );
};
