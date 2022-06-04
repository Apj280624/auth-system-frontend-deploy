import React, { useState, useEffect} from "react";
import jwtDecode from 'jwt-decode';
import {useNavigate} from "react-router-dom";

const axios = require("axios").default;

function Posts() {
    
    const [userActivity, setUserActivity] = useState({
        noOfPosts: 0,
        noOfUpVotes: 0
    });

    const navigate = useNavigate();

    // check whether the user who is trying to access this page, is authorized or not

    async function fetchData() {
        try {
            const response = await axios.get("http://localhost:4000/posts", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });

            console.log(response.data); 
            setUserActivity({
                noOfPosts: response.data.noOfPosts,
                noOfUpVotes: response.data.noOfUpVotes
            });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token) {
            const decodedToken = jwtDecode(token);
            if(decodedToken) {
                // fetch data from server
                fetchData();
            } else {
                localStorage.removeItem("token");
            }
        }
    },[]); // pass an empty array so that useEffect is called only on the first mount, else it will fall into an infinite loop
    // this is mentioned in docs above on the start of the code

    function handleClick() {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <div>
            <h1>You have {userActivity.noOfPosts} posts</h1>
            <h1>You have {userActivity.noOfUpVotes} votes</h1>
            <button onClick={handleClick}>Logout</button>
        </div>
    );
}

export default Posts;