import { point_fields_type } from '@/api/types';
import styles from '../../../styles/table.module.scss';
import primeiro from "../../app/imagens/primeiro.png";
import segundo from "../../app/imagens/segundo.png";
import terceiro from "../../app/imagens/terceiro.png";
import CONSTS from '../../api/constants.json';
import Image from 'next/image';
interface tableProps {
    mockRankingData: point_fields_type[],
    genderId: number
}
const TabelaSavesF = ({mockRankingData, genderId}: tableProps) => {
    return (
        <table className={styles.tabela}>
            <thead>
                <tr>
                    <th>Posição</th>
                    <th>Jogadora</th>
                    <th>Defesas</th>
                </tr>
            </thead>
            <tbody>
                {mockRankingData.map((item, index) => (
                    <tr key={index}>
                        <td>{index === 0 ? <Image src={primeiro} alt='primeiro' /> : (index === 1 ? <Image src={segundo} alt='segundo' /> : (index === 2 ? <Image src={terceiro} alt='terceiro' /> : `${index + 1}${genderId === CONSTS.genderIds.male ? 'º' : 'ª'}`))}</td>
                        <td>{item.name}</td>
                        <td>{item.score} {item.score > 1 || item.score == 0 ? 'Defesas' : 'Defesa'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default TabelaSavesF;