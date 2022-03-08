import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Posts from './routes/Posts';
import Post from './routes/Post';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:categoryId">
          <Posts />
        </Route>
        <Route path="/">
          <Posts />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
