import styles from '../../../styles/defaultbutton.module.scss';
export default function DefaultButton({text, bold, action}: {text: string, bold?: boolean, action?: () => boolean}) {
    return (
        <div className={styles.defaultButton} style={bold ? {fontWeight: '700'} : {}} onClick={action}>
            {text}
        </div>
    )
}