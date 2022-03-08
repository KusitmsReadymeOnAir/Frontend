import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Daily from './Categories/Daily';
import Design from './Categories/Design';
import Develop from './Categories/Develop';
import PD from './Categories/PD';
import TeamBuild from './Categories/TeamBuild';
import Upload from './Upload';

// 게시글 리스트 페이지
const Posts = () => {
  return (
    <div>
      <Switch>
        <Route path={`/design`}>
          <Design />
        </Route>
        <Route path={`/develop`}>
          <Develop />
        </Route>
        <Route path={`/pd`}>
          <PD />
        </Route>
        <Route path={`/teambuild`}>
          <TeamBuild />
        </Route>
        <Route path={`/daily`}>
          <Daily />
        </Route>
        <Route path={`/upload`}>
          <Upload />
        </Route>
      </Switch>
    </div>
  );
};

export default Posts;
