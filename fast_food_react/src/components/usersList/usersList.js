import { useState, useEffect } from 'react';
import '../../assets/css/UserList.css'
import User from '../user/user';
import LoadPage from '../loadPage/loadPage';

function UsersList() {
    const [listUsers, setListUsers] = useState([]);
    const [isVisit, setIsVisit] = useState(false);

    const callApi = async () => {
        try {
            const res = await fetch("https://fast-food-dh.herokuapp.com/api/users")
            const result = await res.json()
            return result[1]
        } catch (error) {
            throw "Ocurrió un error con fetch"
        }
    }

    useEffect(async () => {
        const list = await callApi()
        setListUsers([...listUsers, ...list])
        setTimeout(() => {
            setIsVisit(true);
        }, 3000)
    }, [])

    let view = isVisit ? (
        listUsers.length === 0 ? (
            <LoadPage />
        ) : (
            listUsers.map((user, index) =>
                <User key={index} name={user.Name} lastName={user.lastName} id={user.idUser} image={user.imageName} />
            )
        )
    ) : (
        <LoadPage />
    )

    return (
        <div className='user__list'>
            {view}
        </div>
    )
}

export default UsersList;