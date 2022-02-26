import '../../assets/css/User.css'
import { Link } from 'react-router-dom';

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
                        {props.name}
                    </h3>
                    <h3 className="user__name">
                        {props.lastName}
                    </h3>
                </div>
            </Link>
        </div>
    )
}

export default User;