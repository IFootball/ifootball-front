import styles from '../../../styles/defaultbutton.module.scss';
export default function DefaultButton({text}: {text: string}) {
    return (
        <div className={styles.defaultButton}>
            {text}
        </div>
    )
}