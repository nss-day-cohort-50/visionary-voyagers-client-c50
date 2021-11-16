import React, { useState } from "react"
import { Link } from "react-router-dom"
import { getPosts, updatePost } from "./PostProvider"
import "./AllPosts.css"
import { EditDeleteModal } from "./EditDeleteModal"

export const AllPostsAdmin = ({ posts, currentUser, updatePosts, editPost, confirmDelete }) => {
    const [postToModify, setPost] = useState({})

    const handleApproval = (post) => {
        let copy = post
        if (copy.approved === 1) {
            copy.approved = 0
        } else {
            copy.approved = 1
        }
        updatePost(copy)
            .then(response => {
                if (response.ok) {
                    getPosts(currentUser)
                        .then(res => res.json())
                        .then(res => updatePosts(res))
                }
            })
    }

    return (
        <>
            <EditDeleteModal postToModify={postToModify} updatePosts={updatePosts} confirmDelete={confirmDelete} editPost={editPost} />
            <h2>Admin</h2>
            <table className="adminPostsTable">
                <thead>
                    <tr>
                        <td><span role="img" aria-label="emoji">⚙️🗑️</span></td>
                        <td>Title</td>
                        <td>Author</td>
                        <td>Date</td>
                        <td>Category</td>
                        <td>Tags</td>
                        <td>Approved</td>
                    </tr>
                </thead>
                <tbody>
                    {posts?.map(post => {
                        return <><tr key={`tr-${post.id}`}>
                            <td className="icons" >
                                <button className="deleteButton"
                                    onClick={() => {
                                        setPost(post)
                                        editPost.current.showModal()
                                    }}><span role="img" aria-label="emoji">⚙️</span></button>
                                <button className="deleteButton"
                                    onClick={() => {
                                        setPost(post)
                                        confirmDelete.current.showModal()
                                    }}>
                                    <span role="img" aria-label="emoji">🗑️</span>
                                </button>
                            </td>
                            <td>
                                <Link to={{ pathname: `/post/${post.id}`, state: { author: `${post.user.first_name}` } }}>{post.title}</Link>
                            </td>
                            <td>
                                {post.user.user.first_name} {post.user.user.last_name}
                            </td>
                            <td>
                                {post.publication_date}
                            </td>
                            <td>
                                {post.category.label}
                            </td>
                            <td>
                                <ul>
                                    {post?.tags?.map(tag => {
                                        return <li>{`${tag?.label}`}</li>
                                    })}
                                </ul>
                            </td>
                            <td>
                                <label htmlFor="approved">{post.approved ? 'Approved' : 'Unapproved'}</label>
                                <input type="checkbox" name="approved" checked={post.approved}
                                    onChange={() => handleApproval(post)} />
                            </td>
                        </tr>
                        </>
                    })}
                </tbody>
            </table>
        </>
    )
}

