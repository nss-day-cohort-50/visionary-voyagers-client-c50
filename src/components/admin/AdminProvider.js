export const getAdminUserProfile = () => {
    return fetch('http://127.0.0.1:8000/adminprofile',{
        headers:{
            "Authorization": `Token ${localStorage.getItem("rare_user")}`
        }
    })
}

export const updateStatus = (status, id) => {
    return fetch(`http://127.0.0.1:8000/adminprofilemanager/${id}`,{
        method: "PATCH",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_user")}`
        },
        body: JSON.stringify(status)
    })
}

export const subscribeToUser = (user) => {
    return fetch(`http://127.0.0.1:8000/subscriptions`,{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_user")}`
        },
        body: JSON.stringify(user)
    })
}