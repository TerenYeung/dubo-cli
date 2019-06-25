import * as React from 'react';
import {BaseReact} from 'components/@shared/BaseReact';
import './index.less';

export default class [componentName] extends BaseReact {
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