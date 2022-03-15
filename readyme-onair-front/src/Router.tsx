import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Posts from './routes/Posts';
import Post from './routes/Post';
import Design from './routes/Categories/Design';
import Develop from './routes/Categories/Develop';
import PD from './routes/Categories/PD';
import TeamBuild from './routes/Categories/TeamBuild';
import Daily from './routes/Categories/Daily';
import Write from './routes/Write';
import { Login } from './routes/Login';
import MyPage from './routes/MyPage';

const Router = () => {
  return (
    //<BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path={'/design'} element={<Design />} />
        <Route path={'/develop'} element={<Develop />} />
        <Route path={'/pd'} element={<PD />} />
        <Route path={'/teambuild'} element={<TeamBuild />} />
        <Route path={'/daily'} element={<Daily />} />
        <Route path={'/write'} element={<Write />} />
        <Route path={'/post/:id'} element={<Post />} />
        <Route path={'/post'} element={<Post />} />
        <Route path={'/login'} element={<Login/>}></Route>
        <Route path={'/mypage'} element={<MyPage/>}></Route>
      </Routes>
    //</BrowserRouter>
  );
};

export default Router;
