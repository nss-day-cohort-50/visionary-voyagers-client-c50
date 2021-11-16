import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { useParams } from "react-router"
import { getPost, updatePost } from "./PostProvider"
import { TagManager } from "../tags/tagManager"

export const EditPost = () => {
    const [post, setPost] = useState({})
    const [categories, setCategories] = useState([])
    const [newCat, setNewCat] = useState("")
    const [allTags, setAllTags] = useState([])
    const [postTags, setPostTags] = useState([])
    const history = useHistory()

    const { postId } = useParams()
    console.log(post)

    const getCats = () => {
        const copy = { ...newCat }
        copy.label = ""
        setNewCat(copy)
        fetch('http://127.0.0.1:8000/categories')
            .then(res => res.json())
            .then(cats => setCategories(cats))
    }

    const getPostTags = (postId) => {
        return fetch(`http://127.0.0.1:8000/tagsbypost/${postId}`)
            .then(res => res.json())
            .then(postTags => setPostTags(postTags))
    }
    console.log(postTags)

    const getAllTags = () => {
        return fetch('http://127.0.0.1:8000/tags')
            .then(res => res.json())
            .then(allTags => setAllTags(allTags))
    }

    useEffect(() => {
        getAllTags()
    }, [])

    useEffect(() => {
        getPostTags(postId)
    }, [])

    useEffect(() => {
        getCats()
    }, []
    )
    useEffect(() => {
        getPost(postId)
            .then(res => res.json())
            .then(post => setPost(post))
    }, []
    )

    const handleTagCheckboxes = (event) => {
        let newPost = {}
        let chosenTag = parseInt(event.target.value)
        newPost = Object.assign({}, post)
        if (newPost.tagIds) {
            if (newPost.tagIds.includes(chosenTag)) {
                const index = newPost.tagIds.indexOf(chosenTag)
                newPost.tagIds.pop([index])
            }
            else {
                newPost.tagIds.push(chosenTag)
            }
        } else {
            newPost.tagIds = []
            newPost.tagIds.push(chosenTag)
        }
        setPost(newPost)
    }

    const handleControlledInputChange = (event) => {
        const newPost = Object.assign({}, post)
        newPost[event.target.name] = event.target.value
        setPost(newPost)
    }

    const constructUpdated = () => {
        const copyPost = { ...post }
        copyPost.category_id = parseInt(copyPost.category_id)
        updatePost(copyPost)
            .then(response => {
                if (response.ok) {
                    history.push(`/post/${postId}`)
                }
            })
    }

    return (
        <form className="postForm">
            <h2 className="postForm__title">Edit Post</h2>
            <div className="form-group">
                <label htmlFor="category">Category: </label>
                <select type="text" name="category_id" className="form-control"
                    placeholder="Category"
                    defaultValue={post?.category_id}
                    onChange={handleControlledInputChange}>
                    <option value={"null"} disabled>Select Category</option>
                    {
                        categories.map(c => <option name="category_id" selected={post.category_id === c.id ? true : false} value={c.id}>{c.label}</option>)
                    }
                </select>
            </div>
            {/* <div className="form-group">
                <h4>Tags</h4>
                {allTags.map(at => {
                    return <>
                        <label>{at.label}</label>
                        <input type="checkbox" value={`${at.id}`}
                            checked={
                                postTags.some(pt => at.id === pt.tag_id) ? true : false}
                            onChange={handleTagCheckboxes}></input>
                    </>
                })}

            </div> */}
            <div className="form-group">
                <label htmlFor="title">Post Title:</label>
                <input type="text" name="title" className="form-control"
                    placeholder="Title"
                    defaultValue=""
                    value={post.title}
                    onChange={handleControlledInputChange}
                />
            </div>
            <div className="form-group">
                <img src={post.image_url} /><br />
                <label htmlFor="image_url">Image link</label>
                <input type="text" name="image_url" className="form-control"
                    placeholder="Place URL here"
                    defaultValue=""
                    value={post.image_url}
                    onChange={handleControlledInputChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="content">Post Description:</label>
                <textarea class="textarea" name="content" className="form-control"
                    placeholder="Description"
                    value={post.content}
                    onChange={handleControlledInputChange}
                ></textarea>
            </div>
            <div>
                <button type="submit"
                    onClick={event => {
                        event.preventDefault()
                        constructUpdated()
                    }}>Submit</button>
            </div>
        </form>
    )
}