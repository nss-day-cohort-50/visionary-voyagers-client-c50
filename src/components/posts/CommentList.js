import React from "react"
import "./Comments.css"
export const CommentList = ({comments}) => {

    return(<>
    {comments.length > 0 ?<>
            {comments?.map((comment)=>{
                return(<div className="comment-container">
                            <h4>User: {comment.author.user.first_name} {comment.author.user.last_name}</h4>
                            <h3>Says! {comment.content}</h3>
                            <p><small>Posted on {comment.created_on}</small></p>
                        </div>)
            })}</>:""}
    </>)
}