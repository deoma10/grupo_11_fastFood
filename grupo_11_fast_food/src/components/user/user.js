import '../../assets/css/User.css'
import image from '../../assets/images/default-image.png'
import { Link } from 'react-router-dom';
import UserDetail from '../userDetail/userDetail';

function User(props) {
    let id= `/users/${props.id}`
    
    return (
        <div className="user">
            <Link className="user__image" to={id}>
                <img src={props.image} alt="User" />
            </Link>

            <Link className="user__info" to={id}>
                <div>
                    <h3 className="user__name">
                        {props.name} {props.lastName}
                    </h3>
                </div>
            </Link>
        </div>
    )
}

export default User;