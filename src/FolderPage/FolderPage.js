import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NoteCard from '../NoteCard/NoteCard';
import AddNoteButton from '../AddNoteButton/AddNoteButton';

import './FolderPage.css';

class FolderPage extends Component {

  render(){
    return(
	<ul>
        {this.props.notes.map(note=>{
            return(
                <li key={note.id}>
                  <Link to={`/note/${note.id}`}>
		    <NoteCard note={note} />
                  </Link>
                </li>
            );
        })}
	<li className='home-add-note-button'><AddNoteButton folderId={this.props.folderId}/></li>
	</ul>

    );
  }

}

export default FolderPage;
