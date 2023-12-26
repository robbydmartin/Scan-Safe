import {useEffect, useState} from "react";
import AuthService from "../Services/AuthService";

function Navbar() {
    const [role, setRole] = useState("");

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            if (user.roles.includes("ROLE_ADMIN")) {
                setRole("admin");
            } else if (user.roles.includes("ROLE_INFLUENCER")) {
                setRole("influencer")
            } else {
                setRole("base");
            }
        }
    }, []);

    const logOut = () => {
        AuthService.logout();
        window.location.reload(false);
    };

    return (
        <div>
        <nav className="navbar navbar-expand-lg px-4 navbar-light bg-light">
            <a className="navbar-brand d-flex flex-row align-items-center" href="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-upc-scan" viewBox="0 0 16 16" style={{transform: "translateY(-3.5px)"}}>
                    <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5zM3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z"/>
                </svg>
                <h3 style={{marginLeft: "12px"}}>ScanSafe</h3>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                { role === "base" &&
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Scan</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/your-ingredients">Your ingredients</a>
                        </li>
                    </ul>
                }
                { role === "influencer" &&
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/InfluencerDashboard">Dashboard</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/AlternativeProductForm">Alternative product form</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/ProposedIngredientForm">Proposed ingredient form</a>
                        </li>
                    </ul>
                }
                { role === "admin" &&
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/admin">Users</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Proposals">Proposals</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Pizzatime">Product Lists</a>
                        </li>
                    </ul>
                }
                { role === "" &&
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/login">Login</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/register">Register</a>
                        </li>
                    </ul>
                }
            </div>
            { role !== "" &&
            <button onClick={logOut} className="btn btn-primary">Logout</button>
            }
        </nav>
        </div>
    );
}

export default Navbar;