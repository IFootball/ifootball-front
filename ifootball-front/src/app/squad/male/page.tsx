"use client";
import api from "@/api";
import { verifyTerms, verifyToken } from "@/api/functions";
import { playerType } from "@/api/types";
import Campo from "@/components/Campo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import styles from "../../../../styles/malepage.module.scss";
import CONSTS from "../../../api/constants.json";
import Header from "../../../components/Header";
export default function Male() {
  const [goalkeepers, setGoalkeepers] = useState<playerType[]>([]);
  const [players, setPlayers] = useState<playerType[]>([]);

  const [userGoalkeeper, setUserGoalkeeper] = useState<number>(0);
  const [userTeam, setUserTeam] = useState<number[]>([]);
  const [userReserves, setUserReserves] = useState<number[]>([]);
  const [userCaptain, setUserCaptain] = useState<number>(0);
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

  const listGoalkeepers = async (): Promise<boolean> => {
    const response = await api.players.list(
      50,
      CONSTS.genderIds.male,
      CONSTS.playerTypes.goalkeeper
    );
    if (response) {
      setGoalkeepers(response.data);
      return true;
    }
    return false;
  };

  const listLinePlayers = async (): Promise<boolean> => {
    const response = await api.players.list(
      200,
      CONSTS.genderIds.male,
      CONSTS.playerTypes.lineplayer
    );
    if (response) {
      setPlayers(response.data);
      return true;
    }
    return false;
  };

  const loadUserTeam = async (): Promise<boolean> => {
    try {
      const response = await api.team.get(CONSTS.genderIds.male);
      if (!response.error) {
        const { completeTeamUser } = response;
        const {
          idCaptain,
          goalkeeper,
          linePlayerOne,
          linePlayerTwo,
          linePlayerThree,
          linePlayerFour,
          reservePlayerOne,
          reservePlayerTwo,
        } = completeTeamUser;
        setUserCaptain(idCaptain);
        setUserGoalkeeper(goalkeeper.id);
        setUserTeam([
          linePlayerOne.id,
          linePlayerTwo.id,
          linePlayerThree.id,
          linePlayerFour.id,
        ]);
        setUserReserves([reservePlayerOne.id, reservePlayerTwo.id]);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    listGoalkeepers();
    listLinePlayers();
    verifySession();
    loadUserTeam();
  }, []);
  return (
    <div className={styles.maleSquadPage}>
      <Header />
      <h2 className={styles.monteTime}>MONTE SEU TIME MASCULINO!</h2>
      <Link href={"/homepage"} className={styles.backToHome}>
        <FaArrowLeft color="black" /> VOLTAR À TELA INICIAL
      </Link>
      <Campo
        genderId={CONSTS.genderIds.male}
        goalkeepers={goalkeepers}
        players={players}
        captainId={userCaptain}
        goalkeeperId={userGoalkeeper}
        squad={userTeam}
        userReserves={userReserves}
      />
    </div>
  );
}
