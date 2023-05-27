import React, { useEffect, useState } from "react";
import axios from "axios";

const UserInfo = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get("/api/user-info/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setUserInfo(response.data);
                console.log(response.data);
            } catch (error) {
                // Handle error
            }
        };

        fetchUserInfo();
    }, []);

    if (!userInfo) {
        return <div>Loading user information...</div>;
    }

    return (
        <div>
            <h2>User Information</h2>
            <p>Username: {userInfo.username}</p>
            {/* Render other user information fields */}
        </div>
    );
};

export default UserInfo;
