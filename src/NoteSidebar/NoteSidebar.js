import React, { Component } from 'react';

import NotefulContext from '../NotefulContext.js';
import './NoteSidebar.css';

class NoteSidebar extends Component {
  static contextType = NotefulContext;

  render(){
    const { folders, notes } = this.context;
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
	<button className='note-sidebar-back-btn' onClick={()=>this.props.history.goBack()}>Go back</button>
	<h3>{folder.name}</h3>
	</div>
    );
  }

}

export default NoteSidebar;
