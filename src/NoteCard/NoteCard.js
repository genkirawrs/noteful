import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NotefulContext from '../NotefulContext.js';
import './NoteCard.css';

class NoteCard extends Component {
  static contextType = NotefulContext;

  formatDate = (string) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([],options);
  }


  deleteNoteRequest = (noteId)=>{
    const delete_url = `http://localhost:8000/notes/${noteId}`;
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
    let modifiedDate = '';
    const date = Date.parse(this.props.modified);
    if(!isNaN(date)){
	modifiedDate = `Date modified on ${this.formatDate(this.props.modified)}`;
    }
    if( this.props.noteId > 0 && this.props.name.length > 0 ){
      return(
        <NotefulContext.Consumer>
  	  {(context) => (
            <div className='notecard'>
              <h2>{this.props.name}</h2>
              <br/>
  	      <div className='notecard-details'>
                {modifiedDate}
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
    }else{
      return <div className='notecard'><h2>Sorry, nothing to display</h2></div>;
    }
  }

}


NoteCard.defaultProps = {
    onDeleteNote: ()=>{},
    noteId: '',
    modified:'',
    name:'',
}

NoteCard.propTypes = {
    noteId: PropTypes.number.isRequired,
    modified: (props, propName, componentName) => {
	const prop = props[propName];
	const date = Date.parse(prop);
	  if(isNaN(date)){
	    return new Error('Invalid Date String');
	  }
    },
    name: PropTypes.string.isRequired,
}


export default NoteCard;
