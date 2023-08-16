import React from "react";
import styles from "../../../styles/pontuacaoGoleiro.module.scss";
import pontuacaoStyles from "./pontuacaoGoleiro.module.scss";
import Image from 'next/image';
import imagemGoleiro from '../imagens/imagemJogador.png';
import voltar from '../imagens/voltar.png';

export default function PontuacaoGoleiro() {
    const numRows = 8;
    const numCols = 4;

    return (
        <div className={styles.container}>
            <div className={styles.pontuacaoGol}>
                <div className={styles.pontuacaoGolUtil}>

                    <div className={styles.voltar}>
                        <a href=""><Image src={voltar} alt='voltar' /></a>
                    </div>
                    <div className={styles.posicao}>
                        <h6>LINHA</h6>
                    </div>
                    <div className={styles.nome}>
                        <h1>NOME</h1>
                    </div>
                        <div className={styles.foto}>
                    </div>
                    <div className={styles.imagem}>
                        <Image className={styles.imagemGoleiro} src={imagemGoleiro} alt='Imagem Goleiro' />
                    </div>
                </div>

                <div className={styles.tabelaPontuacao}>
                    <div className={styles.pontuacaoTotal}>
                        <h4>TOTAL: 00.00</h4>
                    </div>
                    <table>
                        <thead>
                            <tr className={styles.golSofrido}>
                                <th className={styles.thValores}>GOL SOFRIDO</th>
                                <th className={styles.thPontuacao}>00.00</th>
                                <th><button className={styles.subtrair}>-</button></th>
                                <th><button className={styles.somar}>+</button></th>
                            </tr>
                            <tr className={styles.defesa}>
                                <th className={styles.thValores}>DEFESA</th>
                                <th className={styles.thPontuacao}>00.00</th>
                                <th><button className={styles.somar}>+</button></th>
                                <th><button className={styles.subtrair}>-</button></th>
                            </tr>
                            <tr className={styles.defesaPenalti}>
                                <th className={styles.thValores}>DEFESA PÊNALTI</th>
                                <th className={styles.thPontuacao}>00.00</th>
                                <th><button className={styles.somar}>+</button></th>
                                <th><button className={styles.subtrair}>-</button></th>
                            </tr>
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
