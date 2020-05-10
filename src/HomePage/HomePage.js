import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NoteCard from '../NoteCard/NoteCard';
import AddNoteButton from '../AddNoteButton/AddNoteButton';

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
		  <Link to={`/note/${note.id}`}>
		    <NoteCard noteId={note.id} modified={note.modified} name={note.name} />
		  </Link>
		</li>
	    );
        })}
	<li className='home-add-note-button'><AddNoteButton folderId='0'/></li>
	</ul>
    );
  }

}

export default HomePage;
