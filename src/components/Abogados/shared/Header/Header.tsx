import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComment, faBell } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Logo from '@/assets/images/logo.png'
import { SideMenu } from "../SideMenu/SideMenu";
import { useState } from "react";
import './Header.scss';

export const Header = () => {
    const [showSubmenu, setShowSubmenu] = useState(false)
    const [animateClass, setAnimateClass] = useState('animate__slideInRight')

    const onToggleSubMenu = () => {
        setShowSubmenu( true )
        setAnimateClass( 'animate__slideInRight' )
    }
   
    return (
        <div className='header'>
            <div className='p-4 d-flex border align-items-center justify-content-between'>
                <Link to="/">
                    <img src={Logo} className='logo2' />
                </Link>
                <input className="form-control w-50 p-3 explorar" type="text" placeholder="Explorar..." aria-label="default input example" />
                <div className="d-flex">
                    <button className="btn me-3">
                        <FontAwesomeIcon icon={faComment} className='' />
                    </button>
                    <button className="btn me-3">
                        <FontAwesomeIcon icon={faBell}  className='' />
                    </button>
                    <button className="btn me-3" onClick={ onToggleSubMenu}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    {
                        showSubmenu ? <SideMenu animateClass={animateClass} setAnimateClass={setAnimateClass}/> : null
                    }
                </div>
            </div>
        </div>
    )
}
