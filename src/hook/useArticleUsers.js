import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { mainLink } from '../components/data';
import { useNavigate } from 'react-router-dom';

function useArticleUsers() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [articleUsers, setArticleUsers] = useState([]); 

    useEffect(() => {
        fetch(`${mainLink}/articleusers/${id}`, {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data)) {
                setArticleUsers(data);
            } else {
                setArticleUsers([data]); 
            }
        })
        .catch(error => console.error('Error fetching data:', error));
    }, [id]);

    function OpenArticleUsers(userId) {
        navigate(`../article/${userId}`);
    }

    return { articleUsers, OpenArticleUsers };
}

export default useArticleUsers;
