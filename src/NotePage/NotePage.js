import React, { Component } from 'react';
import NoteCard from '../NoteCard/NoteCard';
import NoteCardError from '../NoteCardError/NoteCardError';

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
	if( item.id == this.props.match.params.noteId){
	    noteInfo = {
		id: item.id,
		date_modified: item.date_modified,
		name: item.title,
		content:item.content
	    }
        }
    });
    return(
        <div className='notepage'>
	<NoteCardError key={noteInfo.id}>
            <NoteCard content={noteInfo.content} noteId={noteInfo.id} modified={noteInfo.date_modified} name={noteInfo.name} onDeleteNote={this.handleDeleteNote}/>
	</NoteCardError>
        <p>{noteInfo.content}</p>
        </div>
    );
  }

}

export default NotePage;
