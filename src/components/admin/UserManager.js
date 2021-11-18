import React, { useEffect, useState, useRef } from "react";
import { AdminModal } from "./AdminModal";
import { getAdminUserProfile, subscribeToUser, updateStatus } from "./AdminProvider";

export const AdminUserManager = () => {
    const [users, setUsers] = useState([])
    const active = { "is_active": "Request" }
    const admin = { "is_admin": "Request" }
    const [userId, setUserId] = useState(0)
    const [activate, setActivate] = useState('')
    const [status, setStatus] = useState({})
    const confirmDelete = useRef()
    const render = () => {
        getAdminUserProfile().then((res) => res.json()).then((data) => setUsers(data))
    }
    useEffect(() => {
        render()
    }, [])

    const handleSubscribe = (id) => {
        const user = { followerId: id }
        subscribeToUser(user)
    }

    //confirmDelete, userId, render, activate, status
    return (<>
        <AdminModal confirmDelete={confirmDelete} userId={userId} render={render} activate={activate} status={status} />
        <table>
            <thead>
                <th>Name</th>
                <th>Username</th>
                <th>Active</th>
                <th>Account Status</th>
                <th>Subscribe</th>
            </thead>
            <tbody>
                {users?.map((user) => {
                    return (<tr>
                        <td>{user.user.first_name} {user.user.last_name}</td>
                        <td>{user.user.username}</td>
                        <td><input type="checkbox" checked={user.active} onChange={() => {
                            if (user.active) {
                                setActivate("Deactivate")
                            } else {
                                setActivate("Activate")
                            }
                            setUserId(user.id)
                            setStatus(active)
                            confirmDelete.current.showModal()

                        }} /></td>
                        {user.user.is_staff ?
                            <td>
                                <input type="checkbox" checked={false} onChange={() => {
                                    setActivate("remove Admin Privalges for")
                                    setUserId(user.id)
                                    setStatus(admin)
                                    confirmDelete.current.showModal()
                                }} />Author
                                <input type="checkbox" checked={true} />Admin
                            </td>
                            :
                            <td>
                                <input type="checkbox" checked={true} />Author
                                <input type="checkbox" checked={false} onChange={() => {
                                    setActivate("add Admin Privalges for")
                                    setUserId(user.id)
                                    setStatus(admin)
                                    confirmDelete.current.showModal()
                                }} />Admin
                            </td>
                        }
                        <td>
                            <button onClick={() => handleSubscribe(user.id)}>
                                Subscribe
                            </button>
                        </td>
                    </tr>)
                })}
            </tbody>
        </table>
    </>)
}