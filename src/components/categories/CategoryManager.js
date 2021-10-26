import React, { useEffect, useState } from "react";
import "./CategoryManager.css"

export const CategoryManager = () => {
    const [categories, setCategories] = useState([])
    const [newCat, setNewCat] = useState("")
    const [editMode, setEditMode] = useState(false)

    const getCats = () => {
        const copy = { ...newCat }
        copy.label = ""
        setNewCat(copy)
        fetch('http://127.0.0.1:8088/categories')
            .then(res => res.json())
            .then(cats => setCategories(cats))
    }

    useEffect(() => {
        getCats()
    }, []
    )

    const setCategory = (event) => {
        let copy = { ...newCat }
        copy.label = event.target.value
        setNewCat(copy)
    }

    const postCategory = (event) => {
        event.preventDefault()
        return fetch('http://127.0.0.1:8088/categories', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCat)
        }).then(() => getCats())
    }

    const editCategory = () => {
        setEditMode(true)
        console.log("Editing category")
    }
    const deleteCategory = () => {
        console.log("Deleting category")
    }
    const updateCategory = () => {
        console.log("Updating category")
    }

    return (<>
        <h2>Category Manager</h2>
        <article className="cat-manager">
            <section>
                <ul>
                    {categories?.map(cat => {
                        return <li key={cat.id}>
                            <div className="cat-list-item">
                                {cat.label}
                                <div>
                                    <button className="edit-delete"
                                        onClick={editCategory}>🔧</button>
                                    <button className="edit-delete"
                                        onClick={deleteCategory}>❌</button>
                                </div>
                            </div>
                        </li>
                    })}
                </ul>
            </section>
            <section>
                <div className="new-category-form">
                    <fieldset>
                        <h3>Create a new category</h3>
                        <input type="text" placeholder="Add category"
                            value={newCat.label}
                            onChange={setCategory} />
                        {editMode ?
                            <><button className="submit-cat"
                                onClick={updateCategory}>Update</button></>
                            : <><button className="submit-cat"
                                onClick={postCategory}>Create</button></>}
                        {editMode ?
                            <><button className="submit-cat"
                                onClick={() => setEditMode(false)}>Cancel</button></>
                            : ""
                        }
                    </fieldset>
                </div>
            </section>
        </article>
    </>)
}