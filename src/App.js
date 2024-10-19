import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Protected, Register, NotFound, ProfileUsers, ArticleUsers } from './components/data.js'
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/regstr" element={<Register />} />
                <Route path="/home" element={<Protected Component={Home} />} />
                <Route path="/profile/:id" element={<Protected Component={ProfileUsers} />} />
                <Route path="/article/:id" element={<Protected Component={ArticleUsers} />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;