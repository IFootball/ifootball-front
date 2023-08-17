import style from '../../../styles/popup.module.scss';
import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5'

const PopUp = (props: { className?: string, children: string | JSX.Element | JSX.Element[] | React.ReactNode, cancelcallback: () => void }) => {


    const [show, setShow] = useState(false);

    const cancellFunction = () => {
        setShow(false)
        setTimeout(() => {
            props.cancelcallback()
        }, 200)
    }

    useEffect(() => {
        setTimeout(() => {
            setShow(true);
        }, 50)

        return () => {
            setShow(true);
        }
    }, [])

    return (
        <div className={`${style.globalPopup} ${show && style.show} ${props.className}`} onClick={e => {
            e.stopPropagation()
            cancellFunction()
        }}>
            <div className={style.childrenArea} onClick={((e) => e.stopPropagation())}>
                {props.children}
                <IoClose className={style.returnButton} onClick={cancellFunction} size={30} color='#555' />
            </div>
        </div>
    );
}
export default PopUp;