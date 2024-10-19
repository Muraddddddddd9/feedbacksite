import React from "react";
import './ProfileUsers.css';
import { useArticleTable, useProfileUsers, useArticleUsers, } from "../../hook/allHook";
import { CommentsForNews, Star } from '../../SVGimg/SVG'

const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
};

const ProfileUsers = () => {
    const { articlesTable } = useArticleTable();
    const { profileUsers } = useProfileUsers();
    const { OpenArticleUsers } = useArticleUsers();

    if (!profileUsers) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container-profile">
            <div className="profile">
                {profileUsers.map(profileUsers => (
                    <>
                        <div className="text-profile" key={profileUsers.id}>
                            <div>{profileUsers.name}</div>
                            <div className="avatar"></div>
                            <div style={{ marginTop: '20px' }}>My article</div>
                        </div>
                        <div className='contant-news'>
                            {articlesTable.map(articlesTable => {
                                if (profileUsers.id === articlesTable.authorId) {
                                    return (
                                        <div className='container-news' key={articlesTable.id}>
                                            <div className='container-data-author'>
                                                <div className='author-none'>{articlesTable.author}</div>
                                                <div className='star-con'>
                                                    <Star /> {articlesTable.star}
                                                </div>
                                                <div className='data'>{articlesTable.date}</div>
                                            </div>
                                            <div className='title'>
                                                Title: {articlesTable.title}
                                            </div>
                                            <div className="text">
                                                {articlesTable.description.length > 450 ? (
                                                    <>
                                                        {truncateText(articlesTable.description, 450)}
                                                        <div className='continuation' onClick={() => OpenArticleUsers(articlesTable.id)}>Continuation...</div>
                                                    </>
                                                ) : (
                                                    articlesTable.description
                                                )}
                                            </div>
                                            <div className='container-heart'>
                                                <button className='heart-for-comments-article' onClick={() => OpenArticleUsers(articlesTable.id)}>
                                                    <CommentsForNews />
                                                </button>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return null;
                                }
                            })}
                        </div>
                    </>
                ))}
            </div>
        </div>
    );
}

export default ProfileUsers;
