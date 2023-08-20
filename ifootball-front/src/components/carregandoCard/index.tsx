import carregando from "../../../public/images/carregando.png"
import styles from "../../../styles/carregandoCard.module.scss"
import Image from "next/image";

export function CarregandoCard(){
    return(
        <Image className={styles.carregandoLoop} src={carregando} alt="simbolo carregando"/>
    )
}