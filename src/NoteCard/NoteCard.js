import React, { Component } from 'react';

import './NoteCard.css';

class NoteCard extends Component {
  formatDate = (string) => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([],options);
  }

  render(){
    const modifiedDate = this.formatDate(this.props.note.modified);

    return(
        <div className='notecard'>
            <h2>{this.props.note.name}</h2>
            <br/>
	    <div className='notecard-details'>
              <span>Date modified on {modifiedDate}</span>
	      <button className='notecard-delete-btn'>Delete Note</button>
	    </div>
        </div>
    );
  }

}

export default NoteCard;
