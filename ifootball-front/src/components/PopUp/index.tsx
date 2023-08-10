import style from '../../../styles/popup.module.scss';
export default function PopUp({cancelcallback, children}: {cancelcallback: () => void, children: JSX.Element}) {
    return (
        <div onClick={cancelcallback} className={style.popup}>
            <div className={style.popup}>
                {children}
            </div>
        </div>
    );
}