import styles from "../../../styles/erroCard.module.scss";

interface ErroCardProps {
  children?: React.ReactNode;
}

export function ErroCard({ children }: ErroCardProps) {
  return (
    <p className={styles.mensagemErro}>
      {children || "Um erro inesperado aconteceu!"}
    </p>
  );
}
