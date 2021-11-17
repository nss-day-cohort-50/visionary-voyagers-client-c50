import React, { useEffect, useState } from "react";
import { getAdminUserProfile } from "./AdminProvider";

export const AdminUserManager = () => {
    const [users, setUsers] = useState([])


    const render = () =>{
        getAdminUserProfile().then((res)=>res.json()).then((data)=>setUsers(data))
    }
    useEffect(() => {
        render()
    },[])


    return(<>
    
                <table>
                    <thead>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Active</th>
                        <th>Account Status</th>
                    </thead>
                    <tbody>
                        {users?.map((user)=>{
                            return( <tr>
                                        <td>{user.user.first_name} {user.user.last_name}</td>
                                        <td>{user.user.username}</td>
                                        <td><input type="checkbox" checked={user.user.is_active}/></td>
                                        {user.user.is_staff? 
                                        <td>
                                            <input type="checkbox" checked={false}/>Author
                                            <input type="checkbox" checked={true}/>Admin
                                        </td>
                                        :
                                        <td>
                                            <input type="checkbox" checked={true}/>Author
                                            <input type="checkbox" checked={false}/>Admin
                                        </td>
                                        }
                                    </tr>)
                        })}
                    </tbody>
                </table>
    </>)
}