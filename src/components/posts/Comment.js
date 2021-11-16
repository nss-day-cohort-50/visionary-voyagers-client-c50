import React, {useEffect, useState} from "react"
import { CommentList } from "./CommentList"
import {getComments, postComment} from "./PostProvider"
export const Comment = ({postId, toggleComment, toggled}) =>{
    const [comment, setCommentText] = useState("")
    const [commentList, setCommentList] = useState({})
    const render = () =>{
        getComments().then((data) => setCommentList(data))
    }
    useEffect(() => {
        render()
    }, [])
    const constructComment = () => {
        const object = {
            content: comment,
            postId : postId
        }
        
        postComment(object)
        toggleComment()
        render()
    }
    return (<>

                    {toggled ?<>
                    <textarea placeholder="Type your comment here..." onChange={(e) => setCommentText(e.target.value)}></textarea>
                    <button onClick={() => constructComment()}>Submit</button>
                    <button onClick={() => toggleComment()}>Cancel</button>
                    </>
                    :<button onClick={()=>toggleComment()}>Add Comment</button>}
                    <h2>Post Comments</h2>
                    <CommentList comments={commentList} />
    </>)
}