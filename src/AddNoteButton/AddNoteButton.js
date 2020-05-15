import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './AddNoteButton.css';

class AddNoteButton extends Component {
  render(){
    return(
	<Link className='add-note-btn' to={`/addNote/${this.props.folderId}`}>Add Note</Link>
    );
  }

}

AddNoteButton.defaultProps = {
    folderId: 'none'
}

AddNoteButton.propTypes = {
    folderId: PropTypes.string.isRequired
}

export default AddNoteButton;
