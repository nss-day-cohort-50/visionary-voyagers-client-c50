import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { getCategories, getTags } from "./PostProvider"

export const PostForm = () => {
    const [post, setPost] = useState()
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const history = useHistory()

    useEffect(() => {
        getTags()
            .then(tags => setTags(tags))
        getCategories()
            .then(cats => setCategories(cats))
    }, [])

    const handleControlledInputChange = (event) => {
        const newPost = Object.assign({}, post)
        newPost[event.target.name] = event.target.value
        setPost(newPost)
    }

    const constructNewPost = () => {
        const copyPost = { ...post }
        if (localStorage.getItem("is_admin") === "false") { copyPost.approved = false }
        else { copyPost.approved = true }
        copyPost.category_id = parseInt(copyPost.category_id)
        //add tag array to post
        addPost(copyPost)
    }

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

    const addPost = (post) => {
        return fetch(`http://localhost:8000/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("rare_user")}`
            },
            body: JSON.stringify(post)
        }).then(res => res.json())
            .then(res => { history.push(`/post/${res.id}`) })
    };

    return (
        <form className="postForm">
            <h2 className="postForm__title">New Post</h2>
            <div className="form-group">
                <label htmlFor="category">Category: </label>
                <select type="text" name="categoryId" className="form-control"
                    placeholder="Category"
                    defaultValue="Choose a Category"
                    onChange={handleControlledInputChange}>
                    <option value="Choose a Category">Choose a Category</option>
                    {
                        categories.map(c => <option name="category_id" value={c.id}>{c.label}</option>)
                    }
                </select>
            </div>
            <div className="form-group">
                {tags.map(t => (<>
                    <label name="tag_id" value={t.id}>{t.label}</label>
                    <input type="checkbox" name="tag_id" value={`${t.id}`}
                        onChange={handleTagCheckboxes}></input>
                </>))}
            </div>
            <div className="form-group">
                <label htmlFor="title">Post Title:</label>
                <input type="text" name="title" className="form-control"
                    placeholder="Title"
                    defaultValue=""
                    onChange={handleControlledInputChange}
                />
            </div>
            {post?.imageUrl ? <img src={post.imageUrl} /> : ""}
            <div className="form-group">
                <label htmlFor="imageURL">Image link</label>
                <input type="text" name="imageUrl" className="form-control"
                    placeholder="Place URL here"
                    defaultValue=""
                    onChange={handleControlledInputChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="content">Post Description:</label>
                <textarea className="textarea" name="content" className="form-control"
                    placeholder="Description"
                    onChange={handleControlledInputChange}
                ></textarea>
            </div>
            <div>
                <button type="submit"
                    onClick={event => {
                        event.preventDefault()
                        constructNewPost()
                    }}>Submit</button>
            </div>
        </form>
    )
}