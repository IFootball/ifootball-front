"use client";
import { deleteCookie } from "@/api/functions";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../../../public/images/logoFoot.png";
import out from "../../../public/images/out.png";
import styles from "../../../styles/header.module.scss";
import logOut from "./login_658002.png";

interface menuProps {
  male: boolean;
  female: boolean;
}

export default function Navbar() {
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);
  const [openMenuBar, setOpenMenuBar] = useState<menuProps>({
    male: false,
    female: false,
  });

  return (
    <header className={styles.header}>
      <div className={styles.background}>
        <input
          className={styles.mobile_btn}
          type="checkbox"
          id="mobile_btn"
          onClick={() => {
            setOpenSideBar(!openSideBar);
          }}
        />
        <label className={styles.mobile_icon} htmlFor="mobile_btn">
          <span className={styles.hamburguer}></span>
        </label>

        <Link href={"/homepage"} className={styles.navLink}>
          <Image
            src={logo}
            width={128}
            height={45}
            quality={100}
            alt="ifootballLogo"
            placeholder="blur"
          />
        </Link>
      </div>

      <div
        className={`${styles.backgroundMenu} ${
          !openSideBar && styles.backgroundMenuClose
        }`}
      >
        <ul className={styles.nav}>
          <li className={styles.titleOps}>
            <div className={styles.menu_in_menu}>
              <Link className={styles.ops} href={"/squad/male"}>
                TIME M
              </Link>
              <Link className={styles.ops} href={"/squad/female"}>
                TIME F
              </Link>
            </div>
          </li>

          <li className={styles.titleOps}>
            <div className={styles.menu_in_menu}>
              <input
                className={styles.mobile_btn_ops}
                type="checkbox"
                id="mobile_btn_ops_male"
                onClick={() =>
                  setOpenMenuBar({
                    male: !openMenuBar.male,
                    female: false,
                  })
                }
              ></input>
              <label
                className={styles.mobile_icon_ops}
                htmlFor="mobile_btn_ops_male"
              >
                <p
                  className={`${styles.hamburguer_ops} ${
                    openMenuBar.male && styles.menu_bar_open
                  }`}
                >
                  ▶
                </p>
                RANKING M
              </label>

              <div>
                {openMenuBar.male && (
                  <div className={styles.menu_in_menu_ops}>
                    <Link className={styles.ops} href={"/ranking/teams/male"}>
                      Time
                    </Link>
                    <Link className={styles.ops} href={"/ranking/players/male"}>
                      Jogador
                    </Link>
                    <Link className={styles.ops} href={"/ranking/goals/male"}>
                      Gols
                    </Link>
                    <Link className={styles.ops} href={"/ranking/assists/male"}>
                      Assistência
                    </Link>
                    <Link className={styles.ops} href={"/ranking/saves/male"}>
                      Defesas
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.menu_in_menu}>
              <input
                className={styles.mobile_btn_ops}
                type="checkbox"
                id="mobile_btn_ops_female"
                onClick={() =>
                  setOpenMenuBar({
                    male: false,
                    female: !openMenuBar.female,
                  })
                }
              ></input>
              <label
                className={styles.mobile_icon_ops}
                htmlFor="mobile_btn_ops_female"
              >
                <p
                  className={`${styles.hamburguer_ops} ${
                    openMenuBar.female && styles.menu_bar_open
                  }`}
                >
                  ▶
                </p>
                RANKING F
              </label>

              <div>
                {openMenuBar.female && (
                  <div className={styles.menu_in_menu_ops}>
                    <Link className={styles.ops} href={"/ranking/teams/female"}>
                      Time
                    </Link>
                    <Link
                      className={styles.ops}
                      href={"/ranking/players/female"}
                    >
                      Jogadora
                    </Link>
                    <Link className={styles.ops} href={"/ranking/goals/female"}>
                      Gols
                    </Link>
                    <Link
                      className={styles.ops}
                      href={"/ranking/assists/female"}
                    >
                      Assistência
                    </Link>
                    <Link className={styles.ops} href={"/ranking/saves/female"}>
                      Defesas
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </li>
        </ul>

        <div className={styles.outDiv}>
          <Link href={"/edit-account"}>
            <Image src={out} alt="Edit account" />{" "}
          </Link>
        </div>

        <div className={styles.outDiv}>
          <Link
            className={styles.outA}
            href="/"
            onClick={() => deleteCookie("user_token")}
          >
            <Image
              className={styles.outImg}
              src={logOut}
              alt="outLogo"
              width={32}
              height={32}
            />
            <h4 className={styles.outH4}>SAIR</h4>
          </Link>
        </div>
      </div>
    </header>
  );
}
