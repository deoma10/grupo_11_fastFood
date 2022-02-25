import '../../assets/css/Error404.css'
import { Link } from 'react-router-dom';

function Error404(){
    return(
        <div className="Error404">
            <h2>404</h2>
            <h3>We can't find that page</h3>
            <p>We think that this page aren't really you want</p>
            <Link className="error-link" exact="true" to="/">
                <button >HOME</button>
            </Link>
        </div>
    )
}

export default Error404;