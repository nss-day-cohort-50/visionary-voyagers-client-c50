import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getUsersList } from "./UserProfileProvider"

export const UsersList = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsersList().then((data) => setUsers(data))
    },[])
    return(<>
            <h2>Users</h2>
                {users?.map((user) => {
                    return(<><Link to={`/userprofile/${user.id}`}>{user.user?.first_name} {user.user?.last_name}</Link><br/></>)
                })}
    
    </>)
}