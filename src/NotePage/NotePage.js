import React, { Component } from 'react';
import NoteCard from '../NoteCard/NoteCard';

import './NotePage.css';

class NotePage extends Component {

  render(){
    return(
	<div className='notepage'>
	<NoteCard note={this.props.note}/>
	<p>{this.props.note.content}</p>
	</div>
    );
  }

}

export default NotePage;
