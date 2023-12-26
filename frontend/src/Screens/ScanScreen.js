import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Scanner from "../components/Scanner";
import AuthService from "../Services/AuthService";

function ScanScreen() {
    const navigate = useNavigate();

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
        handleRedirects();
    }, [])
    return (
        <div className="container pt-5">
            <div className="text-center align-items-center">
                <h1 className="mb-5">Scan a product</h1>
                <Scanner />
            </div>
        </div>
    );
}

export default ScanScreen;