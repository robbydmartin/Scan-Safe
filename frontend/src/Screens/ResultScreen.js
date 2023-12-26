import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios, { all } from "axios";
import AlternativeProduct from "../components/AlternativeProduct";
import AuthService from "../Services/AuthService";

function ResultScreen() {
    const [productName, setProductName] = useState("");
    const [productImageUrl, setProductImageUrl] = useState("");
    const [allergenList, setAllergenList] = useState([]);
    const [ingredientList, setIngredientList] = useState([]);
    const [flaggedIngredientList, setFlaggedIngredientList] = useState([]);
    const [flaggedToRef, setFlaggedToRef] = useState({});
    const [personalIngredients, setPersonalIngredients] = useState([]);
    const [openFoodError, setOpenFoodError] = useState(false);
    const [flaggedError, setFlaggedError] = useState(false);
    const [alternativeProducts, setAlternativeProducts] = useState([]);

    let { upc } = useParams();
    const navigate = useNavigate();

    const getProductInfo = () => {
        axios.get(`https://world.openfoodfacts.org/api/v2/product/${upc}.json`).then((response) => {
            setProductName(response.data.product.product_name);

            if (response.data.product.selected_images !== null && response.data.product.selected_images.front) {
                setProductImageUrl(response.data.product.selected_images.front.display.en);
            }

            const allergens = response.data.product.allergens_hierarchy;
            let allergensArr = [];
            allergens.forEach((allergen, _) => {
                const allergenSplit = allergen.split(":");
                allergensArr.push(allergenSplit[allergenSplit.length - 1]);
            });
            setAllergenList(allergensArr);
            
            if (response.data.product.ingredients) {
                const ingredients = response.data.product.ingredients;
                let ingredientArr = [];
                ingredients.forEach((ingredient, _) => {
                    ingredientArr.push(ingredient.text);
                });
                setIngredientList(ingredientArr);
            }
        }).catch(error => {
            setOpenFoodError(true);
        });
    }

    const getFlaggedIngredients = () => {
        const user = AuthService.getCurrentUser();
        if (user) {
            const token = user.accessToken;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            axios.get("http://localhost:8080/api/ingredients/all", config).then((response) => {
                const ingredients = response.data;
                let ingredientArr = [];
                let flaggedToRefTemp = {};
                ingredients.forEach((ingredient, _) => {
                    if (ingredient.name !== null) {
                        flaggedToRefTemp[ingredient.name] = ingredient.reference;
                        ingredientArr.push(ingredient.name.toLowerCase());
                    }
                });
                setFlaggedToRef(flaggedToRefTemp);
                setFlaggedIngredientList(ingredientArr);
            }).catch(error => {
                setFlaggedError(true);
            })
        }
    }

    function getPersonalIngredients() {
        const user = AuthService.getCurrentUser();
        if (user) {
            const token = user.accessToken;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            axios.get("http://localhost:8080/api/personal-ingredients/all-from-user", config).then(response => {
                const ingredients = response.data;
                let ingredientArr = [];
                ingredients.forEach((ingredient, _) => {
                    ingredientArr.push(ingredient.name);
                });
                setPersonalIngredients(ingredientArr);
            }).catch(error => {
                console.log(error);
            })
        }
    }

    function getAlternativeProducts() {
        const user = AuthService.getCurrentUser();
        if (user) {
            const token = user.accessToken;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            axios.get("http://localhost:8080/api/alternativeProducts/" + upc, config).then(response => {
                const alternatives = response.data;
                let alternativeArr = [];
                alternatives.forEach((alternative, _) => {
                    alternativeArr.push(alternative.altProduct);
                })
                setAlternativeProducts(alternativeArr);
                console.log(alternativeArr);
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
        getProductInfo();
        getFlaggedIngredients();
        getPersonalIngredients();
        getAlternativeProducts();
        handleRedirects();
    }, [navigate]);

    return (
        <div>
            <div className="container py-5">
                { openFoodError && 
                    <div class="alert alert-danger fs-5" role="alert">Product not found in OpenFoodFacts database.</div>
                }
                { flaggedError && 
                    <div class="alert alert-danger fs-5" role="alert">Unable to get flagged ingredient list.</div>
                }

                { !openFoodError && !flaggedError &&
                <div className="row">
                <div className="col-3">
                    { productImageUrl !== "" ?
                        <img src={productImageUrl} alt={"image of " + productName} className="rounded" style={{width: "250px"}} />
                    :
                        <div className="bg-secondary-subtle rounded w-100 h-100"></div>
                    }
                </div>
                    <div className="col ps-5">
                        <h1 className="mb-4">{productName}</h1>

                        { ingredientList.length !== 0 ?
                        <p className="fs-4 text-body-secondary mb-4">
                            {/* { ingredientList.map((ingredient, i) => {
                                const flagged = flaggedIngredientList.includes(ingredient);
                                const reference = flaggedToRef[ingredient.toLowerCase()];
                                return (
                                    flagged ?
                                        <span>
                                            <a href={reference} target="_blank" rel="noopener noreferrer">
                                                <span key={ingredient} className="text-danger text-decoration-underline">
                                                    { ingredient.toLowerCase() }
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right ms-1" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                                        <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                                                    </svg>
                                                </span>
                                            </a>
                                            { i < ingredientList.length - 1 && <span className="text-body-secondary">, </span>}
                                        </span>
                                    :
                                        <span key={ingredient}>
                                            { ingredient.toLowerCase() }
                                            { i < ingredientList.length - 1 && ", "}
                                        </span>
                                );
                            })} */}

                            { ingredientList.map((ingredient, i) => {
                                const flagged = flaggedIngredientList.includes(ingredient);
                                const personallyFlagged = personalIngredients.includes(ingredient);
                                const reference = flaggedToRef[ingredient.toLowerCase()];
                                return (
                                    (flagged || personallyFlagged) ?
                                        <span>
                                            <a href={flagged ? reference : "/your-ingredients"} target="_blank" rel="noopener noreferrer">
                                                <span key={ingredient} className="text-danger text-decoration-underline">
                                                    { ingredient.toLowerCase() }
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right ms-1" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                                                        <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                                                    </svg>
                                                </span>
                                            </a>
                                            { i < ingredientList.length - 1 && <span className="text-body-secondary">, </span>}
                                        </span>
                                    :
                                    <span key={ingredient}>
                                        { ingredient.toLowerCase() }
                                        { i < ingredientList.length - 1 && ", "}
                                    </span>
                                )
                            })}
                        </p>
                        :
                            <div class="alert alert-danger fs-5" role="alert">Ingredient list not found.</div>
                        }
                        
                        { ingredientList.length !== 0 &&
                            <p className="fs-5 text-body-secondary mb-4">
                                Allergens: { allergenList.map((allergen, i) => {
                                    return (
                                        <span key={allergen}>
                                            { allergen.toLowerCase() }
                                            { i < allergenList.length - 1 && ", "}
                                        </span>
                                    );
                                })}
                            </p>
                        }

                        <a href={`https://world.openfoodfacts.org/product/${upc}`} target="_blank" rel="noopener noreferrer">
                            <button className="btn btn-success mb-5">See more</button>
                        </a>
                        { alternativeProducts.length !== 0 &&
                            <div>
                                <h4 class="mb-3">Alternative products:</h4>
                                { alternativeProducts.map((alternative, i) => {
                                    console.log(upc);
                                    return (
                                        <AlternativeProduct upc={alternative} />
                                    )
                                })}
                            </div>
                        }
                    </div>
                </div>
                }
            </div>
        </div>
    );
}

export default ResultScreen;