import React, { Component } from 'react';

import NotefulContext from '../NotefulContext.js';
import './NoteSidebar.css';

class NoteSidebar extends Component {
  static contextType = NotefulContext;

  render(){
    const { folders, notes } = this.context;
    const noteId = this.props.match.params.noteId;
    let noteInfo = {}

    notes.forEach( (item) => {
        if( item.id === this.props.match.params.noteId){
            noteInfo = item;
        }
    });

    const folderId = noteInfo.folderId;
    let folder = {};
    folders.forEach( (item) => {
	if( item.id === folderId ){
	    folder = item;
	}
    });

    return(
        <div className='note-sidebar-folder'>
	<a className='note-sidebar-back-btn' onClick={()=>this.props.history.goBack()}>Go back</a>
	<h3>{folder.name}</h3>
	</div>
    );
  }

}

export default NoteSidebar;
