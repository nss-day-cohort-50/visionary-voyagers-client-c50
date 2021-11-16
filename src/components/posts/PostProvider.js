export const deletePost = (id) => {
    return fetch(`http://127.0.0.1:8000/posts/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_user")}`
        }
    },
        { method: "DELETE" })
}

export const getPost = (id) => {
    return fetch(`http://localhost:8000/posts/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_user")}`
        }
    })
}

export const updatePost = (updated) => {
    return fetch(`http://localhost:8000/posts/${updated.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updated)
    })
}

// export const getCurrentUser = (id) => {
//     return fetch(`http://localhost:8000/user/${id}`)
// }

export const getPosts = () => {
    return fetch(`http://localhost:8000/posts`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user")}`
            }
        })
}
export const getMyPosts = () => {
    return fetch(`http://localhost:8000/posts?postsbyuser`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user")}`
            }
        })
}

export const postComment = (postComment) => {
    return fetch(`http://localhost:8000/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_user")}`
        },
        body: JSON.stringify(postComment)
    })
};
export const getComments = (postId) => {
    return fetch(`http://localhost:8000/comments?postId=1`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user")}`
               
            }
        }).then((res) => res.json())
}
// export const getPosts = (currentUser) => {
//     // debugger
//     if (currentUser.is_admin === 1) {
//         return fetch(`http://localhost:8000/allposts`)
//     } else {
//         return fetch(`http://localhost:8000/posts`)
//     }
// }