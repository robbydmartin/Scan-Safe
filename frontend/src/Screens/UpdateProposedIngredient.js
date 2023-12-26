import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import InfluencerService from "../Services/InfluencerService";
import axios from 'axios';
import AuthService from "../Services/AuthService";

const UpdateProposedIngredient = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [checkProposal, setCheckProposal] = useState();

    const [proposedIngredient, setProposedIngredient] = useState({
        id: id,
        name: "",
        risk: "",
        website: "",
        comments: ""
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setProposedIngredient({ ...proposedIngredient, [e.target.name]: value });
    };

    function getProposedIngredients() {
        const user = AuthService.getCurrentUser();
        if (user) {
            const token = user.accessToken;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            axios.get("http://localhost:8080/api/proposedIngredients/propIngredient/" + id, config).then(response => {
                setProposedIngredient(response.data);
            }).catch(error => {
                console.log(error);
            })
        }
    }

    function handleRedirects() {
        const roles = AuthService.getCurrentUser().roles;
        if (roles.includes("ROLE_USER")) {
            navigate("/");
        }
        if (roles.includes("ROLE_ADMIN")) {
            navigate("/admin");
        }
    }

    useEffect(() => {
        getProposedIngredients();
        handleRedirects();
    }, []);

    function updateProposedIngredient(e) {
        e.preventDefault();
        const user = AuthService.getCurrentUser();
        if (user) {
            const token = user.accessToken;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            axios.put("http://localhost:8080/api/proposedIngredients/propIngredient/" + id,
                proposedIngredient, config).then(response => {
                    console.log(response);
                    window.location.reload(false);
                }).catch(error => {
                    console.log(error);
                })
        }
        navigate("/InfluencerDashboard");
    }

    const openModal = (e) => {
        e.preventDefault();
        InfluencerService.checkProposedIngredientWatchlist(proposedIngredient.name).then((response) => {
            if (response.data) {
                setCheckProposal("Ingredient is already in watchlist.");
            } else {
                setCheckProposal(null);
            };
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <div className="container pt-5">
            <h1 className="mb-4">Update ingredient or additive proposal</h1>
            <div className="bg-light-subtle p-4">

                <form>

                    <div className="mb-3">
                        <div className="form-group">
                            <label for="ingredientName" className="form-label">Ingredient</label>
                            <div className="input-group">

                                <input type="text" name="name" className="form-control"
                                    value={proposedIngredient.name} onChange={(e) => handleChange(e)} />
                                <span className="input-group-text" id="basic-addon2" onClick={openModal}>check</span>
                            </div>
                            {checkProposal && <div className="form-text" id="basic-addon4">{checkProposal}</div>}
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="form-group">
                            <label for="risks" className="form-label">Risks to humans</label>
                            <input type="text" name="risk" className="form-control"
                                value={proposedIngredient.risk} onChange={(e) => handleChange(e)} />
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="form-group">
                            <label for="basic-url" className="form-label">Supporting website</label>
                            <div className="input-group">
                                <span className="input-group-text" id="supportingWebsite">https://</span>
                                <input type="text" name="website" className="form-control" aria-describedby="basic-addon3 basic-addon4"
                                    value={proposedIngredient.website} onChange={(e) => handleChange(e)} />
                            </div>
                            <div className="form-text" id="basic-addon4">Any reputable site that provides documentation to support your proposal</div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="form-group">
                            <label for="comments" className="form-label">Comments</label>
                            <textarea className="form-control" name="comments" rows="5"
                                value={proposedIngredient.comments} onChange={(e) => handleChange(e)} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label for="ingredient" className="col-sm-2 col-form-label"></label>
                        <div className="col-sm-10">
                            <button type="button" onClick={() => navigate("/InfluencerDashboard")} className="btn btn-light" style={{ float: 'right' }} >Cancel</button>
                            <button disabled={checkProposal} type="submit" className="btn btn-success" onClick={updateProposedIngredient} style={{ float: 'right' }} >Submit</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
};
export default UpdateProposedIngredient;