export const deleteComment = (id) => {
    return fetch(`http://127.0.0.1:8000/comments/${id}`,
        {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("rare_user")}`
            }
        })
}
export const updateComment = (updated) => {
    return fetch(`http://localhost:8000/comments/${updated.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_user")}`
        },
        body: JSON.stringify(updated)
    })
}