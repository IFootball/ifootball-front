import Header from '../../../components/Header';
import styles from '../../../../styles/malepage.module.scss';
import campo from './campo.svg';
import Image from 'next/image';
export default function Male() {
    return (
        <div className={styles.maleSquadPage}>
            <Header />
            <Image src={campo} width={100} height={500} alt='campo' />
        </div>
    )
}