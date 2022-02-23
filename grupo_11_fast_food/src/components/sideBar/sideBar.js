import logo from '../../assets/images/Logo-Fast-Food.png'
import '../../assets/css/NavBar.css';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <div className="bar">
            <Link to="/">
                <img src={logo} alt="Logo" />
            </Link>
        </div>
    )
}

export default NavBar;