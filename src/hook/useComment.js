import { useEffect, useState } from "react"
import { mainLink } from "../components/data";

function useComment() {
    const [comments, setComments] = useState([])

    useEffect(() => {
        fetch(`${mainLink}/comments`, {
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
                setComments(data);
            } else {
                setComments([data]); 
            }
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    function createNewComments(idusers, nameusers, idpost, idusersauthor, description, date) {
        const dataComment = {
          idusers: idusers,
          nameusers: nameusers,
          idpost: idpost,
          idusersauthor: idusersauthor,
          description: description,
          date: date,
        };
    
        fetch(`${mainLink}/newcomments`, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(dataComment)
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .catch(err => console.log("Error registering: ", err));
    }

    return { comments, createNewComments }
}

export default useComment