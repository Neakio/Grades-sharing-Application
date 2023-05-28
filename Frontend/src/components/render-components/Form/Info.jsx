import React, { useEffect, useState } from "react";
import axios from "axios";

const UserInfo = (logout) => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const response = await axios.get("/api/user-info/", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setUserInfo(response.data);
        };
        fetchUserInfo();
    }, []);

    return userInfo;
};

export default UserInfo;
