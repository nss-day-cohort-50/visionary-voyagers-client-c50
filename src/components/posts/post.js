import React, { useState, useEffect } from "react"
import { useParams, useLocation } from "react-router-dom"
import { deletePost, getPost } from "./PostProvider"
import { useHistory } from "react-router"
import "./Posts.css"

export const Post = () => {

    const { postId } = useParams()
    const [tags, setTags] = useState([])
    const [post, setPost] = useState({})
    const [toDelete, setDelete] = useState(false)
    const history = useHistory()

    const [users, updateUsers] = useState([])

    const [isToggled, setToggle] = useState(false)

    const [comment, setComment] = useState({})

    const [commentText, setCommentText] = useState("")

    const getTags = () => {
        return fetch('http://127.0.0.1:8000/postTags')
            .then(res => res.json())
            .then(tags => setTags(tags))
    }

    useEffect(() => {
        getTags()
    }, [])

    const getUsers = () => {
        return fetch('http://localhost:8000/users')
    }

    useEffect(() => {
        getPost(postId)
            .then(res => res.json())
            .then(res => setPost(res))
        getUsers()
            .then(res => res.json())
            .then(res => updateUsers(res))
    }, [isToggled])

    const toggleComment = () => {
        setToggle(!isToggled)
        console.log(post.comments)
    }

    const constructComment = () => {
        comment.post_id = parseInt(postId)
        comment.author_id = parseInt(localStorage.getItem("rare_user_id"))
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
                    if (tag.post_id === post.id) {
                        return <li>{tag?.tag?.label}</li>
                    } else {
                        return ""
                    }
                })}
            </ul>
            <h4>Comments</h4>
            <ul>
                {post?.comments?.map(
                    comment => { //Iterating through comments
                        for (const user of users) { //Scanning users for matching ids to comment author id
                            if (comment?.author_id == user?.id) {
                                return <li>{user.first_name} {user.last_name} said: "{comment?.content}" at {comment?.created_on}</li>
                            }
                        }
                    }
                )}
            </ul>
            {isToggled === true
                ? <><textarea placeholder="Type your comment here..." onChange={(e) => setCommentText(e.target.value)}></textarea>
                    <button onClick={() => constructComment()}>Submit</button>
                    <button onClick={() => toggleComment()}>Cancel</button>
                </>
                : <button onClick={() => toggleComment()}>Add Comment</button>}
            {toDelete ?
                <><p>Are you sure you wish to delete this post?</p>
                    <button onClick={() => {
                        deletePost(post.id)
                            .then(history.push("/posts"))
                    }}>Confirm Delete</button>
                    <button onClick={() => { setDelete(false) }}>Cancel</button></>
                :
                <button onClick={() => { setDelete(true) }}>Delete Post</button>}
        </>
    )
}