import React from "react";
import styles from "../../../styles/home.module.scss";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className={styles.TeamPage}>
      <Header/>
      <div>
        <h1>Ola mundo</h1>
      </div>
    </div>
  );
}
