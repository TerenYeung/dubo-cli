import * as React from 'react';
import {BaseReact} from 'components/@shared/BaseReact';
import WithRoute from 'components/@shared/WithRoute';
import {ROUTES} from 'constant';
import logo from 'assets/img/logo.svg';
import {_} from 'utils/gettext';
import './index.less';

export interface I[pageName]Props {

}

export interface I[pageName]State {

}

@WithRoute(ROUTES.home)
export default class [pageName] extends BaseReact<I[pageName]Props, I[pageName]State> {

  componentDidMount() {
    console.log('index')
  }

  render() {
    return (
      <div className='[pageName]'>
        <img className='logo' src={logo} alt='logo' />
        <h1 className='welcome'>{_('Welcome to Dubo!')}</h1>
      </div>
    )
  }
}
