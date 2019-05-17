import * as React from 'react';
import {Route} from 'react-router-dom';

export default function WithRoute(path, option) {
  return function(Component) {
    return function() {
      return <Route path={path} {...{exact: true, ...option}} render={props => <Component {...props} />} />
    }
  }
}

/*
const WithRoute = (path: string, option?: RouteProps) => (Component: new(...args: any[]) => React.Component<any>) => <Route path={path} {...option} render={props=> <Component {...props} />} />
*/
