// import { useState, useEffect } from 'react';
import '../../assets/css/UserList.css'
import User from '../user/user';

function UsersList() {
    // const [listUsers, setListUsers] = useState([]);

    // const callApi = async() => {
    //     try {
    //         const res = await fetch("http://localhost:4000/api/users")
    //         const result = await res.json()
    //         return result
    //     } catch (error) {
    //         throw "Ocurrió un error con fetch"
    //     }
    // }

    // useEffect(async() => {
    //     const list = await callApi()
    //     setListUsers([...listUsers, ...list])
    // }, [])

    // const content = listUsers.length === 0 ? (
    //         <p>Cargando usuarios...</p>
    //     ) : (
    //         listUsers.map((user, index) => <User key={index} name={user.name} lastName={user.lastName} />)
    //     )
    const testList = [{id: 1, Name:"Pepito", lastName:"Pérez", email: "pepito@gmail.com", imageName:"default-image.png"}, {id: 2, name:"Pepito", lastName:"Pérez", email: "pepito@gmail.com", imageName:"default-image.png"}, {id: 3, name:"Pepito", lastName:"Pérez", email: "pepito@gmail.com", imageName:"default-image.png"}, {id: 4, name:"Pepito", lastName:"Pérez", email: "pepito@gmail.com", imageName:"default-image.png"},]

    const content = testList.map((user) => <User id={user.id} name={user.Name} lastName={user.lastName} email={user.email} imageName={user.imageName}/>)
    return (
        <div className='user__list'>
            {content}
        </div>
    )
}

export default UsersList;