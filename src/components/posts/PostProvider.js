export const deletePost = (id) => {
    return fetch(`http://127.0.0.1:8088/posts/${id}`,
        { method: "DELETE" })
}

export const getPost = (id) => {
    return fetch(`http://localhost:8088/post/${id}`)
}

export const updatePost = (updated) => {
    return fetch(`http://localhost:8088/posts/${updated.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updated)
    })
}