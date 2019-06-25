import * as React from 'react';
import {BaseReact} from 'components/@shared/BaseReact';
import './index.scss';

export interface I[componentName]Props {
  onBtnClick?(): void;
}

export interface I[componentName]State {
  btnTxt: string;
}

export default class Button extends BaseReact<I[componentName]Props, I[componentName]State> {
  state = {
    btnTxt: '确认'
  }

  render() {
    const {btnTxt} = this.state;
    const {onBtnClick} = this.props;

    return (
      <div className='[componentName]'>
        <button onClick={onBtnClick}>{btnTxt}</button>
      </div>
    )
  }
}