import logo from '../../assets/images/Logo-Fast-Food.png'
import '../../assets/css/sideBar.css';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <div className="side-bar">
            <Link to="/" className="side-bar__link">
                <img  className="side-bar__logo"src={logo} alt="Logo" />
            </Link>
            <ul className="side-bar__list">
                        <li className='side-barItem'>
                            <Link className='side-barLink' to="/products">
                                Productos
                            </Link>
                        </li>
                        <li className='side-barItem'>
                            <Link className='side-barLink' to="/users">
                                Usuarios
                            </Link>
                        </li>
                    </ul>
        </div>
    )
}

export default NavBar;
