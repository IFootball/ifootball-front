import styles from '../../../styles/defaultbutton.module.scss';
import theme from '../../../styles/globals.module.scss';

export default function DefaultButton({ text, bold, action, small, dispensed, unactive }: { text: string, bold?: boolean, action?: (param?: any) => boolean | void, small?: boolean, dispensed?: boolean, unactive?: boolean }) {
    const buttonStyles = {
        fontWeight: bold ? '700' : 'normal',
        padding: small ? '5px' : '10px',
        backgroundColor: dispensed ? '#cf1515' : (unactive ? '#bebebe' : theme.secondaryGreen),
        color: unactive ? 'gray' : '#ffffff'
    };

    return (
        <div className={`${styles.defaultButton} ${styles.button}`} style={buttonStyles} onClick={action}>
            {text}
        </div>
    );
}