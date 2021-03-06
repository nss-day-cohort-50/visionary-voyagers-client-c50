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
        .then(res => res.json())
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
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_user")}`
        },
        body: JSON.stringify(updated)
    })
}

export const getPosts = () => {
    return fetch(`http://localhost:8000/posts`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user")}`
            }
        })
        .then(res => res.json())
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
}

export const getComments = (postId) => {
    return fetch(`http://localhost:8000/comments?postId=${postId}`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user")}`

            }
        }).then((res) => res.json())
}

export const getSubscribedPosts = () => {
    return fetch(`http://127.0.0.1:8000/posts?subscribed`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user")}`

            }
        }).then((res) => res.json())
}