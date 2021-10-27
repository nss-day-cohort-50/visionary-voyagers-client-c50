import React, { useState, useEffect } from "react"
import { useParams, useLocation } from "react-router-dom"



export const Post = () => {
    
    const { postId } = useParams()

    const [post, setPost] = useState({})

    // const location = useLocation()

    // const  { author } = location.state

    const [isToggled, setToggle] = useState(false)

    const [commentText, setCommentText] = useState("")

    const getPost = () => {
        return fetch(`http://localhost:8088/post/${postId}`)
    }

    useEffect(() => {
        getPost()
            .then(res => res.json())
            .then(res => setPost(res))
    }, [])

const toggleComment = () => {
    setToggle(!isToggled)
}

const handleSubmit = () => {
    console.log(commentText)
}


    return (
        <>
        <h2>{post.title}</h2>
        {post.image_url !== null || post.image_url !== ""
        ? <img src={`${post.image_url}`} alt="Post" />
        : <p>No image found</p>}
        <p>{post.content}</p>
        <h3>Posted: {post.publication_date}</h3>
        <p>By {post?.user?.first_name}</p>
        {isToggled === true
        ? <><textarea placeholder="Type your comment here..." onChange={(e) => setCommentText(e.target.value)}></textarea>
          <button onClick={() => handleSubmit()}>Submit</button>
          <button onClick={() => toggleComment()}>Cancel</button>
          </>
        : <button onClick={() => toggleComment()}>Add Comment</button>}
        </>
    )
}