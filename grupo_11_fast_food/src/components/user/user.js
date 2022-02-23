import '../../assets/css/User.css'
import image from '../../assets/images/default-image.png'
import { Link } from 'react-router-dom';

function User(props) {
    return (
        <div className="user">
            <Link className="user__image" to="/usertest">
                <img src={image} alt="User" />
            </Link>

            <Link className="user__info" to='/usertest'>
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