import React, { useState } from "react";
import { useUserData, useArticleTable, useArticleUsers } from '../../hook/allHook';
import './Profile.css';
import { CommentsForNews, TrashForTable, Star } from '../../SVGimg/SVG'

const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
};

function getCurrentDate(separator = '.') {
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${date < 10 ? `0${date}` : `${date}`}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year}`
}

const ModuleAddArticle = ({ id, name, onClose }) => {
    const { addArticle } = useArticleTable()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState(getCurrentDate())

    // Обработчик изменения заголовка
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    // Обработчик изменения описания
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    // Обработчик отправки статьи
    const handleSubmit = () => {
        const star = document.getElementById('star-select').value
        addArticle(title, description, date, id, name, star);
        onClose();
        window.location.reload();
    };

    return (
        <div className="module-add-artlce">
            <div className='container-modal-add-article'>
                <div className='container-data-author-article'>
                    <div className='author-none'>{name}</div>
                    <div className='star-con'>
                        <Star />
                        <select name="star-select" id="star-select">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className='data'>{date}</div>
                </div>
                <div className='title'>
                    Title:
                    <input
                        className="input-title-article"
                        type="text"
                        maxLength="45"
                        onChange={handleTitleChange}
                    />
                </div>
                <div className="text-area">
                    <textarea
                        type="text"
                        maxLength="60000"
                        onChange={handleDescriptionChange}
                    />
                </div>
                <div className='container-button-send-and-close'>
                    <button className='close' onClick={() => onClose()}>
                        CLOSE
                    </button>
                    <button className='send' onClick={handleSubmit}>
                        SEND
                    </button>
                </div>
            </div>
        </div>
    )
}

const Profile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { articlesTable, deleteArticle } = useArticleTable();
    const { userMainData, errorUserMainData } = useUserData();
    const { OpenArticleUsers } = useArticleUsers();

    if (errorUserMainData) {
        return <div>Error: {errorUserMainData.message}</div>;
    }

    function openModuleArticle() {
        setIsModalOpen(true);
    }

    function closeModuleArticle() {
        setIsModalOpen(false);
    }

    return (
        <div className="container-profile">
            <div className="profile">
                {userMainData.map(userMainData => (
                    <>
                        <div className="text-profile" key={userMainData.id}>
                            <div>Welcome, {userMainData.name}</div>
                            <div className="avatar"></div>
                            <div style={{ marginTop: '20px' }}>My article</div>
                            <div className="add-article" >
                                <button onClick={() => openModuleArticle()}>+Artlce</button>
                            </div>
                        </div>
                        <div className='contant-news'>
                            {articlesTable.map(articlesTable => {
                                if (userMainData.id === articlesTable.authorId) {
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
                                            <div className='container-button'>
                                                <div className="comments">
                                                    <button className='heart-for-comments-article' onClick={() => OpenArticleUsers(articlesTable.id)}>
                                                        <CommentsForNews />
                                                    </button>
                                                </div>
                                                <button onClick={() => deleteArticle(articlesTable.id)}>
                                                    <TrashForTable />
                                                </button>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return null
                                }
                            })}
                        </div>
                        {isModalOpen && (
                            <ModuleAddArticle id={userMainData.id} name={userMainData.name} onClose={closeModuleArticle} />
                        )}
                    </>
                ))}
            </div>
        </div>
    );
}

export default Profile;
