import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../Services/AuthService";
import axios from "axios";
import InfluencerService from "../Services/InfluencerService";
const Proposals = () => {
    const navigate = useNavigate();
    const [props, setProps] = useState([]);

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
    function getProps() {

        axios.get("http://localhost:8080/api/proposedIngredients/all").then((response) => {
            setProps(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })

    }
    const deleteProposedIngredient = (e, id) => {
        e.preventDefault();
        InfluencerService.deleteProposedIngredient(id).then((response) => {
            if (props) {
                setProps((prevElement) => {
                    return prevElement.filter((proposedIngredient) => proposedIngredient.id !== id);
                })
            }
        })

    };
    function approve(prop) {

        axios.put("http://localhost:8080/api/proposedIngredients/approve/"+prop.id).then((response) => {
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })

    }
    useEffect(() => {
        handleRedirects();
        getProps();
    }, [])

    return (
        <div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        Risk
                    </th>
                    <th>
                        Comments
                    </th>
                    <th>
                        Website
                    </th>
                    <th>
                        Status
                    </th>
                    <th>
                        Action
                    </th>
                </tr>
                </thead>
                {props.length !== 0 && (
                    <tbody>
                {props.map((prop) => (
                    <tr key={prop.id}>
                <td>{prop.name}</td>
                <td>{prop.risk}</td>
                        <td>{prop.comments}</td>
                        <td><a href={prop.website}>link</a></td>

                {(() => {
                    if (prop.approved) { return <td>Approved</td> }
                    else if (prop.rejected) { return <td>Rejected</td> }
                    else { return <td>Pending</td> }
                })()}
                        <td>
                            <button type="button" className="btn btn-secondary dropdown-toggle"
                                    data-bs-toggle="dropdown" aria-expanded="true">Action
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <button className="dropdown-item btn-success" type="button" onClick={() => approve(prop)}>Approve
                                    </button>
                                </li>
                                <li>
                                    <button type="button" className="dropdown-item btn-danger" onClick={() => deleteProposedIngredient(prop)}>Deny</button>
                                </li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>

                            </ul>
                        </td>
            </tr>
            ))}
        </tbody>
    )}


            </table>

        </div>
    )
}

export default Proposals;