import styles from '../../../styles/defaultbutton.module.scss';
import theme from '../../../styles/globals.module.scss';

export default function DefaultButton({ text, bold, action, small, dispensed }: { text: string, bold?: boolean, action?: () => boolean, small?: boolean, dispensed?: boolean }) {
    const buttonStyles = {
        fontWeight: bold ? '700' : 'normal',
        padding: small ? '5px' : '10px',
        backgroundColor: dispensed ? '#cf1515' : theme.secondaryGreen
    };

    return (
        <div className={`${styles.defaultButton} ${styles.button}`} style={buttonStyles} onClick={action}>
            {text}
        </div>
    );
}