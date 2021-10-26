import React, {useState, useEffect} from "react"



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
                    <li>{post.title}</li>
                    <li>{post.user.first_name}</li>
                    <li>{post.title}</li>
                        </ul>
                    </div>
                        </li>
                
            })}
        </ul>
        </>
    )
}

