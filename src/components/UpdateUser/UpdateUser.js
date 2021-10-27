import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const UpdateUser = () => {
    const [user, setUser] = useState({})
    const { id } = useParams()
    useEffect(() => {
        const url = `http://localhost:5000/users/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => setUser(data))
    }, [])
    return (
        <div>
            <h2>This is Update User</h2>
            <h1>Uodate name : {user.name}</h1>
            <p>{id}</p>
            {/* <h1>Uodate name : {user.name}</h1> */}
        </div>
    );
};

export default UpdateUser;