import styles from '../../../styles/card.module.scss';
const GlobalCard = ({children}: {children: string | JSX.Element | JSX.Element[]}) => {
    return (
        <div className={styles.globalCard}>
            {children}
        </div>
    );
}
export default GlobalCard;