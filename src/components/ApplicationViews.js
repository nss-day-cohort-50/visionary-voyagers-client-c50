import React from "react"
import { Route } from "react-router-dom"
import { Posts } from './posts/PostsList'
import { Post } from './posts/Post'

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
        <Route exact path="/posts">
            <Posts />
        </Route>
        <Route exact path="/post/:postId">
            <Post />
        </Route>
        </main>
    </>
}
