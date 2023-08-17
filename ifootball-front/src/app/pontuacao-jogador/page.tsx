import React from "react";
import styles from "../../../styles/pontuacaoJogador.module.scss";
import pontuacaoStyles from "./pontuacaoJogador.module.scss";
import Image from 'next/image';
import imagemJogador from '../../../public/images/imagemJogador.png';
import voltar from '../../../public/images/voltar.png';

export default function PontuacaoJogador() {
    const numRows = 5;
    const numCols = 4;

    return (
        <div className={styles.container}>
            <div className={styles.pontuacao}>
                <div className={styles.pontuacaoUtil}>

                    <div className={styles.voltar}>
                        <a href=""><Image src={voltar} alt='voltar' /></a>
                    </div>
                    <div className={styles.posicao}>
                        <h6>LINHA</h6>
                    </div>
                    <div className={styles.nome}>
                        <h1>NOME</h1>
                    </div>
                    <div className={styles.imagem}>
                        <Image className={styles.imagemJogador} src={imagemJogador} alt='Imagem Jogador' />
                    </div>
                </div>

                <div className={styles.tabelaPontuacao}>
                    <div className={styles.pontuacaoTotal}>
                        <h4>TOTAL: 00.00</h4>
                    </div>
                    <table>
                        <thead>
                            <tr className={styles.gol}>
                                <th className={styles.thValores}>GOL</th>
                                <th className={styles.thPontuacao}>00.00</th>
                                <th><button className={styles.somar}>+</button></th>
                                <th><button className={styles.subtrair}>-</button></th>
                            </tr>
                            <tr className={styles.assistencia}>
                                <th className={styles.thValores}>ASSISTÊNCIA</th>
                                <th className={styles.thPontuacao}>00.00</th>
                                <th><button className={styles.somar}>+</button></th>
                                <th><button className={styles.subtrair}>-</button></th>
                            </tr>
                            <tr className={styles.falta}>
                                <th className={styles.thValores}>FALTA</th>
                                <th className={styles.thPontuacao}>00.00</th>
                                <th><button className={styles.subtrair}>-</button></th>
                                <th><button className={styles.somar}>+</button></th>
                            </tr>
                            <tr className={styles.amarelo}>
                                <th className={styles.thValores}>AMARELO</th>
                                <th className={styles.thPontuacao}>00.00</th>
                                <th><button className={styles.subtrair}>-</button></th>
                                <th><button className={styles.somar}>+</button></th>
                            </tr>
                            <tr className={styles.vermelho}>
                                <th className={styles.thValores}>VERMELHO</th>
                                <th className={styles.thPontuacao}>00.00</th>
                                <th><button className={styles.subtrair}>-</button></th>
                                <th><button className={styles.somar}>+</button></th>
                            </tr>
                        </thead>
                    </table>
                </div>

                <div className={styles.confirmar}>CONFIRMAR</div>
            </div>
        </div>
    );
}
