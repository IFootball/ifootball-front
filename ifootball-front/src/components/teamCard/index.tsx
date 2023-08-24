import styles from "../../../styles/teamCard.module.scss";

interface TeamCardProps {
  children: string;
  idGender: string;
  onClick: () => void;
}

export const TeamCard = ({ children, onClick, idGender }: TeamCardProps) => {
  return (
    <div className={styles.teamCard}>
      <div>
        <p>{children}</p>
        <p>{idGender == "1" ? "Masculino" : "Feminino"}</p>
      </div>
      <button onClick={onClick} className={styles.choseButton}>
        CONFIRMAR
      </button>
    </div>
  );
};
