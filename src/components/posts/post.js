import React, { useState, useEffect } from "react"
import { useParams, useLocation } from "react-router-dom"



export const Post = () => {
    const { postId } = useParams()

    const [post, setPost] = useState({})

    const location = useLocation()

    const  { author } = location.state


useEffect(() => {
    fetch(`http://localhost:8088/post/${postId}`)
            .then(res => res.json())
            .then(res => setPost(res))
}, [])


    return(
        <>
        <h2>{post.title}</h2>
        {post.image_url !== null || post.image_url !== ""
        ? <img src={`${post.image_url}`} alt="Post" />
        : <p>No image found</p>}
        <p>{post.content}</p>
        <h3>Posted: {post.publication_date}</h3>
        <p>By {author}</p>
        </>
    )
}