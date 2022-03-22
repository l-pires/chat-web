import React from 'react';
import { Routes, Route, Navigate } from 'react-router';

import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Chat from './Chat';

const Router = (props) => (
  <Routes>
    <Route exact path="/" element={<Home />} />
    <Route exact path="/signup" element={<Signup />} />
    <Route exact path="/login" element={<Login />} />
    <Route exact path="/chat" element={<Chat />} />
    <Route path="*" element={<Navigate replace to="/" />} />
  </Routes>
);

export default Router;
