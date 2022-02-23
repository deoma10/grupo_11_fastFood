import logo from '../../assets/images/Logo-Fast-Food.png'
import '../../assets/css/NavBar.css';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <div className="principal">
            <header>
                <div className="header-logo">
                    <Link to="/">
                        <img className="logo" src={logo} alt="Fast Food Logo" />
                    </Link>
                </div>
                <div className="navBar">
                    <ul className="navBar__list">
                        <li className='navItem'>
                            <Link className='navLink' to="/products">
                                Productos
                            </Link>
                        </li>
                        <li className='navItem'>
                            <Link className='navLink' to="/users">
                                Usuarios
                            </Link>
                        </li>
                    </ul>
                </div>
            </header>
        </div>
    )
}

export default NavBar;