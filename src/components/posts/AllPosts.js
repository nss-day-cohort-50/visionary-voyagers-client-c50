import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"


export const AllPosts = () => {
    const [posts, updatePosts] = useState([])
    useEffect(() => {
        getPosts()
            .then(res => res.json())
            .then(res => updatePosts(res))
    }, [])

    const getPosts = () => {
        return fetch(`http://localhost:8088/posts`)
    }

    return (
        <>
            <h2>All Posts</h2>
            <ul>
                {posts?.map(post => {
                    return <li>
                        <div>
                            <ul>
                                <li><Link to={{ pathname: `/post/${post.id}`, state: { author: `${post.user.first_name}` } }}>{post.title}</Link></li>
                                <li>By {post.user.first_name} {post.user.last_name}</li>
                                <li>Category: {post.category.label}</li>
                                {post.user_id === parseInt(localStorage.getItem('rare_user_id'))
                                    ?
                                    <li><Link to={`/edit_post/${post.id}`}>Edit</Link></li> : ""
                                }
                            </ul>
                        </div>
                    </li>

                })}
            </ul>
        </>
    )
}

