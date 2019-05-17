import * as React from 'react';
import {BaseReact} from 'components/@shared/BaseReact';
import WithRoute from 'components/@shared/WithRoute';
import {ROUTES} from 'constant';
import logo from 'assets/img/logo.svg';
import {_} from 'utils/gettext';
import './index.scss';

export interface IIndexProps {

}

export interface IIndexState {

}

@WithRoute(ROUTES.home)
export default class Index extends BaseReact<IIndexProps, IIndexState> {

  componentDidMount() {
    console.log('index')
  }

  render() {
    return (
      <div className='Index'>
        <img className='logo' src={logo} alt='logo' />
        <h1 className='welcome'>{_('Welcome to Dubo!')}</h1>
      </div>
    )
  }
}
