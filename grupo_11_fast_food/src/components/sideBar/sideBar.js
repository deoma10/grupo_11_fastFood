import logo from '../../assets/images/Logo-Fast-Food.png'
import '../../assets/css/sideBar.css';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SideBar() {
    return (
        <div className="side-bar">
            <Link to="/" className="side-bar__link">
                <img  className="side-bar__logo"src={logo} alt="Logo" />
            </Link>
            <ul className="side-bar__list">
                        <li className='side-bar-item'>
                            <Link className='side-barlink' to="/products">
                                Productos
                            </Link>
                        </li>
                        <li className='side-bar-item'>
                            <Link className='side-barlink' to="/users">
                            <i class="fa-solid fa-users"></i><span>Usuarios</span>
                            </Link>
                        </li>
                    </ul>
        </div>
    )
}

export default SideBar;
