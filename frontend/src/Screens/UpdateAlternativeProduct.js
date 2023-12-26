import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AuthService from "../Services/AuthService";

const UpdateAlternativeProduct = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [alternativeProduct, setAlternativeProduct] = useState({
        id: id,
        altProduct: "",
        replacesProduct: "",
        upc: "",
        notes: ""
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setAlternativeProduct({ ...alternativeProduct, [e.target.name]: value });
    };

    function handleRedirects() {
        const roles = AuthService.getCurrentUser().roles;
        if (roles.includes("ROLE_USER")) {
            navigate("/");
        }
        if (roles.includes("ROLE_ADMIN")) {
            navigate("/admin");
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

            axios.get("http://localhost:8080/api/alternativeProducts/altProduct/" + id, config).then(response => {
                setAlternativeProduct(response.data);
            }).catch(error => {
                console.log(error);
            })
        }
    }
    useEffect(() => {
        getAlternativeProducts();
        handleRedirects();
    }, []);

    function updateAlternativeProduct(e) {
        e.preventDefault();
        const user = AuthService.getCurrentUser();
        if (user) {
            const token = user.accessToken;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            axios.put("http://localhost:8080/api/alternativeProducts/altProduct/" + id,
                alternativeProduct, config).then(response => {
                    console.log(response);
                    window.location.reload(false);
                }).catch(error => {
                    console.log(error);
                })
        }
        navigate("/InfluencerDashboard");
    }

    return (
        <div className="container pt-5">

            <h1 className="mb-4">Update your suggestion:</h1>
 
            <div className="bg-light-subtle p-4">

                <form>

                    <div className="mb-3">
                        <div className="form-group">
                            <label for="replacesProduct" className="form-label">Product name</label>
                            <input type="text" name="replacesProduct" className="form-control"
                                value={alternativeProduct.replacesProduct} onChange={(e) => handleChange(e)} />
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="form-group">
                            <label for="upc" className="form-label">Barcode number</label>
                            <input type="text" name="upc" className="form-control"
                                value={alternativeProduct.upc} onChange={(e) => handleChange(e)} />
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="form-group">
                            <label for="altProduct" className="form-label">Healthy alternative</label>
                            <input type="text" name="altProduct" className="form-control"
                                value={alternativeProduct.altProduct} onChange={(e) => handleChange(e)} />
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="form-group">
                            <label for="notes" className="form-label">Update your thoughts on these awesome alternatives!</label>
                            <textarea name="notes" className="form-control" rows="5"
                                value={alternativeProduct.notes} onChange={(e) => handleChange(e)} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label for="ingredient" className="col-sm-2 col-form-label"></label>
                        <div className="col-sm-10">
                            <button type="button" onClick={() => navigate("/InfluencerDashboard")} className="btn btn-light" style={{ float: 'right' }}>Cancel</button>
                            <button className="btn btn-success" onClick={updateAlternativeProduct} style={{ float: 'right' }} >Update</button>
                        </div>
                    </div>

                </form>
            </div>

        </div>

    )
}
export default UpdateAlternativeProduct;