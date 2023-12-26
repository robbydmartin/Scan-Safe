import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import AuthService from "../Services/AuthService";

function YourIngredientsScreen() {
    const [newIngredient, setNewIngredient] = useState("");
    const [ingredients, setIngredients] = useState([]);

    const navigate = useNavigate();

    function addIngredient(e) {
        e.preventDefault();
        const user = AuthService.getCurrentUser();
        if (user) {
            const token = user.accessToken;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            axios.post("http://localhost:8080/api/personal-ingredients/save", {
                name: newIngredient
            }, config).then(response => {
                console.log(response);
                window.location.reload(false);
            }).catch(error => {
                console.log(error);
            })
        }
    }

    function getIngredients() {
        const user = AuthService.getCurrentUser();
        if (user) {
            const token = user.accessToken;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            axios.get("http://localhost:8080/api/personal-ingredients/all-from-user", config).then(response => {
                setIngredients(response.data);
            }).catch(error => {
                console.log(error);
            })
        }
    }

    function deleteIngredient(ingredient) {
        const user = AuthService.getCurrentUser();
        if (user) {
            const token = user.accessToken;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            axios.delete("http://localhost:8080/api/personal-ingredients/delete/" + ingredient.id, config).then(response => {
                console.log(response);
                window.location.reload(false);
            }).catch(error => {
                console.log(error);
            })
        }
    }

    function handleRedirects() {
        const user = AuthService.getCurrentUser();
        if (user) {
            const roles = user.roles;
            if (roles.includes("ROLE_INFLUENCER")) {
                navigate("/InfluencerDashboard");
            }
            if (roles.includes("ROLE_ADMIN")) {
                navigate("/admin");
            }
        } else {
            navigate("/login")
        }
    }

    useEffect(() => {
        getIngredients();
        handleRedirects();
    }, [])

    return (
        <div>
            <div className="container py-5">
            <h1 class="mb-4">Your ingredients</h1>
            <div class="d-flex flex-row mb-4">
                <form onSubmit={addIngredient}>
                    <input type="text" value={newIngredient} onChange={e => setNewIngredient(e.target.value)} placeholder="Enter ingredient" style={{marginRight: "10px"}}></input>
                    <button type="submit" class="btn btn-success">Add</button>
                </form>
            </div>        
            </div>
            { ingredients.length !== 0 &&
                <div class="bg-light-subtle p-4">
                    { ingredients.map((ingredient, i) => {
                        return (
                            <p>
                                { ingredient.name }
                                <span class="text-danger ps-4" onClick={() => deleteIngredient(ingredient)} style={{cursor: "pointer"}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" class="">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                    </svg>
                                </span>
                            </p>
                        )
                    }) }
                </div>
            }
        </div>
    )
}

export default YourIngredientsScreen;