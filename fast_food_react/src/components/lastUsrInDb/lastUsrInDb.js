import '../../assets/css/UserDetail.css'
import { useState, useEffect } from 'react';
import LoadPage from '../loadPage/loadPage'

function LastUsrInDb() {
    const [lastUser, setLastUser] = useState([]);
    const [isVisit, setIsVisit] = useState(false);

    const callUser = async () => {
        try {
            const res = await fetch(`https://fast-food-dh.herokuapp.com/api/users/last`)
            const result = await res.json()
            return result
        } catch (error) {
            throw "Ocurrió un error con fetch"
        }
    }

    useEffect(async() => {
        const newUser = await callUser()
        setLastUser(newUser)
        setTimeout(() => {
            setIsVisit(true);
        }, 2000)
    }, [])

    let view = isVisit ? (
        <div className="oneUser">
            <div>
                <h3 className='oneUser__title'>
                    {lastUser.Name} {lastUser.lastName}
                </h3>
                <p className="num_doc">
                    Número de documento: {lastUser.documentNumber}
                </p>
                <p>
                    Correo: {lastUser.email}
                </p>
            </div>
            <div className="oneUser__image">
                <img src={lastUser.imageName} alt="User" />
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

export default LastUsrInDb;