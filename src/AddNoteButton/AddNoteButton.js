import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './AddNoteButton.css';

class AddNoteButton extends Component {
  render(){
    return(
	<Link className='add-note-btn' to={`/addNote/${this.props.folderId}`}>Add Note</Link>
    );
  }

}

export default AddNoteButton;
