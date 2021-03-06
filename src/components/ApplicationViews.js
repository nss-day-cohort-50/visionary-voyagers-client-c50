import React from "react"
import { Route } from "react-router-dom"
import { PostForm } from "./posts/postForm.js"
import { CategoryManager } from "./categories/CategoryManager.js"
import { Post } from './posts/post.js'
import { Posts } from './posts/PostsList'
import { TagManager } from './tags/tagManager'
import { AllPosts } from "./posts/AllPosts.js"
import { Comment } from "./comments/Comment.js"
import { AdminUserManager } from "./admin/UserManager.js"
import { UserProfile } from "./userprofile/UserProfile.js"
import { UsersList } from "./userprofile/UsersList.js"
import { UsersPost } from "./userprofile/UsersPost.js"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route exact path="/">
                <Posts subscriptions={true}/>
            </Route>
            <Route path="/myposts">
                <Posts/>
            </Route>
            <Route exact path="/posts">
                <AllPosts />
            </Route>
            <Route exact path="/posts/category/:catId">
                <AllPosts />
            </Route>
            <Route path="/create_post">
                <PostForm />
            </Route>
            <Route exact path="/post/:postId">
                <Post />
            </Route>
            <Route path="/categories">
                <CategoryManager />
            </Route>
            <Route path="/edit_post/:postId">
                <PostForm />
            </Route>
            <Route path="/tags">
                <TagManager />
            </Route>
            <Route exact path ="/post/:postId/comments">
                <Comment />
            </Route>
            <Route exact path="/adminusermanager">
                <AdminUserManager />
            </Route>
            <Route exact path="/userprofile/:userId(\d+)">
                <UserProfile />
            </Route>
            <Route exact path="/userslist">
                <UsersList />
            </Route>
            <Route exact path="/usersposts/:userId(\d+)">
                <UsersPost />
            </Route>
        </main>
    </>
}
