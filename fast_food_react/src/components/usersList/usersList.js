import { useState, useEffect } from 'react';
import '../../assets/css/UserList.css'
import User from '../user/user';

function UsersList() {
    const [listUsers, setListUsers] = useState([]);

    const callApi = async() => {
        try {
            const res = await fetch("http://fast-food-dh.herokuapp.com/api/users")
            const result = await res.json()
            return result[1]
        } catch (error) {
            throw "Ocurrió un error con fetch"
        }
    }

    useEffect(async() => {
        const list = await callApi()
        setListUsers([...listUsers, ...list])
    }, [])

    const content = listUsers.length === 0 ? (
            <p>Cargando usuarios...</p>
        ) : (
            listUsers.map((user, index) => 
            <User key={index} name={user.Name} lastName={user.lastName} id={user.idUser} image={user.imageName} />
            )
        )
     return (
        <div className='user__list'>
            {content}
        </div>
    )
}

export default UsersList;