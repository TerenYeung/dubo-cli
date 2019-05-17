import * as React from 'react';
import {Route} from 'react-router-dom';
import {RouteProps} from 'react-router';

export default function WithRoute(path: string, option?: RouteProps): any {
  return function(Component: new(...args: any[]) => React.Component<any>) {
    return function() {
      return <Route path={path} {...{exact: true, ...option}} render={props => <Component {...props} />} />
    }
  }
}

/*
const WithRoute = (path: string, option?: RouteProps) => (Component: new(...args: any[]) => React.Component<any>) => <Route path={path} {...option} render={props=> <Component {...props} />} />
*/
