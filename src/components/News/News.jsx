import React, { useState } from 'react';
import { useArticleTable, useUserTable, useArticleUsers, useUserData } from '../../hook/allHook'
import './News.css'
import { CommentsForNews, Star } from '../../SVGimg/SVG';

const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
};

const News = () => {
    const { articlesTable, deleteArticles } = useArticleTable();
    const { OpenProfileUsers } = useUserTable();
    const { userMainData } = useUserData();
    const { OpenArticleUsers } = useArticleUsers();

    return (
        <div className='news-tape'>
            <div className='contant-news'>
                {userMainData.map(userMainData =>
                    articlesTable.map(articlesTable => {
                        if (userMainData.id !== articlesTable.authorId) {
                            return (
                                <div className='container-news' key={articlesTable.id}>
                                    <div className='container-data-author'>
                                        <div className='author' onClick={() => OpenProfileUsers(articlesTable.authorId)}>{articlesTable.author}</div>
                                        <div className='star-con'>
                                            <Star /> {articlesTable.star}
                                        </div>
                                        <div className='data'>{articlesTable.date}</div>
                                    </div>
                                    <div className='title'>
                                        Title: {articlesTable.title}
                                    </div>
                                    <div className="text">
                                        {articlesTable.description.length > 450 ?
                                            <>
                                                {truncateText(articlesTable.description, 450)}
                                                <div className='continuation' onClick={() => OpenArticleUsers(articlesTable.id)}>Continuation...</div>
                                            </>
                                            :
                                            articlesTable.description
                                        }
                                    </div>
                                    <div className='container-heart'>
                                        <button className='heart-for-comments-article' onClick={() => OpenArticleUsers(articlesTable.id)}>
                                            <CommentsForNews />
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                    })
                )}
            </div>
        </div>
    );
};

export default News;
