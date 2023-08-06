import style from '../../../styles/campo.module.scss';
export default function Campo() {
    return (
        <div className={style.field}>
            <div className={`${style.lateral} ${style.linha}`}>
                <div className={`${style.linha} ${style.area} ${style.left}`}></div>
                <div className={`${style.circulo} ${style.linha}`}></div>
                <div className={`${style.linha} ${style.centro}`}></div>
                <div className={`${style.linha} ${style.area} ${style.right}`}></div>
            </div>
        </div>
    )
}