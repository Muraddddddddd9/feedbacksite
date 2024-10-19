import { useArticleUsers, useUserTable, useUserData, useComment } from '../../hook/allHook';
import { Star } from '../../SVGimg/SVG';
import { useState } from 'react';
import './ArticleUsers.css';

function getCurrentDate(separator = '.') {
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${date < 10 ? `0${date}` : `${date}`}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year}`
}

const ArticleUsers = () => {
    const { articleUsers } = useArticleUsers();
    const { userMainData } = useUserData()
    const { OpenProfileUsers } = useUserTable();
    const [ date, setDate ] = useState(getCurrentDate())
    const { comments, createNewComments } = useComment()

    if (!articleUsers) {
        return <div>Loading...</div>;
    }

    function newComments(idusers, nameusers, idpost, idusersauthor, description = document.querySelector('.des-comment').value) {
        createNewComments(idusers, nameusers, idpost, idusersauthor, description, date)
        window.location.reload();
    }

    return (
        <div className='news-tape'>
            <div className='contant-news'>
                {articleUsers.map(articleUsers =>
                    userMainData.map(userMainData => {
                        return (
                            <div key={articleUsers.id}>
                                <div className='container-news-full'>
                                    <div className='container-data-author'>
                                        <div className='author' onClick={() => OpenProfileUsers(articleUsers.authorId)}>{articleUsers.author}</div>
                                        <div className='star-con'>
                                            <Star /> {articleUsers.star}
                                        </div>
                                        <div className='data'>{articleUsers.date}</div>
                                    </div>
                                    <div className='title'>
                                        Title: {articleUsers.title}
                                    </div>
                                    <div className="text" >
                                        {articleUsers.description}
                                    </div>
                                    <div className='container-commits'>
                                        COMMENTS
                                        <div className='container-data-author-article'>
                                            <div className='author-none'>{userMainData.name}</div>
                                            <div className='data'>{date}</div>
                                        </div>
                                        <div className='container-commits-input'>
                                            <input type="text" className='des-comment' placeholder="Enter your comment" maxLength={200}/>
                                            <button className='comment-button' onClick={() => newComments(userMainData.id, userMainData.name, articleUsers.id, articleUsers.authorId)}>
                                                Send
                                            </button>
                                        </div>
                                        {comments.map(comments => {
                                            if (comments.idpost === articleUsers.id) {
                                                return (
                                                    <div className='comments-list'>
                                                        <div>
                                                            <div className='container-data-author'>
                                                                <div className='author' onClick={() => OpenProfileUsers(comments.idusers)}>{comments.nameusers}</div>
                                                                <div className='data'>{comments.date}</div>
                                                            </div>
                                                            <div className="text" >
                                                                {comments.description}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        }
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    );
}

export default ArticleUsers;
