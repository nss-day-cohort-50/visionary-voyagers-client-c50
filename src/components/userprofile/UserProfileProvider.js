export const getUserProfile = (id) => {
    return fetch(`http://127.0.0.1:8000/userprofile?userId=${id}`,{
        headers:{
            "Authorization": `Token ${localStorage.getItem("rare_user")}`
        }
    }).then((res) => res.json())
}

export const getUsersList = () => {
    return fetch('http://localhost:8000/userslist',{
        headers:{
            "Authorization": `Token ${localStorage.getItem("rare_user")}`
        }
    }).then((res) => res.json())
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