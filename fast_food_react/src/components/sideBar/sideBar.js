import logo from '../../assets/images/Logo-Fast-Food.png'
import '../../assets/css/sideBar.css';
import { Link } from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUsers, faBurger, faNewspaper, faUserPen} from '@fortawesome/free-solid-svg-icons'

function SideBar() {
    return (
        <div className="side-bar">
            <Link to="/" className="side-bar__link">
                <img  className="side-bar__logo"src={logo} alt="Logo" />
            </Link>
            <ul className="side-bar__list">
                        <li className='side-bar-item'>
                            <Link className='side-barlink' to="/products">
                            <FontAwesomeIcon icon={faBurger} /> Productos
                            </Link>
                        </li>
                        <li className='side-bar-item'>
                            <Link className='side-barlink' to="/products/last">
                            <FontAwesomeIcon icon={faNewspaper}/> Producto Reciente
                            </Link>
                        </li>
                        <li className='side-bar-item'>
                            <Link className='side-barlink' to="/users">
                            <FontAwesomeIcon icon={faUsers}/> Usuarios
                            </Link>
                        </li>
                        <li className='side-bar-item'>
                            <Link className='side-barlink' to="/users/last">
                            <FontAwesomeIcon icon={faUserPen}/> Usuario Reciente
                            </Link>
                        </li>
                    </ul>
        </div>
    )
}

export default SideBar;
