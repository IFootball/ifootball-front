import style from '../../../styles/popup.module.scss';
export default function PopUp({cancelcallback, children}: {cancelcallback: () => void, children: string}) {
    return (
        <div onClick={cancelcallback}>
            <div>
                {children}
            </div>
        </div>
    );
}