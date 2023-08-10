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
            <div className={`${style.choosePlayer} ${style.b1}`}>J1</div>
            <div className={`${style.choosePlayer} ${style.b2}`}>J2</div>
            <div className={`${style.choosePlayer} ${style.b3}`}>J3</div>
            <div className={`${style.choosePlayer} ${style.b4}`}>J4</div>
            <div className={`${style.choosePlayer} ${style.b5}`}>J5</div>
        </div>
    )
}