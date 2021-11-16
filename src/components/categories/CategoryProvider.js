
export const getCats = () => {
    return fetch('http://127.0.0.1:8000/categories',{
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
}

export const updateCategory = (newCat) => {
    return fetch(`http://127.0.0.1:8000/categories/${newCat.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(newCat)
    })
}

export const deleteCategory = (id) => {
    return fetch(`http://127.0.0.1:8000/categories/${id}`,
        { method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        } })
}

export const postCategory = (newCat) => {
    return fetch('http://127.0.0.1:8000/categories', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(newCat)
    })
}