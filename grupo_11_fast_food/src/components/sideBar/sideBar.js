<<<<<<< HEAD
import '../../assets/css/sideBar.css'
import { Link } from 'react-router-dom';

function SideBar(props) {
    return (
        <div className="side-bar">
            <figure></figure>
            <p>skjkjrsjkrkjnjk</p>
=======
import logo from '../../assets/images/Logo-Fast-Food.png'
import '../../assets/css/NavBar.css';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <div className="bar">
            <Link to="/">
                <img src={logo} alt="Logo" />
            </Link>
>>>>>>> 6cf0856025987b227afc1862387c81740c881e3d
        </div>
    )
}

<<<<<<< HEAD
export default SideBar;
=======
export default NavBar;
>>>>>>> 6cf0856025987b227afc1862387c81740c881e3d
