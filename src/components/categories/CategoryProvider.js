
export const getCats = () => {
    return fetch('http://127.0.0.1:8088/categories')
}

export const updateCategory = (newCat) => {
    return fetch(`http://127.0.0.1:8088/categories/${newCat.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCat)
    })
}

export const deleteCategory = (id) => {
    return fetch(`http://127.0.0.1:8088/categories/${id}`,
        { method: "DELETE" })
}

export const postCategory = (newCat) => {
    return fetch('http://127.0.0.1:8088/categories', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCat)
    })
}