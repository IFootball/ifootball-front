import React from "react";
import styles from "../../../styles/pontuacaoJogador.module.scss";
import pontuacaoStyles from "./pontuacaoJogador.module.scss";

export default function PontuacaoJogador() {
    const numRows = 5;
    const numCols = 4;

    return (
        <div className={styles.container}>
            <div className={styles.pontuacaoJog}>
                <div className={styles.pontuacaoJogUtil}>
                    <div className={styles.posicao}>
                        <h3>LINHA</h3>
                    </div>
                    <div className={styles.nomeJog}>
                        <h1>NOME</h1>
                    </div>
                        <div className={styles.fotoJog}>
                    </div>
                </div>

                <div className={styles.tabelaPontuacao}>
                <div className={styles.pontuacaoTotal}>
                    <h5>TOTAL:</h5>
                </div>
                    <table>
                        <thead>
                            <tr className={styles.gol}>
                                <th>GOL</th>
                                <th>00.00</th>
                                <th><button className={styles.somar}>+</button></th>
                                <th><button className={styles.subtrair}>-</button></th>
                            </tr>
                            <tr className={styles.assistencia}>
                                <th>ASSISTÊNCIA</th>
                                <th>00.00</th>
                                <th><button className={styles.somar}>+</button></th>
                                <th><button className={styles.subtrair}>-</button></th>
                            </tr>
                            <tr className={styles.falta}>
                                <th>FALTA</th>
                                <th>00.00</th>
                                <th><button className={styles.subtrair}>-</button></th>
                                <th><button className={styles.somar}>+</button></th>
                            </tr>
                            <tr className={styles.amarelo}>
                                <th>AMARELO</th>
                                <th>00.00</th>
                                <th><button className={styles.subtrair}>-</button></th>
                                <th><button className={styles.somar}>+</button></th>
                            </tr>
                            <tr className={styles.vermelho}>
                                <th>VERMELHO</th>
                                <th>00.00</th>
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
