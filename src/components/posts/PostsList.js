import React, { useState, useEffect, useRef } from "react"
import { getMyPosts } from "./PostProvider"
import { useHistory } from "react-router"
import { EditDeleteModal } from "./EditDeleteModal"
import { Link } from "react-router-dom"

export const Posts = () => {
    const [posts, updatePosts] = useState([])
    const [postToModify, setPost] = useState({})
    const history = useHistory()
    const confirmDelete = useRef()

    useEffect(() => {
        getMyPosts()
            .then(res => res.json())
            .then(res => updatePosts(res))
    }, [])

    return (
        <>
            <EditDeleteModal confirmDelete={confirmDelete} postToModify={postToModify} updatePosts={updatePosts} />
            <h2>My Posts</h2>
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
                            </div>
                        </div>

                    </section>
                </>
            })}
        </>
    )
}

