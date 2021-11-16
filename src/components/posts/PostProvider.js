export const deletePost = (id) => {
    return fetch(`http://127.0.0.1:8000/posts/${id}`,
        {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user")}`
            }
        })
}

export const getPost = (id) => {
    return fetch(`http://localhost:8000/posts/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_user")}`
        }
    })
}

export const getCategories = () => {
    return fetch('http://127.0.0.1:8000/categories', {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_user")}`
        }
    })
        .then(res => res.json())
}

export const getTags = () => {
    return fetch('http://127.0.0.1:8000/tags', {
        headers: {
            "Authorization": `Token ${localStorage.getItem("rare_user")}`
        }
    })
        .then(res => res.json())
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



// export const getPosts = (currentUser) => {
//     // debugger
//     if (currentUser.is_admin === 1) {
//         return fetch(`http://localhost:8000/allposts`)
//     } else {
//         return fetch(`http://localhost:8000/posts`)
//     }
// }