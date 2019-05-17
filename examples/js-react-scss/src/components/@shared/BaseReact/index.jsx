import * as React from 'react';
import queryString from 'query-string';
import $api from 'services';
import $store from 'store';
import {$wxshare} from 'lib';

export class BaseReact extends React.Component {
  $api = $api;
  $store = $store;
  $share = $wxshare;
  $qs = queryString;
}

export class BasePureReact extends React.PureComponent {
  $api = $api;
  $store = $store;
  $share = $wxshare;
  $qs = queryString;
}

