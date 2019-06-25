import * as React from 'react';
import $api from 'services';
import $store from 'store';
import {$wxshare} from 'lib';

export class BaseReact extends React.Component {
  $api = $api;
  $store = $store;
  $share = $wxshare;
}

export class BasePureReact extends React.PureComponent {
  $api = $api;
  $store = $store;
  $share = $wxshare;
}

