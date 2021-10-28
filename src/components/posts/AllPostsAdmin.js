import React from "react"
import { Link } from "react-router-dom"
import { getPosts, updatePost } from "./PostProvider"

export const AllPostsAdmin = ({ posts, currentUser, updatePosts }) => {

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
            <h2>Admin</h2>
            <table>
                <thead>
                    <tr>
                        <td></td>
                        <td>Title</td>
                        <td>Author</td>
                        <td>Date</td>
                        <td>Category</td>
                        <td>Tags</td>
                        <td>Approved</td>
                    </tr>
                </thead>
                {posts?.map(post => {
                    return <><tr>
                        <td>
                            <Link to={`/edit_post/${post.id}`}>⚙️</Link>
                            <Link to={`/edit_post/${post.id}`}>🗑️</Link>
                        </td>
                        <td>
                            <Link to={{ pathname: `/post/${post.id}`, state: { author: `${post.user.first_name}` } }}>{post.title}</Link>
                        </td>
                        <td>
                            {post.user.first_name} {post.user.last_name}
                        </td>
                        <td>
                            {post.publication_date}
                        </td>
                        <td>
                            {post.category.label}
                        </td>
                        <td>
                            {post.tags}
                        </td>
                        <td>
                            <label htmlFor="approved">{post.approved ? 'Approved' : 'Unapproved'}</label>
                            <input type="checkbox" name="approved" checked={post.approved}
                                onChange={() => handleApproval(post)} />
                        </td>
                    </tr>
                    </>
                })}
            </table>
        </>
    )
}

