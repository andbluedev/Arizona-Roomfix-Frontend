import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { HomePage } from '../pages/home/HomePage';
import { AboutPage } from '../pages/about/AboutPage';
import { FilePage } from '../pages/tp/TpPage';
import { BuildingPage } from '../pages/building/BuildingPage';
import { RoomPage } from '../pages/room/RoomPage';
export const AppRoutes = () => (
  <Switch>
    <Route path='/about'>
      <AboutPage />
    </Route>

    <Route exact path='/'>
      <HomePage />
    </Route>

    <Route path='/room/:id'>
      <RoomPage />
    </Route>

    <Route path='/tp'>
      <FilePage />
    </Route>
    <Route path='/building/:id'>
      <BuildingPage />
    </Route>
  </Switch>
);
