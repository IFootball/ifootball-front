import { point_fields_type } from "@/api/types";
import Image from "next/image";
import styles from "../../../styles/table.module.scss";
import CONSTS from "../../api/constants.json";
import primeiro from "../../app/imagens/primeiro.png";
import segundo from "../../app/imagens/segundo.png";
import terceiro from "../../app/imagens/terceiro.png";
interface tableProps {
  mockRankingData: point_fields_type[];
  genderId: number;
}
const Tabela = ({ mockRankingData, genderId }: tableProps) => {
  return (
    <table className={styles.tabela}>
      <thead>
        <tr>
          <th>Posição</th>
          <th>Jogador</th>
          <th>Pontuação</th>
        </tr>
      </thead>
      <tbody>
        {mockRankingData.map((item, index) => (
          <tr key={index}>
            <td>
              {index === 0 ? (
                <Image src={primeiro} alt="primeiro" />
              ) : index === 1 ? (
                <Image src={segundo} alt="segundo" />
              ) : index === 2 ? (
                <Image src={terceiro} alt="terceiro" />
              ) : (
                `${index + 1}${genderId === CONSTS.genderIds.male ? "º" : "ª"}`
              )}
            </td>
            <td>{item.name}</td>
            <td>
              {item.score}{" "}
              {item.score > 1 || item.score == 0 ? "pontos" : "ponto"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default Tabela;
