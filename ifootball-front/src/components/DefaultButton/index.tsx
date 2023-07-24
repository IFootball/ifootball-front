import styles from '../../../styles/defaultbutton.module.scss';
export default function DefaultButton({text, bold}: {text: string, bold?: boolean}) {
    return (
        <div className={styles.defaultButton} style={bold ? {fontWeight: '700'} : {}}>
            {text}
        </div>
    )
}