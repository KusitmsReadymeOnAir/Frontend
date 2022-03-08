import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Posts from './routes/Posts';
import Post from './routes/Post';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:categoryId">
          <Posts />
        </Route>
        <Route path="/">
          <Posts />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
