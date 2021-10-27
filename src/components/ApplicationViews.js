import React from "react"
import { Route } from "react-router-dom"
import { PostForm } from "./posts/postForm.js"
import { CategoryManager } from "./categories/CategoryManager.js"
import { Post } from './posts/post.js'
import { Posts } from './posts/PostsList'

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route path="/posts">
                <Posts />
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
        </main>
    </>
}
