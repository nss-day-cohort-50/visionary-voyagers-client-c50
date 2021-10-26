import React from "react"
import { Route } from "react-router-dom"
import { Posts } from './posts/post.js'
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
        <Route exact path="/posts">
            <Posts />
        </Route>
        <Route path="/create_post">
            <PostForm />
        </Route>
        <Route exact path="/post/:postId">
            <Post />
        </Route>
            <Route path="/posts">
                <Posts />
            </Route>
            <Route path="/categories">
                <CategoryManager />
            </Route>
            <Route exact path="/post/:postId">
                <Post />
            </Route>
        </main>
    </>
}
