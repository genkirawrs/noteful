import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NoteCard from '../NoteCard/NoteCard';
import AddNoteButton from '../AddNoteButton/AddNoteButton';

import NotefulContext from '../NotefulContext.js';

class NotePage extends Component {
  static contextType = NotefulContext;

  handleDeleteNote = () => {
    this.props.history.push(`/`)
  }

  render(){
    const { notes } = this.context;
    let noteInfo = {};
    notes.forEach( (item) => {
	if( item.id === this.props.match.params.noteId){
	    noteInfo = item;	  
        }
    });

    return(
        <div className='notepage'>
        <NoteCard noteId={noteInfo.id} modified={noteInfo.modified} name={noteInfo.name} onDeleteNote={this.handleDeleteNote}/>
        <p>{noteInfo.content}</p>
        </div>
    );
  }

}

export default NotePage;
