import React from "react"
import "./Comments.css"
export const CommentList = ({comments}) => {

    return(<><div className="commenlist-container">
    {comments.length > 0 ?<>
            {comments?.map((comment)=>{
                return(<div className="comment-container">
                            <h4> {comment.content}</h4>
                            <h3>User: {comment.author.user.first_name} {comment.author.user.last_name}</h3>
                            <p><small>Posted on {comment.created_on}</small></p>
                        </div>)
            })}</>:""}</div>
    </>)
}