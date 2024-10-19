import React from 'react';
import { useArticleTable, useUserTable, useArticleUsers } from '../../hook/allHook';
import './Article.css'
import { TrashForTable } from '../../SVGimg/SVG'

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

const Article = () => {
  const { OpenArticleUsers } = useArticleUsers()
  const { articlesTable, errorArticlesTable, deleteArticle } = useArticleTable();
  const { OpenProfileUsers } = useUserTable();

  if (errorArticlesTable) {
    return <div>Error: {errorArticlesTable}</div>;
  }

  return (
    <div className='db-article'>
      <table className='table-db-article'>
        <thead className='head-db-article'>
          <tr className='tr-db-article'>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Star</th>
            <th>Author</th>
            <th>Date</th>
            <th>Delete</th>
            <th>Page</th>
          </tr>
        </thead>
        <tbody className='body-db-article'>
          {articlesTable.map(articlesTable => (
            <tr key={articlesTable.id}>
              <td>{articlesTable.id}</td>
              <td>{truncateText(articlesTable.title, 10)}</td>
              <td>{truncateText(articlesTable.description, 30)}</td>
              <td>{articlesTable.star}</td>
              <td
                className='go-link-user-page-in-article'
                onClick={() => OpenProfileUsers(articlesTable.authorId)}>
                {articlesTable.author}({articlesTable.authorId})
              </td>
              <td>{articlesTable.date}</td>
              <td>
                <button onClick={() => deleteArticle(articlesTable.id)}>
                  <TrashForTable />
                </button>
              </td>
              <td className="go-link-article-page" onClick={() => OpenArticleUsers(articlesTable.id)}>
                GO
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Article;
