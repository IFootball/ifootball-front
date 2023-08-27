import Image from 'next/image';
import style from '../../styles/intro.module.scss';
import logo from '../../public/images/logoFoot.png'
const Intro = () => {
    return (
        <div className={style.introPage}>
            <Image src={logo} alt='Logo IFootball' />
        </div>
    )
}
export default Intro;