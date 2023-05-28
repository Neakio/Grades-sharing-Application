import React, { useState } from "react";
import { login } from "../../../services/api/log";
import { useNavigate } from "react-router-dom";
const LoginForm = (setIsLoggedIn) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = () => {
        login(username, password)
            .then(() => {
                navigate("/");
                setIsLoggedIn(true);
            })
            .catch((error) => {
                // Handle login error
            });
    };

    return (
        <div>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginForm;
