import React from "react";
import { updateStatus } from "./AdminProvider";


export const AdminModal = ({ confirmDelete, userId, render, activate, status }) => {
    
    const handleChange = () => {
        updateStatus(status, userId)
            .then(()=>render())
            .then(
                confirmDelete.current.close()
            )
    }

    return (<>
        <dialog className="confirmDeleteModal" ref={confirmDelete}>
            <h2>{`Are you sure you want to ${activate} this user's account?`}</h2>
            <div className="confirm-delete">
                <button onClick={handleChange}>Confirm Change</button>
                <button onClick={() => confirmDelete.current.close()}>Cancel</button>
            </div>
        </dialog>
        
    </>)
}