import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { AllPostsAdmin } from "./AllPostsAdmin"
import { getPosts } from "./PostProvider"
import { getPostsByCat } from '../categories/CategoryProvider'
import { useParams } from "react-router"
import "./Posts.css"

export const AllPosts = () => {
    const [posts, updatePosts] = useState([])
    const confirmDelete = useRef()
    const editPost = useRef()
    const {catId} = useParams()
    const pathname = window.location.pathname
    // const pathname = href.split("/")

    useEffect(() => {
        if (pathname === `/posts/category/${catId}`) {
            getPostsByCat(catId)
                .then(res => res.json())
                .then(res => updatePosts(res))
        } else {
            getPosts()
                .then(res => updatePosts(res))
        }
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
                                <div className="postFeedImage">
                                    {post.image_url?.includes(".") ?
                                        <img src={post.image_url} />
                                        : <img src={"https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png"} />
                                    }
                                </div>
                                <div className="postFooter">
                                    <div>
                                        Author: <Link to={`/userprofile/${post.user?.id}`}>{post.user.user.first_name} {post.user.user.last_name}</Link><br />
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

