import React, {useEffect, useState} from "react"
import { CommentList } from "./CommentList"
import { getComments, getPost, postComment } from "../posts/PostProvider"
import { useParams } from "react-router"
export const Comment = () =>{
    const [comment, setCommentText] = useState("")
    const [commentList, setCommentList] = useState({})
    const [post, setPost] = useState({})
    const {postId} = useParams()
    const render = () =>{
        getComments(postId).then((data) => setCommentList(data))
    }
    useEffect(() => {
        render()
        getPost(postId).then((res)=> res.json()).then((data) => setPost(data))
    }, [])
    const constructComment = () => {
        const object = {
            content: comment,
            postId : postId
        }
        
        postComment(object)
        .then(render)
        .then(setCommentText(""))
    }
    return (<>
                    <h2>{post.title}</h2>
                    <div className="comments-header">
                    <textarea placeholder="Type your comment here..." value={comment}onChange={(e) => setCommentText(e.target.value)}></textarea>
                    <button onClick={() => {
                        constructComment()
                        
                        }}>Submit</button>
                    </div>
                    
                    
                    <h2>Post Comments</h2>
                    <CommentList comments={commentList} render={render}/>
    </>)
}