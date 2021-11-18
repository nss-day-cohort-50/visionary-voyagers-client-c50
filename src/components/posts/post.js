import React, { useState, useEffect, useRef } from "react"
import { Link, useParams } from "react-router-dom"
import { getPost } from "./PostProvider"
import { useHistory } from "react-router"
import "./Post.css"
import { EditDeleteModal } from "./EditDeleteModal"

export const Post = () => {
    const { postId } = useParams()
    const [tags, setTags] = useState([])
    const [post, setPost] = useState({})
    const history = useHistory()
    const confirmDelete = useRef()

    const getTags = () => {
        return fetch('http://127.0.0.1:8000/posttags', {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user")}`
            }
        })
            .then(res => res.json())
            .then(tags => setTags(tags))
    }

    useEffect(() => {
        getTags()
    }, [])

    useEffect(() => {
        getPost(postId)
            .then(res => setPost(res))
    }, [postId])

    return (
        <>
            <EditDeleteModal postToModify={post} confirmDelete={confirmDelete} />
            <article className="postDetails">
                <section className="postBody">
                    <h1>{post.title}<br />
                        {post.approved ? "" : "(Pending Approval)"}
                    </h1>
                    <section className="postDetailHeader">
                        <div className="buttons">
                            <button className="deleteButton"
                                onClick={() =>
                                    history.push(`/edit_post/${postId}`)
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
                        <div>
                            {post?.category?.label}
                        </div>
                    </section>
                    {post.image_url?.includes(".")
                        ? <div className="postDetailImage">
                            <img src={`${post.image_url}`} alt="Post" />
                        </div>
                        : <div className="postDetailImage">
                            <img src={`https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png`} alt="Post" />
                        </div>
                    }
                    <section className="interactions">
                        <div>By: <Link to={`/userprofile/${post.user?.id}`}>{post.user?.user.first_name} {post.user?.user.last_name}</Link></div>
                        <div>
                            <button className="viewComments" onClick={() => history.push(`/post/${postId}/comments/`)}>View Comments</button>
                        </div>
                        <div className="postDetailReactions">
                            😊 😍 😥 😂 😠 🤮
                        </div>
                    </section>

                    <p className="content">{post.content}</p>
                    <p className="content">Published: {post.publication_date}</p>
                </section>
                <section className="tags">
                    {tags.map(tag => {
                        if (tag?.post?.id === post.id) {
                            return <div className="tag">
                                {tag.tag.label}
                            </div>
                        }
                    })}
                </section>
            </article>
        </>
    )
}