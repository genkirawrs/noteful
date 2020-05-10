import React, { Component } from 'react';

import NotefulContext from '../NotefulContext.js';
import './NoteCard.css';

class NoteCard extends Component {
  static contextType = NotefulContext;

  static defaultProps = {
        onDeleteNote: ()=>{}
  }

  formatDate = (string) => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([],options);
  }


  deleteNoteRequest = (noteId)=>{
    const delete_url = `http://localhost:9090/notes/${noteId}`;
    fetch(delete_url, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => {
          throw error
        })
      }
      return res.json()
    })
    .then(data => {
      this.context.deleteNote(noteId);
      this.props.onDeleteNote();
    })
    .catch(error => {
      console.error(error)
    })
  }

  render(){
    const modifiedDate = this.formatDate(this.props.modified);
    return(
      <NotefulContext.Consumer>
	{(context) => (
          <div className='notecard'>
            <h2>{this.props.name}</h2>
            <br/>
	    <div className='notecard-details'>
              <span>Date modified on {modifiedDate}</span>
	      <button 
		onClick={(e)=> {
		    e.preventDefault();
		    this.deleteNoteRequest(this.props.noteId)
		}}
		className='notecard-delete-btn'
	      >Delete Note</button>
	    </div>
          </div>
	)}
      </NotefulContext.Consumer>
    );
  }

}

export default NoteCard;
