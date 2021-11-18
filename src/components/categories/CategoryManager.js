import React, { useEffect, useState } from "react";
import { Link }from 'react-router-dom'
import "./CategoryManager.css"
import { deleteCategory, getCats, postCategory, updateCategory, getPostsByCat } from "./CategoryProvider";

export const CategoryManager = () => {
    const [categories, setCategories] = useState([])
    const [newCat, setNewCat] = useState({})
    const [editMode, setEditMode] = useState(false)
    const [triggerRender, setTrigger] = useState(0)
    const [admin, setAdmin] = useState(Boolean)

    const render = () =>{
        getCats()
            .then(res => res.json())
            .then(cats => setCategories(cats))
            setNewCat({label:""})
    }
    useEffect(() => {
        render()
        if (localStorage.getItem("is_admin") === "true"){
            setAdmin(true)
        }else{
            setAdmin(false)
        }
    }, [, triggerRender]
    )

    const setCategory = (event) => {
        let copy = { ...newCat }
        copy.label = event.target.value
        setNewCat(copy)
    }
    const updateTrigger = () => {
        let copy = triggerRender
        copy++
        setTrigger(copy)
    }

    const editCategory = (cat) => {
        setEditMode(true)
        const copy = { ...newCat }
        copy.label = cat.label
        copy.id = cat.id
        setNewCat(copy)
    }

    return (<>
        <h2>Category Manager</h2>
        <article className="cat-manager">
            <section>
                <ul>
                    {categories?.map(cat => {
                        return <li key={cat.id}>
                            <div className="cat-list-item">
                                <Link to={`/posts?postsbycategory=${cat.id}`}>{cat.label}</Link>
                                {admin ?<div>
                                    <button className="edit-delete"
                                        onClick={() => { editCategory(cat) }}>🔧</button>
                                    <button className="edit-delete"
                                        onClick={() => {
                                            deleteCategory(cat.id)
                                                .then(()=>render())
                                        }
                                        }>❌</button>
                                </div>:""}
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
                                onClick={() => updateCategory(newCat)
                                    .then(()=> render())}>Update</button></>
                            : <><button className="submit-cat"
                                onClick={() => {
                                    postCategory(newCat)
                                        .then(()=>render())
                                }}>Create</button></>}
                        {editMode ?
                            <><button className="submit-cat"
                                onClick={() => {
                                    setEditMode(false)
                                    render()
                                }}>Cancel</button></>
                            : ""
                        }
                    </fieldset>
                </div>
            </section>
        </article>
    </>)
}