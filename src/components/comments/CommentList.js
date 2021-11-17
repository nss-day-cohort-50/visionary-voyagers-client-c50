import React, { useState, useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import { deleteComment, updateComment } from "./CommentProvider"
import "./Comments.css"
import { DeleteModal } from "./DeleteModal"
export const CommentList = ({comments, render, postId}) => {
    const history = useHistory()
    const [editMode, setEditMode] = useState(0)
    const [content, setContent] =useState("")
    const [commentId, setCommentId] = useState(0)
    const confirmDelete = useRef()
    return(<>
    
    <div className="commenlist-container">
    <DeleteModal confirmDelete={confirmDelete} postId={postId} commentId={commentId} render= {render} />

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
                                setCommentId(comment.id)
                                confirmDelete.current.showModal()
                            }}><span role="img" aria-label="emoji">🗑️</span></Link>
                            </div>
                        </div>)
            })}</>:""}</div>
    </>)
}