import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { AllPostsAdmin } from "./AllPostsAdmin"
import { getPosts } from "./PostProvider"
import "./Posts.css"

export const AllPosts = () => {
    const [posts, updatePosts] = useState([])
    const confirmDelete = useRef()
    const editPost = useRef()

    useEffect(() => {
        getPosts()
            .then(res => updatePosts(res))
    }, [])

    return (
        <>
            <h2>All Posts</h2>
            {localStorage.getItem("is_admin") === "true" ?
                <AllPostsAdmin posts={posts} updatePosts={updatePosts} editPost={editPost} confirmDelete={confirmDelete} />
                :
                <>
                    {posts?.map(post => {
                        return <>
                            <section className="postContainer">
                                <div className="postHeader">
                                    <h2><Link to={`/post/${post.id}`}>{post.title}</Link></h2>
                                    <h4>Publication Date: {post.publication_date}</h4>
                                </div>
                                <div className="postFeedImage"><img src={post.image_url} /></div>
                                <div className="postFooter">
                                    <div>
                                        Author: {post.user.user.first_name} {post.user.user.last_name}<br />
                                        Category: {post.category.label}
                                    </div>
                                    <div className="reactionCount">
                                        #reaction count
                                    </div>
                                </div>
                            </section>
                        </>
                    })}
                </>
            }
        </>
    )
}

