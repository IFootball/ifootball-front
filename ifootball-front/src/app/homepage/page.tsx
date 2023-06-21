import React from "react";
import styles from "../../../styles/home.module.scss";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className={styles.HomePage}>
      <Header />
      <div>
        <p>.</p>
        <h3>criação de times fecha em</h3>
        <p></p>
      </div>
    </div>
  );
}
