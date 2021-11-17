export const getAdminUserProfile = () => {
    return fetch('http://127.0.0.1:8000/adminprofile',{
        headers:{
            "Authorization": `Token ${localStorage.getItem("rare_user")}`
        }
    })
}