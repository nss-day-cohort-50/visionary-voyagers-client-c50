import React, { useEffect, useState } from "react";
import "./CategoryManager.css"

export const CategoryManager = () => {
    const [categories, setCategories] = useState([])
    const [newCat, setNewCat] = useState("")

    console.log(categories)

    const getCats = () => {
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

    return (<>
        <h2>Category Manager</h2>
        <article className="cat-manager">
            <section>
                <ul>
                    {categories?.map(cat => {
                        return <li key={cat.id}>{cat.label}</li>
                    })}
                </ul>
            </section>
            <section>
                <div className="new-category-form">
                    <fieldset>
                        <h3>Create a new category</h3>
                        <input type="text" placeholder="Add category"
                            onChange={setCategory} />
                        <button className="submit-cat"
                            onClick={postCategory}>Create</button>
                    </fieldset>
                </div>
            </section>
        </article>
    </>)
}