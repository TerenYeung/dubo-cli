import * as React from 'react';
import {BrowserRouter, HashRouter} from 'react-router-dom';
import loadable from '@loadable/component';

const isProd = process.env.NODE_ENV === 'production';
// @todo modify your server path
const basename: string = !isProd ? '/' : '/activity/app';
const Router: any = !isProd
  ? HashRouter
  : BrowserRouter;

const routes: any[] = [
  {
    component: loadable(() => import(/* webpackChunkName: "Index" */ './pages/Index')),
  },
];

export default function AppRouter() {
  return (
    <Router basename={basename}>
      {routes.map((route, index) => <route.component key={index} />)}
    </Router>
  )
}