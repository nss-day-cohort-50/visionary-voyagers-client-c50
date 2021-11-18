import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getUserProfile, subscribeToUser } from "./UserProfileProvider";
import "./UserProfile.css"


export const UserProfile = () => {
    const { userId } = useParams()
    const [profile, setProfile] = useState({})

    useEffect(() => {
        getUserProfile(userId).then((data) => setProfile(data))
    }, [])
    return (<>
        <div className="profile-container">
            <div className="profile-details-container">
                <div className="picture-container">
                    {profile.user?.profile_image_url.includes(".")
                        ? <div className="postDetailImage">
                            <img src={`${profile.user.profile_image_url}`} alt="Post" />
                        </div>
                        : <div className="postDetailImage">
                            <img src={`https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png`} alt="Post" />
                        </div>
                    }
                    <h4>{profile.user?.user.first_name} {profile.user?.user.last_name}</h4>
                </div>
                <div className="user-info-container">
                    <h3>{profile.user?.user.username}</h3>
                    <h3>{profile.user?.user.email}</h3>
                    <h3>{profile.user?.user.date_joined}</h3>
                    {<h3>{profile.user?.user.is_staff ? "Admin" : "Author"}</h3>}
                    <Link><h3>Articles Posted #{profile.post?.length}</h3></Link>
                </div>
            </div>
            <div className="subscribe-container">
                <button
                    onClick={() => {
                        subscribeToUser({ authorId: profile.user?.id })
                    }}
                >Subscribe</button>
            </div>
        </div>



    </>)
}