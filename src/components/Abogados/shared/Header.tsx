import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComment, faBell } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Logo from '@/assets/images/logo.png'
import { SideMenu } from "./SideMenu";
import { useState } from "react";

export const Header = () => {
    const [showSubmenu, setShowSubmenu] = useState(false)
   
    return (
        <div className='header'>
            <div className='row'>
                <div className="col-8 d-flex align-items-center">
                <Link to="/">
                    <img src={Logo} />
                </Link>
                <input className="form-control" type="text" placeholder="Default input" aria-label="default input example" />

                </div>
                <div className="col-4 d-flex align-items-center justify-content-end">
                    <FontAwesomeIcon icon={faComment} className='me-4' />
                    <FontAwesomeIcon icon={faBell}  className='me-4' />
                    <button className="btn me-4" onClick={ () => setShowSubmenu( !showSubmenu ) }>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    {
                        showSubmenu ? <SideMenu /> : null
                    }
                </div>
            </div>
        </div>
    )
}
