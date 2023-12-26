import React, {useEffect, useState} from "react";


import { useNavigate } from "react-router-dom";
import AuthService from "../Services/AuthService";
import AdminService from "../Services/AdminService";
import axios from "axios";
import authHeader from "../Services/auth-header";
import InfluencerService from "../Services/InfluencerService";


const Pizzatime = () => {
    const navigate = useNavigate();
    const [ings, setIngs] = useState([]);
    function handleRedirects() {
        const user = AuthService.getCurrentUser();
        if (user) {
            const roles = user.roles;
            if (roles.includes("ROLE_USER")) {
                navigate("/");
            }
            if (roles.includes("ROLE_INFLUENCER")) {
                navigate("/InfluencerDashboard");
            }
        } else {
            navigate("/login")
        }
    }
    function getIngs() {
        axios.get("http://localhost:8080/api/alternativeProducts/all").then((response) => {
            setIngs(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })

    }
    function deleteIngs(ing) {
        axios.delete("http://localhost/api/alterntiveProducts/delete/"+ing.id).then((response) => {
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        handleRedirects();
        getIngs();
    }, [])


    return(
        <div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>
                        Alternative
                    </th>
                    <th>
                        Original
                    </th>
                    <th>
                        upc
                    </th>
                    <th>
                        Notes
                    </th>
                    <th>
                        Action
                    </th>
                </tr>
                </thead>
                {ings.length !== 0 && (
                    <tbody>
                    {ings.map((ing) => (
                            <tr key={ing.id}>
                                <td>{ing.altProduct}</td>
                                <td>{ing.replacesProduct}</td>
                                <td>{ing.upc}</td>
                                <td>{ing.notes}</td>
                                <td>
                                    <button type="button" className="btn btn-danger"
                                             aria-expanded="true" onClick={deleteIngs(ing)}>delete
                                    </button>

                                </td>
                            </tr>

                        )
                    )}
                    </tbody>
                )}
            </table>

        </div>
    )
}
export default Pizzatime;