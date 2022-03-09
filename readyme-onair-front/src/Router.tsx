import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Posts from './routes/Posts';
import Post from './routes/Post';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:categoryId" element={ <Posts />}>
        </Route>
        <Route path="/" element={ <Posts />}>
        </Route>
        <Route path="/post">
              <Route path=":id" element={<Post/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
