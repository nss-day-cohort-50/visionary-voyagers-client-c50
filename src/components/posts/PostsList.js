import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getMyPosts } from "./PostProvider"


export const Posts = () => {
    const [posts, updatePosts] = useState([])
    useEffect(() => {
        getMyPosts()
            .then(res => res.json())
            .then(res => updatePosts(res))
    }, [])

    return (
        <>
            <h2>My Posts</h2>
            <ul>
                {posts?.map(post => {
                    return <><li>
                        <div>
                            <ul>
                                {post.approved === 0 ? <li><i>Pending Approval</i></li> : ""}
                                <li><Link to={{ pathname: `/post/${post.id}`, state: { author: `${post.user.first_name}` } }}>{post.title}</Link></li>
                                <li>By {post.user.first_name} {post.user.last_name}</li>
                                <li>Category: {post.category.label}</li>
                                <li><Link to={`/edit_post/${post.id}`}>Edit</Link></li>
                            </ul>
                        </div>
                    </li>
                    </>
                })}
            </ul>
        </>
    )
}

