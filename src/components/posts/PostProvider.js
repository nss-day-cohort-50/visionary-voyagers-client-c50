export const deletePost = (id) => {
    return fetch(`http://127.0.0.1:8088/posts/${id}`,
        { method: "DELETE" })
}