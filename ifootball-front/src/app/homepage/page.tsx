"use client";
import api from "@/api";
import {
  formatarDataEHora,
  splitName,
  verifyTerms,
  verifyToken,
} from "@/api/functions";
import { point_fields_type } from "@/api/types";
import DefaultButton from "@/components/DefaultButton";
import Header from "@/components/Header";
import GlobalCard from "@/components/globalCard";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/home.module.scss";
import CONSTS from "../../api/constants.json";

export default function Home() {
  const [marketEnds, setMarketEnds] = useState<string>(
    "October 09, 2023 23:59:59"
  );

  const [userData, setUserData] = useState<{
    name: string;
    scoreMale: number;
    scoreFemale: number;
  }>({
    name: verifyToken()?.name ?? "",
    scoreFemale: 0,
    scoreMale: 0,
  });
  const router = useRouter();

  const verifySession = (): boolean => {
    const token = verifyToken();

    if (token) {
      return true;
    } else {
      if (verifyTerms()) {
        router.push("/login");
      } else {
        router.push("/");
      }
      return false;
    }
  };

  async function getStartDate() {
    const response = await api.startDate.get();
    setMarketEnds(formatarDataEHora(response.startDateOfMatches));
  }

  const getUserData = async (): Promise<boolean> => {
    const response = await api.authentication.getUserData();
    if (!response.error) {
      setUserData(response.userLoged);
      return true;
    }
    return false;
  };

  const [rankingM, setRankingM] = useState<point_fields_type[]>([]);
  const [rankingF, setRankingF] = useState<point_fields_type[]>([]);

  const loadTopThree = async (): Promise<boolean> => {
    const responseM = await api.ranking.highestScores(
      CONSTS.genderIds.male,
      1,
      3
    );
    const responseF = await api.ranking.highestScores(
      CONSTS.genderIds.female,
      1,
      3
    );
    if (responseM && responseF) {
      setRankingM(responseM.data);
      setRankingF(responseF.data);
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    verifySession();
    getUserData();
    getStartDate();
    loadTopThree();
  }, []);

  return (
    <div className={styles.HomePage}>
      <Header />
      <div className={styles.homeUtil}>
        <div className={styles.relogioUtil}>
          <div className={styles.relogio}>
            <h3>ESCALAÇÃO DE TIMES FECHA EM</h3>
            <span>{marketEnds}</span>
          </div>
        </div>
        <div className={styles.homeCardsArea}>
          <GlobalCard>
            <div className={styles.time}>
              <h1 className={styles.titulo}>{userData.name}</h1>
              <div style={{ display: "flex" }}>
                <div className={styles.pontuacaoUsuario}>
                  <h5 className={styles.subtitulo}>Ranking M:</h5>
                  <span className={styles.points}>
                    {userData.scoreMale.toFixed(2)}
                  </span>
                </div>

                <div className={styles.pontuacaoUsuario}>
                  <h5 className={styles.subtitulo}>Ranking F:</h5>
                  <span className={styles.points}>
                    {userData.scoreFemale.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className={styles.buttons}>
                <Link href={"squad/male"}>
                  <DefaultButton text="Time Masculino" />
                </Link>
                <Link href={"squad/female"}>
                  <DefaultButton text="Time Feminino" />
                </Link>
              </div>
            </div>
          </GlobalCard>

          <GlobalCard>
            <div className={styles.pontuacao}>
              <h1 className={styles.titulo}>RANKING F</h1>
              <h5 className={styles.subtitulo}>TOP 3 TIMES:</h5>
              <table>
                <tbody>
                  {rankingF.map((user, index) => {
                    return (
                      <tr key={user.name}>
                        <td className={styles.tableField}>
                          {splitName(user.name)}
                        </td>
                        <td>
                          {user.score} {user.score > 1 ? "pontos" : "ponto"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className={styles.buttons}>
                <Link href={"/ranking/teams/female"}>
                  <DefaultButton text="Ver mais" />
                </Link>
              </div>
            </div>
          </GlobalCard>
          <GlobalCard>
            <div className={styles.pontuacao}>
              <h1 className={styles.titulo}>RANKING M</h1>
              <h5 className={styles.subtitulo}>TOP 3 TIMES:</h5>
              <table>
                <tbody>
                  {rankingM.map((user, index) => {
                    return (
                      <tr key={user.name}>
                        <td className={styles.tableField}>
                          {splitName(user.name)}
                        </td>
                        <td>
                          {user.score} {user.score > 1 ? "pontos" : "ponto"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className={styles.buttons}>
                <Link href={"/ranking/teams/male"}>
                  <DefaultButton text="Ver mais" />
                </Link>
              </div>
            </div>
          </GlobalCard>
        </div>
      </div>
    </div>
  );
}
