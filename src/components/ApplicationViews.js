import React from "react"
import { Route } from "react-router-dom"
import { Posts } from './posts/post.js'

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
        <Route path="/posts">
            <Posts />
        </Route>
        </main>
    </>
}
