import React from "react";
import styles from "../../../styles/home.module.scss";
import GlobalCard from "@/components/globalCard";
import Link from "next/link";
import DefaultButton from "@/components/DefaultButton";

export default function PontuacaoJogador() {
    const numRows = 5;
    const numCols = 4;

    return (
        <div className={styles.pontuacaoJog}>
            <div className={styles.pontuacaoJogUtil}>

                <div className={styles.posicao}>
                    <h3>Linha</h3>
                </div>
                <div className={styles.nomeJog}>
                    {/*<pontuacaoJogador nomeJogador={nomeJogador} />*/} <h1>nome-jogador</h1>
                </div>
                <div className={styles.fotoJog}>
                    {/*<Link href={'homepage'}><img src="images/logoFoot.png" title="ifootballLogo" /></Link>*/}
                </div>
                <table></table>
            </div>

            <div className={styles.outraTabela}>
                <table>
                    <thead>
                        <tr>
                            <th>gol</th>
                            <th>xx.xx</th>
                            <th><button>+</button></th>
                            <th><button>-</button></th>
                        </tr>
                        <tr>
                            <th>assistência</th>
                            <th>xx.xx</th>
                            <th><button>+</button></th>
                            <th><button>-</button></th>
                        </tr>
                        <tr>
                            <th>falta</th>
                            <th>xx.xx</th>
                            <th><button>+</button></th>
                            <th><button>-</button></th>
                        </tr>
                        <tr>
                            <th>amarelo</th>
                            <th>xx.xx</th>
                            <th><button>+</button></th>
                            <th><button>-</button></th>
                        </tr>
                        <tr>
                            <th>vermelho</th>
                            <th>xx.xx</th>
                            <th><button>+</button></th>
                            <th><button>-</button></th>
                        </tr>
                    </thead>
                    
                </table>
            </div>
        </div>
    );
}
