"use client";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/pontuacaoJogador.module.scss";
import Image from "next/image";
import imagemJogador from "../../../public/images/imagemJogador.png";
import voltar from "../../../public/images/voltar.png";
import api from "../../api/index";
import { completePlayerScout, playerTypeEnum } from "@/api/types";
import { useRouter } from "next/router";
import { CarregandoCard } from "@/components/carregandoCard";
import { ErroCard } from "@/components/erroCard";
import PopUp from "@/components/PopUp";

export default function PontuacaoJogador() {
  enum ScoutTypeEnum {
    Goals = "goals",
    Assists = "assists",
    Fouls = "fouls",
    RedCard = "redCard",
    Wins = "wins",
    YellowCard = "yellowCard",
    TakenGols = "takenGols",
    Saves = "saves",
    PenaltySaves = "penaltySaves",
  }

  const playerNull: completePlayerScout = {
    assists: 0,
    className: "null",
    fouls: 0,
    goals: 0,
    id: 0,
    idGender: 0,
    idTeamClass: 0,
    image: "null",
    name: "null",
    playerType: 1,
    redCard: 0,
    wins: 0,
    yellowCard: 0,
    takenGols: 0,
    saves: 0,
    penaltySaves: 0,
  };

  //const router = useRouter();
  const id = 1; //Number(router.query.id);

  const [loading, setLoading] = useState<boolean>(true);
  const [errorGet, setErrorGet] = useState<boolean | string>(false);
  const [sucessoScout, setSucessoScout] = useState<boolean>(false);
  const [errorScout, setErrorScout] = useState<boolean | string>(false);
  const [scout, setScout] = useState<completePlayerScout>(playerNull);

  function handleScout(scoutType: ScoutTypeEnum, value: number) {
    let valueScout = scout[scoutType] + value;

    if (valueScout >= 0) {
      setScout((oldScout) => ({
        ...oldScout,
        [scoutType]: valueScout,
      }));
    }
  }

  async function confirmScout() {
    try {
      await api.players.setScout(
        5452165,
        scout.goals,
        scout.assists,
        scout.yellowCard,
        scout.redCard,
        scout.fouls,
        scout.wins,
        scout.takenGols,
        scout.penaltySaves,
        scout.saves
      );
      setErrorScout(false);
      setSucessoScout(true);
    } catch (error) {
      setErrorScout(error.response.data);
    }
  }

  async function getPlayer(id: number) {
    try {
      var player = await api.players.getScout(id);
      setScout(player.completePlayerDto);
      console.log(player);
      setErrorGet(false);
    } catch (error) {
      setErrorGet(error.response.data);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getPlayer(id);
  }, []);

  function renderContent() {
    if (loading) return <CarregandoCard />;
    if (errorGet) return <ErroCard>{errorGet}</ErroCard>;

    return (
      <div className={styles.pontuacao}>
        <div className={styles.pontuacaoUtil}>
          <div className={styles.voltar}>
            <a href="">
              <Image src={voltar} alt="voltar" />
            </a>
          </div>
          <div className={styles.posicao}>
            <h6>{playerTypeEnum[scout.playerType]}</h6>
          </div>
          <div className={styles.nome}>
            <h1>{scout.name}</h1>
          </div>
          <div className={styles.imagem}>
            <Image
              className={styles.imagemJogador}
              src={imagemJogador}
              alt="Imagem Jogador"
            />
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
                <th className={styles.thPontuacao}>{scout.goals}</th>
                <th>
                  <button
                    className={styles.somar}
                    onClick={() => handleScout(ScoutTypeEnum.Goals, 1)}
                  >
                    +
                  </button>
                </th>
                <th>
                  <button
                    className={styles.subtrair}
                    onClick={() => handleScout(ScoutTypeEnum.Goals, -1)}
                  >
                    -
                  </button>
                </th>
              </tr>
              <tr className={styles.assistencia}>
                <th className={styles.thValores}>ASSISTÊNCIA</th>
                <th className={styles.thPontuacao}>{scout.assists}</th>
                <th>
                  <button
                    className={styles.somar}
                    onClick={() => handleScout(ScoutTypeEnum.Assists, 1)}
                  >
                    +
                  </button>
                </th>
                <th>
                  <button
                    className={styles.subtrair}
                    onClick={() => handleScout(ScoutTypeEnum.Assists, -1)}
                  >
                    -
                  </button>
                </th>
              </tr>
              <tr className={styles.falta}>
                <th className={styles.thValores}>FALTA</th>
                <th className={styles.thPontuacao}>{scout.fouls}</th>
                <th>
                  <button
                    className={styles.subtrair}
                    onClick={() => handleScout(ScoutTypeEnum.Fouls, -1)}
                  >
                    -
                  </button>
                </th>
                <th>
                  <button
                    className={styles.somar}
                    onClick={() => handleScout(ScoutTypeEnum.Fouls, 1)}
                  >
                    +
                  </button>
                </th>
              </tr>
              <tr className={styles.amarelo}>
                <th className={styles.thValores}>AMARELO</th>
                <th className={styles.thPontuacao}>{scout.yellowCard}</th>
                <th>
                  <button
                    className={styles.subtrair}
                    onClick={() => handleScout(ScoutTypeEnum.YellowCard, -1)}
                  >
                    -
                  </button>
                </th>
                <th>
                  <button
                    className={styles.somar}
                    onClick={() => handleScout(ScoutTypeEnum.YellowCard, 1)}
                  >
                    +
                  </button>
                </th>
              </tr>
              <tr className={styles.vermelho}>
                <th className={styles.thValores}>VERMELHO</th>
                <th className={styles.thPontuacao}>{scout.redCard}</th>
                <th>
                  <button
                    className={styles.subtrair}
                    onClick={() => handleScout(ScoutTypeEnum.RedCard, -1)}
                  >
                    -
                  </button>
                </th>
                <th>
                  <button
                    className={styles.somar}
                    onClick={() => handleScout(ScoutTypeEnum.RedCard, 1)}
                  >
                    +
                  </button>
                </th>
              </tr>
              {scout.playerType == playerTypeEnum.Goleiro && (
                <>
                  <tr className={styles.golSofrido}>
                    <th className={styles.thValores}>GOL SOFRIDO</th>
                    <th className={styles.thPontuacao}>{scout.takenGols}</th>
                    <th>
                      <button
                        className={styles.subtrair}
                        onClick={() => handleScout(ScoutTypeEnum.TakenGols, -1)}
                      >
                        -
                      </button>
                    </th>
                    <th>
                      <button
                        className={styles.somar}
                        onClick={() => handleScout(ScoutTypeEnum.TakenGols, 1)}
                      >
                        +
                      </button>
                    </th>
                  </tr>
                  <tr className={styles.defesa}>
                    <th className={styles.thValores}>DEFESA</th>
                    <th className={styles.thPontuacao}>{scout.saves}</th>
                    <th>
                      <button
                        className={styles.somar}
                        onClick={() => handleScout(ScoutTypeEnum.Saves, 1)}
                      >
                        +
                      </button>
                    </th>
                    <th>
                      <button
                        className={styles.subtrair}
                        onClick={() => handleScout(ScoutTypeEnum.Saves, -1)}
                      >
                        -
                      </button>
                    </th>
                  </tr>
                  <tr className={styles.defesaPenalti}>
                    <th className={styles.thValores}>DEFESA PÊNALTI</th>
                    <th className={styles.thPontuacao}>{scout.penaltySaves}</th>
                    <th>
                      <button
                        className={styles.somar}
                        onClick={() =>
                          handleScout(ScoutTypeEnum.PenaltySaves, 1)
                        }
                      >
                        +
                      </button>
                    </th>
                    <th>
                      <button
                        className={styles.subtrair}
                        onClick={() =>
                          handleScout(ScoutTypeEnum.PenaltySaves, -1)
                        }
                      >
                        -
                      </button>
                    </th>
                  </tr>
                </>
              )}
            </thead>
          </table>
        </div>
        
        {errorScout && <ErroCard>{errorScout}</ErroCard>}

        <div className={styles.confirmar} onClick={confirmScout}>
          CONFIRMAR
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {renderContent()}
      {/*sucessoScout && <PopUp>Atributos atualizados!</PopUp>*/}
    </div>
  );
}
