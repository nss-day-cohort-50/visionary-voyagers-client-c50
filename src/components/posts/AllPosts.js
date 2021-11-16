import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { AllPostsAdmin } from "./AllPostsAdmin"
import { getPosts } from "./PostProvider"

export const AllPosts = () => {
    const [posts, updatePosts] = useState([])
    const [postToModify, setPost] = useState()
    const confirmDelete = useRef()
    const editPost = useRef()

    useEffect(() => {
        getPosts()
            .then(res => res.json())
            .then(res => updatePosts(res))
    }, [])

    return (
        <>

            <h2>All Posts</h2>
            {localStorage.getItem("is_admin") === "true" ?
                <AllPostsAdmin posts={posts} updatePosts={updatePosts} editPost={editPost} confirmDelete={confirmDelete} />
                :
                <>
                    <ul>
                        {posts?.map(post => {
                            return <>
                                <li>
                                    <div>
                                        <ul>
                                            <li><Link to={{ pathname: `/post/${post.id}`, state: { author: `${post.user.first_name}` } }}>{post.title}</Link></li>
                                            <li>By {post.user.first_name} {post.user.last_name}</li>
                                            <li>Category: {post.category.label}</li>
                                            {post.user_id === parseInt(localStorage.getItem('rare_user'))
                                                ?
                                                <li><Link to={`/edit_post/${post.id}`}>Edit</Link></li> : ""
                                            }
                                        </ul>
                                    </div>
                                </li>
                            </>
                        })}
                    </ul>
                </>
            }
        </>
    )
}

