import React from "react"
import { Link } from "react-router-dom"

export const AllPostsAdmin = ({ posts }) => {

    return (
        <>
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

