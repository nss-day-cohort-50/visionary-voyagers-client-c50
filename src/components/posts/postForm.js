import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { getCategories, getPost, getPosts, getTags, updatePost } from "./PostProvider"
import { useParams } from "react-router"

export const PostForm = ({ postToModify, editPost, updatePosts }) => {
    const { postId } = useParams()
    const [post, setPost] = useState()
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const history = useHistory()
    console.log(post)

    useEffect(() => {
        getTags()
            .then(tags => setTags(tags))
        getCategories()
            .then(cats => setCategories(cats))
        if (postId) {
            getPost(postId)
                .then(post => setPost(post))
        } else if (editPost) {
            setPost(postToModify)
        }
    }, [postId, postToModify])

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
    }

    const constructUpdated = () => {
        const copyPost = { ...post }
        // Checks and handles changes to category dropdown.
        if (copyPost.category_id) {
            copyPost.category_id = parseInt(copyPost.category_id)
        } else {
            copyPost.category_id = post.category.id
        }
        updatePost(copyPost)
            // Waits for an ok response, then either closes the modal or pushes to the post details page.
            .then(response => {
                if (response.ok && postId) {
                    history.push(`/post/${post.id}`)
                }
                else if (response.ok && !postId) {
                    getPosts()
                        .then(posts => updatePosts(posts))
                        .then(editPost.current.close())
                }
            })
    }

    return (
        <form className="postForm">
            <h2 className="postForm__title">
                {postId || postToModify ? "Edit Post" : "New Post"}
            </h2>
            <div className="form-group">
                <label htmlFor="category">Category: </label>
                <select type="text" name="category_id" className="form-control"
                    placeholder="Category"
                    defaultValue={editPost || postId ? post?.category?.id : 0}
                    onChange={handleControlledInputChange}>
                    <option value={0} disabled>Choose a Category</option>
                    {
                        categories.map(c =>
                            <option name="category_id" value={c.id}>
                                {c.label}
                            </option>)
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
                    defaultValue={post?.title}
                    onChange={handleControlledInputChange}
                />
            </div>
            {post?.image_url ? <img src={post.image_url} /> : ""}
            <div className="form-group">
                <label htmlFor="imageURL">Image link</label>
                <input type="text" name="image_url" className="form-control"
                    placeholder="Place URL here"
                    defaultValue={post?.image_url}
                    onChange={handleControlledInputChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="content">Post Description:</label>
                <textarea className="textarea" name="content" className="form-control"
                    placeholder="Description"
                    defaultValue={post?.content}
                    onChange={handleControlledInputChange}
                ></textarea>
            </div>
            <div>
                <button type="submit"
                    onClick={event => {
                        event.preventDefault()
                        if (postId || editPost) {
                            constructUpdated()
                        } else {
                            constructNewPost()
                        }
                    }}>
                    {
                        editPost || postId ?
                            "Save Changes"
                            : "Submit"
                    }
                </button>
                <button onClick={() => {
                    if (postId || !editPost) {
                        history.push("/myposts")
                    }
                    else {
                        editPost.current.close()
                    }
                }}>
                    Cancel
                </button>
            </div>
        </form>
    )
}