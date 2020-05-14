import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NoteCard from '../NoteCard/NoteCard';
import AddNoteButton from '../AddNoteButton/AddNoteButton';
import NoteCardError from '../NoteCardError/NoteCardError';


import NotefulContext from '../NotefulContext.js';
import './FolderPage.css';

class FolderPage extends Component {
  static contextType = NotefulContext;

  render(){
    const { notes } = this.context;
    const folderNotes = notes.filter( ({folderId})=> folderId === this.props.match.params.folderId);
    return(
	<ul>
        {folderNotes.map(note=>{
            return(
                <li key={note.id}>
		<NoteCardError key={note.id}>
                  <Link to={`/note/${note.id}`}>
		    <NoteCard noteId={note.id} modified={note.modified} name={note.name}  />
                  </Link>
		</NoteCardError>
                </li>
            );
        })}
	<li className='home-add-note-button'><AddNoteButton folderId={this.props.match.params.folderId}/></li>
	</ul>

    );
  }

}

export default FolderPage;
