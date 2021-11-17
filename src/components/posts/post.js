import React, { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { deletePost, getPost } from "./PostProvider"
import { useHistory } from "react-router"
import "./Post.css"

export const Post = () => {
    const { postId } = useParams()
    const [tags, setTags] = useState([])
    const [post, setPost] = useState({})
    const [toDelete, setDelete] = useState(false)
    const history = useHistory()
    const [isToggled, setToggle] = useState(false)
    const confirmDelete = useRef()
    const editPost = useRef()

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
    }, [isToggled])

    return (
        <>
            <article className="postDetails">
                <section className="postBody">

                    <h1>{post.title}</h1>
                    <section className="postDetailHeader">
                        <div className="buttons">
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
                        <div>
                            {post?.category?.label}
                        </div>
                    </section>
                    {post.image_url !== null || post.image_url !== ""
                        ? <div className="postDetailImage">
                            <img src={`${post.image_url}`} alt="Post" />
                        </div>
                        : <p>No image found</p>}
                    <section className="interactions">
                        <div>By: {post.user?.user.first_name} {post.user?.user.last_name}</div>
                        <div>
                            <button className="viewComments" onClick={() => history.push(`/post/${postId}/comments/`)}>View Comments</button>
                        </div>
                        <div className="postDetailReactions">
                            😊 😍 😥 😂 😠 🤮
                        </div>
                    </section>

                    <p className="content">{post.content}</p>
                    <p className="content">Published: {post.publication_date}</p>

                    {toDelete ?
                        <><p>Are you sure you wish to delete this post?</p>
                            <button onClick={() => {
                                deletePost(parseInt(postId))
                                    .then(res => {
                                        if (res.ok) { history.push("/posts") }
                                    })
                            }}>Confirm Delete</button>
                            <button onClick={() => { setDelete(false) }}>Cancel</button></>
                        :
                        <button onClick={() => { setDelete(true) }}>Delete Post</button>}
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