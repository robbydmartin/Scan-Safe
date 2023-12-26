import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfluencerService from '../Services/InfluencerService'
import AuthService from "../Services/AuthService";

import axios from "axios";

function InfluencerDashboard() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [alternativeProducts, setAlternativeProducts] = useState([]);
    const [proposedIngredients, setProposedIngredients] = useState([]);

    function getAlternativeProducts() {
        const user = AuthService.getCurrentUser();
        if (user) {
            const token = user.accessToken;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            axios.get("http://localhost:8080/api/alternativeProducts/all", config).then(response => {
                setAlternativeProducts(response.data);
            }).catch(error => {
                console.log(error);
            })
        }
    }

    function getProposedIngredients() {
        const user = AuthService.getCurrentUser();
        if (user) {
            const token = user.accessToken;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            axios.get("http://localhost:8080/api/proposedIngredients/all", config).then(response => {
                setProposedIngredients(response.data);
            }).catch(error => {
                console.log(error);
            })
        }
    }

    function handleRedirects() {
        const user = AuthService.getCurrentUser();
        if (user) {
            const roles = user.roles;
            if (roles.includes("ROLE_USER")) {
                navigate("/");
            }
            if (roles.includes("ROLE_ADMIN")) {
                navigate("/admin");
            }
        } else {
            navigate("/login")
        }
    }

    function deleteAlternativeProduct(e, id) {
        e.preventDefault();
        const user = AuthService.getCurrentUser();
        if (user) {
            const token = user.accessToken;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            axios.delete("http://localhost:8080/api/alternativeProducts/delete/" + id, config).then(response => {
                console.log(response);
                window.location.reload(false);
            }).catch(error => {
                console.log(error);
            })
        }
    }

    function deleteProposedIngredient(e, id) {
        e.preventDefault();
        const user = AuthService.getCurrentUser();
        if (user) {
            const token = user.accessToken;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            axios.delete("http://localhost:8080/api/proposedIngredients/delete/" + id, config).then(response => {
                console.log(response);
                window.location.reload(false);
            }).catch(error => {
                console.log(error);
            })
        }
    }

    useEffect(() => {
          /*
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await InfluencerService.getAlternativeProducts();
                const response2 = await InfluencerService.getProposedIngredients();
                setAlternativeProducts(response.data);
                setProposedIngredients(response2.data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };

        fetchData();
        */
        getAlternativeProducts();
        getProposedIngredients();
        handleRedirects();
    }, []);

    /*
    const deleteAlternativeProduct = (e, id) => {
        e.preventDefault();
        if (user) {
            const token = user.accessToken;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
        InfluencerService.deleteAlternativeProduct(id, config).then((response) => {
            if (alternativeProducts) {
                setAlternativeProducts((prevElement) => {
                    return prevElement.filter((alternativeProduct) => alternativeProduct.id !== id);
                });
            }
        });
    };
    
    const deleteProposedIngredient = (e, id) => {
        e.preventDefault();
        InfluencerService.deleteProposedIngredient(id).then((response) => {
            if (proposedIngredients) {
                setProposedIngredients((prevElement) => {
                    return prevElement.filter((proposedIngredient) => proposedIngredient.id !== id);
                })
            }
        })

    };
    */
    const editAlternativeProduct = (e, id) => {
        e.preventDefault();
        navigate("/UpdateAlternativeProduct/" + id);
    };

    const editProposedIngredient = (e, id) => {
        e.preventDefault();
        navigate("/UpdateProposedIngredient/" + id)
    };

    return (
        <div className="container pt-5">
            <h1 className="mb-4">Hello, influencer!</h1>
            <br></br>
            <br></br>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th colspan='3'><h5>Your suggestion list:</h5></th>
                        <th style={{ textAlign: 'right' }}><a href="/AlternativeProductForm"><button type="button" className="btn btn-success">Create new</button></a></th>
                    </tr>
                </thead>
                {alternativeProducts && (
                    <tbody>
                        {alternativeProducts.map((alternativeProduct) => (
                            <tr key={alternativeProduct.id}>
                                <td>{alternativeProduct.altProduct}</td>
                                <td>replaces</td>
                                <td>{alternativeProduct.replacesProduct}</td>
                                <td style={{ textAlign: 'right' }}>
                                    <button type="button" onClick={(e, id) => editAlternativeProduct(e, alternativeProduct.id)} className="btn btn-light" style={{ marginRight: '10px' }}>Edit</button>
                                    
                                    <button type="button" onClick={(e, id) => deleteAlternativeProduct(e, alternativeProduct.id)} className="btn btn-outline-danger" style={{ float: 'right' }}>Delete</button>

                                </td>
                            </tr>
                        ))}
                </tbody>
                )}
            </table>

            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th colspan='3'><h5>Your ingredient watchlist proposals:</h5></th>
                        <th style={{ textAlign: 'right' }}><a href="/ProposedIngredientForm"><button type="button" className="btn btn-success">Create new</button></a></th>
                    </tr>
                    <tr>
                        <th>Ingredient</th>
                        <th>Risk</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                {proposedIngredients && (
                    <tbody>
                        {proposedIngredients.map((proposedIngredient) => (
                       <tr key={proposedIngredient.id}>
                            <td>{proposedIngredient.name}</td>
                            <td>{proposedIngredient.risk}</td>
                            {(() => {
                                if (proposedIngredient.approved) { return <td>Approved</td> }
                                else if (proposedIngredient.rejected) { return <td>Rejected</td> }
                                else { return <td>Pending</td> }
                                })()}
                                <td style={{ textAlign: 'right' }}>
                                <button type="button" onClick={(e, id) => editProposedIngredient(e, proposedIngredient.id)} className="btn btn-light" style={{ marginRight: '10px' }}>Edit</button>
                                <button type="button" onClick={(e, id) => deleteProposedIngredient(e, proposedIngredient.id)} className="btn btn-outline-danger" style={{ float: 'right' }}>Delete</button>
                             </td>
                       </tr>
                ))}
            </tbody>
            )}
        </table>

    </div>
    
    );
};

export default InfluencerDashboard;