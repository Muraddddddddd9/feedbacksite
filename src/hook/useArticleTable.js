import { useState, useEffect } from 'react';
import { mainLink } from '../components/data'

function useArticleTable() {
  const [articlesTable, setArticlesTable] = useState([]);
  const [errorArticlesTable, setErrorArticlesTable] = useState(null);

  useEffect(() => {
    fetch(`${mainLink}/articles`, { credentials: "include" })
      .then(response => {
        if (!response.ok) {
          throw new Error("Error fetching articles");
        }
        return response.json();
      })
      .then(data => setArticlesTable(data))
      .catch(error => setErrorArticlesTable(error.message));
  }, []);

  function deleteArticle(id) {
    fetch(`${mainLink}/articles/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error deleting article');
        }
        setArticlesTable(prevArticles => prevArticles.filter(article => article.id !== id));
      })
      .catch(error => console.error('Error deleting article:', error));
  }

  function addArticle(title, description, date, authorId, author, star) {
    const dataArticle = {
      title: title,
      description: description,
      date: date,
      authorId: authorId,
      author: author,
      star: star,
    };

    fetch(`${mainLink}/newarticle`, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(dataArticle)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch(err => console.log("Error registering: ", err));
  }

  return { articlesTable, errorArticlesTable, deleteArticle, addArticle };
}

export default useArticleTable;