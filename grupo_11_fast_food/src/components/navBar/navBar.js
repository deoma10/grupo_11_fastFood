import logo from '../../assets/images/Logo-Fast-Food.png'
import '../../assets/css/main.css';
import { Link, Route, Switch } from 'react-router-dom';
import ProductsList from '../productsList/productsList';

function NavBar() {
    return (
        <div className="principal">
            <header>
                <div className="header-logo">
                    <Link to="/">
                        <img className="logo" src={logo} />
                    </Link>
                </div>
                <div className="navBar">
                    <ul className="navBar__list">
                        <li className='navItem'>
                            <Link className='navLink' to="/prducts">
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