import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../Services/AuthService";
import AdminService from "../Services/AdminService";
import axios from "axios";
import authHeader from "../Services/auth-header";
import InfluencerService from "../Services/InfluencerService";



const Admin = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

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

    function getUsers() {
        setLoading(true);
        axios.get("http://localhost:8080/api/auth/all").then((response) => {
            setUsers(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
        setLoading(false);
    }
    function deleteUser(user) {
            axios.delete("http://localhost:8080/api/auth/delete/" + user.id).then(response => {
                console.log(response);
                window.location.reload(false);
            }).catch(error => {
                console.log(error);
            })
        }
    function makeBase(user) {
        axios.put("http://localhost:8080/api/auth/toBase/" + user.id).then(response => {
            console.log(response);
            window.location.reload(false);
        }).catch(error => {
            console.log(error);
        })
    }
    function makeInfluencer(user) {
        axios.put("http://localhost:8080/api/auth/toInfluencer/" + user.id).then(response => {
            console.log(response);
            window.location.reload(false);
        }).catch(error => {
            console.log(error);
        })
    }


    //       fetchData();


    useEffect(() => {
        //     const fetchData = async () => {
        //         setLoading(true);
        //         try {
        //            const response = await AdminService.getUsers();
        //           setUsers(response.data);
        //      } catch (error) {
        //           console.log(error);
        //      }
        //      setLoading(false);
        // };
        getUsers();
        // fetchData()
        handleRedirects();
    }, [])
    console.log(users);
    return (
        <div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>
                        Users
                    </th>
                    <th>
                         Email
                    </th>
                    <th>
                        Access
                    </th>
                    <th>
                        Action
                    </th>
                </tr>
                </thead>
                {users.length !== 0 && (
                    <tbody>
                    {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                {user.roles.map((role) => {
                                    return (
                                        <td>{role.name}</td>
                                    );
                                })}
                                <td>
                                    <button type="button" className="btn btn-secondary dropdown-toggle"
                                            data-bs-toggle="dropdown" aria-expanded="true">Action
                                    </button>
                                    <ul className="dropdown-menu">
                                    <li>
                                        <button className="dropdown-item btn-success" type="button" onClick={() => makeInfluencer(user)}>Make Influencer
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" className="dropdown-item btn-danger" onClick={() => makeBase(user)}>Make Base</button>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                        <li className="dropdown-item btn-warning" type="button" onClick={() => deleteUser(user)}>
                                           Ban User
                                        </li>
                                </ul>
                                </td>
                            </tr>

                        )
                    )}
                    </tbody>
                )}
            </table>

        </div>

    );
}
    export default Admin;


