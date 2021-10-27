import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {

    const [users, setUsers] = useState([]);
    useEffect(() => {

        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

    const handeldeleuser = id => {
        const proceed = window.confirm('tomi ki amake mon theke kete dite caw?')
        if (proceed) {



            const url = `http://localhost:5000/users/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(
                    data => {
                        if (data.deletedCount > 0) {
                            alert('mon tyheke bad dilama')
                            const remainUser = users.filter(user => user._id !== id)
                            setUsers(remainUser)

                        }
                    }
                )

        }



    }

    return (
        <div>
            <h2>This is Users number :{users.length} </h2>


            <ul>
                {
                    users.map(user => <li


                        key={user._id}


                    >
                        {user.name} ::{user.email}
                        <button onClick={() => handeldeleuser(user._id)} >
                            delit
                        </button>
                        <Link to={`/users/update/${user._id}`}> <button>
                            update
                        </button></Link>

                    </li>)
                }
            </ul>
        </div>
    );
};

export default Users;