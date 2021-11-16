export const getTags = () => {
    return fetch('http://127.0.0.1:8000/tags')
}

export const updateTag = (newTag) => {
    return fetch(`http://127.0.0.1:8000/tags/${newTag.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTag)
    })
}

export const deleteTag = (id, setTags) => {
    return fetch(`http://127.0.0.1:8000/tags/${id}`,
        { method: "DELETE" })
}

export const postTag = (newTag) => {
    return fetch('http://127.0.0.1:8000/tags', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTag)
    })
}