import * as React from 'react';
import { BaseReact } from 'components/@shared/BaseReact';
import AppRouter from './router';
import {hot} from 'react-hot-loader/root';

class App extends BaseReact {
  render() {
    return (
      <AppRouter />
    )
  }
}

export default hot(App);