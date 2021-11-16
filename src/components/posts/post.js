import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { deletePost, getPost } from "./PostProvider"
import { useHistory } from "react-router"
import "./Posts.css"
import { Comment } from "./Comment"

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
        return fetch('http://127.0.0.1:8000/postTags')
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
            {toDelete ?
                <><p>Are you sure you wish to delete this post?</p>
                    <button onClick={() => {
                        deletePost(post.id)
                            .then(history.push("/posts"))
                    }}>Confirm Delete</button>
                    <button onClick={() => { setDelete(false) }}>Cancel</button></>
                :
                <button onClick={() => { setDelete(true) }}>Delete Post</button>}
            <h4>Comments</h4>
            
            
             <Comment postId={postId} toggleComment={toggleComment} toggled={isToggled}/>
                
            
        </>
    )
}