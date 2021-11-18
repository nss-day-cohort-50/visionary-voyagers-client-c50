import React, { useState, useEffect, useRef } from "react"
import { getMyPosts, getSubscribedPosts } from "./PostProvider"
import { useHistory } from "react-router"
import { EditDeleteModal } from "./EditDeleteModal"
import { Link } from "react-router-dom"

export const Posts = ({ subscriptions }) => {
    const [posts, updatePosts] = useState([])
    const [postToModify, setPost] = useState({})
    const history = useHistory()
    const confirmDelete = useRef()
    const pathname = window.location.pathname

    useEffect(() => {
        if (pathname === "/myposts") {
            getMyPosts()
                .then(res => res.json())
                .then(res => updatePosts(res))
        } else {
            getSubscribedPosts()
                .then(posts => updatePosts(posts))
        }
    }, [])

    return (
        <>
            <EditDeleteModal confirmDelete={confirmDelete} postToModify={postToModify} updatePosts={updatePosts} />
            <h2>{subscriptions ? "Subscribed Users Feed" : "My Posts"}</h2>
            {posts.length === 0 ? "You have not subscribed to any users. 🙃" : ""}
            {posts?.map(post => {
                return <>
                    <section className="postContainer">

                        <div className="postHeader">
                            <h2>
                                <Link to={`post/${post.id}`}>{post.title}</Link>
                                <br />
                                {post.approved === false ? "(Pending Approval)" : ""}
                            </h2>
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
                                Author: {post.user.user.first_name} {post.user.user.last_name}<br />
                                Category: {post.category.label}
                            </div>
                            <div className="reaction-edit-delete">
                                <div className="reactionCount">
                                    #reaction count
                                </div>
                                {subscriptions ?
                                    ""
                                    :
                                    <>
                                        <button className="deleteButton"
                                            onClick={() =>
                                                history.push(`edit_post/${post.id}`)
                                            }>
                                            ⚙️
                                        </button>
                                        <button className="deleteButton"
                                            onClick={() => {
                                                setPost(post);
                                                confirmDelete.current.showModal()
                                            }}>
                                            🗑️
                                        </button>
                                    </>
                                }
                            </div>
                        </div>

                    </section>
                </>
            })}
        </>
    )
}

