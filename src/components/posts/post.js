import React, { useState, useEffect } from "react"
import { useParams, useLocation } from "react-router-dom"
import { deletePost } from "./PostProvider"
import { useHistory } from "react-router"


export const Post = () => {
    const { postId } = useParams()
    const [newTag, setNewTag] = useState("")
    const [tags, setTags] = useState([])
    const [post, setPost] = useState({})
    const [toDelete, setDelete] = useState(false)
    const history = useHistory()

    // const location = useLocation()

    // const  { author } = location.state

    const getPost = () => {
        return fetch(`http://localhost:8088/post/${postId}`)
    }

    const getTags = () => {
        const copy = { ...newTag }
        copy.label = ""
        setNewTag(copy)
        fetch('http://127.0.0.1:8088/tags')
            .then(res => res.json())
            .then(tags => setTags(tags))
    }

    useEffect(() => {
        getTags()
    }, [])

    useEffect(() => {
        getPost()
            .then(res => res.json())
            .then(res => setPost(res))
    }, [])


    return (
        <>
            <h2>{post.title}</h2>
            {post.image_url !== null || post.image_url !== ""
                ? <img src={`${post.image_url}`} alt="Post" />
                : <p>No image found</p>}
            <p>{post.content}</p>
            <h3>Posted: {post.publication_date}</h3>
            <p>By {post?.user?.first_name}</p>
            <div className="form-group">
                <p>Tags:</p>
                {tags.map(t => (<>
                    <label name="tag_id" value={t.id}>{t.label}</label>
                        <input type="checkbox" name="tag_id" value={`${t.id}`}
                        onChange={""}></input>
                        </>))}
            </div>

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