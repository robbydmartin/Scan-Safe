import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import InfluencerService from "../Services/InfluencerService";
import axios from 'axios';
import AuthService from "../Services/AuthService";

const AlternativeProductForm = () => {

    const navigate = useNavigate();
    const { username } = AuthService.getCurrentUser();

    const [alternativeProduct, setAlternativeProduct] = useState({
        username: username,
        altProduct: "",
        replacesProduct: "",
        upc: "",
        notes: ""
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setAlternativeProduct({ ...alternativeProduct, [e.target.name]: value });
    };
    /*
    const saveAlternativeProduct = (e) => {
        e.preventDefault();
        InfluencerService.saveAlternativeProduct(alternativeProduct).then((response) => {
        }).catch((error) => {
            console.log(error);
        });
        navigate("/InfluencerDashboard");
    };
    */
    function saveAlternativeProduct(e) {
        e.preventDefault();
        const user = AuthService.getCurrentUser();
        if (user) {
            const token = user.accessToken;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            axios.post("http://localhost:8080/api/alternativeProducts/save",
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

                <h1 className="mb-4">Suggest a replacement item:</h1>
                <p>Help your fellow ScanSafe users out by suggesting your favorite alternative for products with harmful ingredients!</p>

                <div className="bg-light-subtle p-4">

                    <form>

                        <div className="mb-3">
                            <div className="form-group">
                                <label for="replacesProduct" className="form-label">Product name</label>
                         <input type="text" name="replacesProduct" className="form-control" placeholder="Doritos, Hawaiian Punch, etc."
                             value={alternativeProduct.replacesProduct} onChange={(e) => handleChange(e)} />
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="form-group">
                                <label for="upc" className="form-label">Barcode number</label>
                         <input type="text" name="upc" className="form-control" placeholder=""
                             value={alternativeProduct.upc} onChange={(e) => handleChange(e)} />
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="form-group">
                                <label for="altProduct" className="form-label">Healthy alternative</label>
                         <input type="text" name="altProduct" className="form-control" placeholder="Beanfields Nacho Bean Chips"
                             value={alternativeProduct.altProduct} onChange={(e) => handleChange(e)} />
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="form-group">
                                <label for="notes" className="form-label">Share your thoughts on these awesome alternatives!</label>
                         <textarea name="notes" className="form-control" rows="5"
                             value={alternativeProduct.notes} onChange={(e) => handleChange(e)} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label for="ingredient" className="col-sm-2 col-form-label"></label>
                            <div className="col-sm-10">
                         <a href='InfluencerDashboard'><button type="button" className="btn btn-light" style={{ float: 'right' }}>Cancel</button></a>
                         <button className="btn btn-success" onClick={saveAlternativeProduct} style={{ float: 'right' }} >Submit</button>
                            </div>
                        </div>

                    </form>
                </div>

            </div>
        
   )
}
export default AlternativeProductForm;