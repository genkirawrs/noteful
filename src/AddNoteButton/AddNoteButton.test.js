import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Link } from 'react-router-dom';
import renderer from 'react-test-renderer';
import AddNoteButton from './AddNoteButton';

it('add note button renders without crashing', () => {
const tree = renderer.create(
    <BrowserRouter>
      <AddNoteButton/>
    </BrowserRouter>
  )
  .toJSON();
 expect(tree).toMatchSnapshot();
});
