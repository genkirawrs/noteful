import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import NoteCard from '../NoteCard/NoteCard';
import AddNoteButton from '../AddNoteButton/AddNoteButton';
import NoteCardError from '../NoteCardError/NoteCardError';


import NotefulContext from '../NotefulContext.js';
import './HomePage.css';

class HomePage extends Component {
  static contextType = NotefulContext;

  render(){
    const { notes } = this.context;

    return(
	<ul>
        {notes.map(note=>{
            return(
		<li key={note.id}>
		<NoteCardError key={note.id}>
		  <Link to={`/note/${note.id}`}>
		    <NoteCard noteId={note.id} modified={note.modified} name={note.name} />
		  </Link>
		</NoteCardError>
		</li>
	    );
        })}
	<li className='home-add-note-button'><AddNoteButton/></li>
	</ul>
    );
  }

}

export default HomePage;
