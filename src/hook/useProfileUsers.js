import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { mainLink } from '../components/data';

function useProfileUsers() {
    const { id } = useParams();
    const [profileUsers, setProfileUsers] = useState(null);

    useEffect(() => {
        fetch(`${mainLink}/profileusers/${id}`, {
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
                setProfileUsers(data);
            } else {
                setProfileUsers([data]);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
    }, [id]);

    return { profileUsers };
}

export default useProfileUsers;