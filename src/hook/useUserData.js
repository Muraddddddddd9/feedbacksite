import { useState, useEffect } from 'react';
import { mainLink } from '../components/data'

function useUserData() {
  const [userMainData, setUserMainData] = useState([]);
  const [errorUserMainData, setErrorUserMainData] = useState(null);

  useEffect(() => {
    const loginDataString = localStorage.getItem("userIDandCookieKeyForLoginAndRegister");

    if (!loginDataString) {
      setErrorUserMainData('Login data is missing');
      return;
    }

    fetch(`${mainLink}/userMainData/${loginDataString}`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(userData => setUserMainData(userData))
      .catch(errorUserData => setErrorUserMainData(errorUserData.message));
  }, []);

  return { userMainData, errorUserMainData };
}

export default useUserData;