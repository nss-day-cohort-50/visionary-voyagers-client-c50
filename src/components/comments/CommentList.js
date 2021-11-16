import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { deleteComment, updateComment } from "./CommentProvider"
import "./Comments.css"
export const CommentList = ({comments, render}) => {
    const history = useHistory()
    const [editMode, setEditMode] = useState(0)
    const [content, setContent] =useState("")
    return(<><div className="commenlist-container">
    {comments.length > 0 ?<>
            {comments?.map((comment)=>{
                return(<div className="comment-container">
                            {editMode === comment.id ? <>
                                <input value={content} onChange={(event)=>{
                                    setContent(event.target.value)
                                }}/>
                                <button onClick={()=>{
                                    const object = {
                                        postId: comment.post,
                                        content: content,
                                        id : comment.id
                                    }
                                    updateComment(object).then(render)
                                    setEditMode(0)
                                }}>Apply Edit</button>
                                <button onClick={()=> setEditMode(0)}>Cancel </button>
                            </>:<h4> {comment.content}</h4>}
                            <h3>User: {comment.author.user.first_name} {comment.author.user.last_name}</h3>
                            <p><small>Posted on {comment.created_on}</small></p>
                            <div className="comment-buttons">
                            <Link className="comment-link" onClick={()=>{
                                setContent(comment.content)
                                setEditMode(comment.id)}}><span role="img" aria-label="emoji">⚙️</span></Link>
                            <Link className="comment-link" onClick={()=>{
                                deleteComment(comment.id)
                                .then(render)
                            }}><span role="img" aria-label="emoji">🗑️</span></Link>
                            </div>
                        </div>)
            })}</>:""}</div>
    </>)
}