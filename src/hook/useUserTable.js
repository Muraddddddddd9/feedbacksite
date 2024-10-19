import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mainLink } from '../components/data'

function useUsersTable() {
    const [usersTable, setUsersTable] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${mainLink}/users`, { 
            credentials: 'include' 
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(users => setUsersTable(users))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    function deleteUsers(id) {
        fetch(`${mainLink}/users/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setUsersTable(usersTable.filter(user => user.id !== id));
            })
            .catch(error => console.error('Error deleting user:', error));
    }

    function OpenProfileUsers(userId) {
        navigate(`../profile/${userId}`)
    }

    return {
        usersTable, setUsersTable,
        deleteUsers,
        OpenProfileUsers,
    }
}

export default useUsersTable;