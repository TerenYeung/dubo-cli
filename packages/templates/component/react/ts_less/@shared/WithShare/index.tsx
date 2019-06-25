import * as React from 'react';
import { BaseReact } from 'components/@shared/BaseReact';
import { SHARE_DATA } from 'constant';

const WithShare = (WrappedComponent): any => {
  return class extends BaseReact {
    componentWillMount() {
      this.$share && this.$share(SHARE_DATA);
    }

    render() {
      return (
        <WrappedComponent
          {
          // @ts-ignore
          ...this.props
          }
        />
      )
    }
  }
}

export default WithShare;