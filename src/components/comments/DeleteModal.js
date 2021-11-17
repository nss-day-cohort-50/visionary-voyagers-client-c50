import React from "react";
import { useHistory } from "react-router";
import { getComments } from "../posts/PostProvider";
import { deleteComment } from "./CommentProvider";

export const DeleteModal = ({ confirmDelete, postId, commentId, render }) => {
    const history = useHistory()
    const path = window.location.pathname.split('/')[1]
    const handleDelete = () => {
        deleteComment(commentId)
            .then(()=>render())
            .then(
                confirmDelete.current.close()
            )
    }

    return (<>
        <dialog className="confirmDeleteModal" ref={confirmDelete}>
            <h2>Are you sure you want to delete of your comment?</h2>
            <div className="confirm-delete">
                <button onClick={handleDelete}>Confirm Delete</button>
                <button onClick={() => confirmDelete.current.close()}>Cancel</button>
            </div>
        </dialog>
        
    </>)
}