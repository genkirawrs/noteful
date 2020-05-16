import React from 'react';
import ReactDOM from 'react-dom';
import DefaultPage from './DefaultPage';

it('default page renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DefaultPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
