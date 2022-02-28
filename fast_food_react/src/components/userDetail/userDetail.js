import '../../assets/css/UserDetail.css'
import { useState, useEffect } from 'react';
import LoadPage from '../loadPage/loadPage';

function UserDetail(props) {
    const [isVisit, setIsVisit] = useState(false);

    useEffect(async() => {
        setTimeout(() => {
            setIsVisit(true);
        }, 2000)
    }, [])

    let view = isVisit ? (
        <div className="oneUser">
            <div>
                <h3 className='oneUser__title'>
                    {props.Name} {props.lastName}
                </h3>
                <p className="num_doc">
                    Número de documento: {props.documentNumber}
                </p>
                <p>
                    Correo: {props.email}
                </p>
            </div>
            <div className="oneUser__image">
                <img src={props.imageName} alt="User" />
            </div>
        </div>
    ) : (
        <LoadPage />
    )

    return (
        <div>
            {view}
        </div>
    )
}

export default UserDetail;