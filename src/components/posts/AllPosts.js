import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { AllPostsAdmin } from "./AllPostsAdmin"
import { getPosts } from "./PostProvider"

export const AllPosts = () => {
    const [posts, updatePosts] = useState([])
    // const [currentUser, setUser] = useState({})

    // console.log(currentUser)
    console.log(posts)


    // useEffect(() => {
    //     getCurrentUser(parseInt(localStorage.getItem('rare_user')))
    //         .then(res => res.json())
    //         .then(user => setUser(user))
    // }, []
    // )

    useEffect(() => {
        getPosts()
            .then(res => res.json())
            .then(res => updatePosts(res))
    }, [])

    return (
        <>
            <h2>All Posts</h2>
            {localStorage.getItem("is_admin") === "True" ?
                <AllPostsAdmin posts={posts} updatePosts={updatePosts} />
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

