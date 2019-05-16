import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import utils from 'utils';
import 'styles/index.[styleSuffix]';

utils.setRootFontSizeFromClient();
utils.initI18n(navigator.language);

ReactDOM.render(<App />, document.getElementById('app'));
