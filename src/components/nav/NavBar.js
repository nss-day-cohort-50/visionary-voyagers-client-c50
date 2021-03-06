import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
import Logo from "./rare.jpeg"

export const NavBar = () => {
    const history = useHistory()

    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="navbar__link" to="/"><img className="navbar__logo" src={Logo} alt="logo"/></Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/posts">All Posts</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/myposts">My Posts</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/categories">Category Manager</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/tags">Tag Manager</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/create_post">Create Post</Link>
            </li>
            {localStorage.getItem("is_admin") === 'true'? 
            <li className="navbar__item">
                <Link className="navbar__link" to="/adminusermanager">User Manager</Link>
            </li>
            :
            <li className="navbar__item">
                <Link className="navbar__link" to="/userslist">Users List</Link>
            </li>
            }
            {
                (localStorage.getItem("rare_user") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("rare_user")
                                localStorage.removeItem("is_admin")
                                history.push({ pathname: "/" })
                            }}
                        >Logout</button>
                    </li> :
                    
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}
