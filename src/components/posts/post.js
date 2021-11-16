import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { deletePost, getPost } from "./PostProvider"
import { useHistory } from "react-router"
import "./Posts.css"

export const Post = () => {

    const { postId } = useParams()
    const [tags, setTags] = useState([])
    const [post, setPost] = useState({})
    const [toDelete, setDelete] = useState(false)
    const history = useHistory()
    const [isToggled, setToggle] = useState(false)
    const [comment, setComment] = useState({})
    const [commentText, setCommentText] = useState("")

    const getTags = () => {
        return fetch('http://127.0.0.1:8000/posttags', {
            headers:{
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
            .then(res => res.json())
            .then(res => setPost(res))
    }, [isToggled])

    const toggleComment = () => {
        setToggle(!isToggled)
        console.log(post.comments)
    }

    const constructComment = () => {
        comment.post_id = parseInt(postId)
        comment.author_id = parseInt(localStorage.getItem("rare_user"))
        comment.content = commentText
        postComment(comment)
        setToggle(!isToggled)
    }

    const postComment = (postComment) => {
        return fetch(`http://localhost:8000/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postComment)
        })
    };


    return (
        <>
            <h2>{post.title}</h2>
            {post.image_url !== null || post.image_url !== ""
                ? <div className="postImage">
                    <img src={`${post.image_url}`} alt="Post" />
                </div>
                : <p>No image found</p>}
            <p>{post.content}</p>
            <h3>Posted: {post.publication_date}</h3>
            <p>By {post?.user?.user.first_name} {post?.user?.user.last_name}</p>
            <h4>Tags</h4>
            <ul>
                {tags.map(tag => {
                    if (tag?.post?.id === post.id) {
                        return <li>{tag?.tag?.label}</li>
                    } else {
                        return ""
                    }
                })}
            </ul>
            <h4>Comments</h4>
           
            <button onClick={() => history.push(`/post/${postId}/comments/`)}>Comments</button>
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
        </>
    )
}