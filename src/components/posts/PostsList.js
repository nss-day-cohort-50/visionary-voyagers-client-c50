import React, {useState, useEffect} from "react"
import { Link, useParams } from "react-router-dom"


export const Posts = () => {
    const [posts, updatePosts] = useState([])

    useEffect(() => {
        return fetch(`http://localhost:8088/posts/${localStorage.getItem('rare_user_id')}`)
        .then(res => res.json())
        .then(res => updatePosts(res))
    }, [])


    return (
        <>
        <ul>
            {posts.map(post => {
                return <li>
                    <div>
                        <ul>
                    <li><Link to={{pathname: `/post/${post.id}`, state: {author:`${post.user.first_name}`}}}>{post.title}</Link></li>
                    <li>By {post.user.first_name} {post.user.last_name}</li>
                    <li>Category: {post.category_id}</li>
                        </ul>
                    </div>
                        </li>
                
            })}
        </ul>
        </>
    )
}

