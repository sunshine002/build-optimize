// import _ from 'lodash';
import printMe from './print.js';
import React, { Component } from 'react';
import { render } from 'react-dom';

import CodeSplitingInRouter from './react-router-code-spliting';

render(
  <CodeSplitingInRouter />,
  document.getElementById('app')
);
