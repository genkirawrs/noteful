import React, { Component } from 'react';
import ValidationError from '../ValidationError/ValidationError';

import NotefulContext from '../NotefulContext.js';
import './AddNote.css';

class AddNote extends Component {
  static contextType = NotefulContext;

  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: '',
        touched: false
      },
      folderId: {
        value: '',
        touched: false
      },
      content: {
        value: '',
        touched: false
      },
      error: null
    }
  }

  updateNoteName(noteName) {
    this.setState({name: {value: noteName, touched: true}});
  }

  updateNoteFolder(noteFolder) {
    this.setState({folderId: {value: noteFolder, touched: true}});
  }

  updateNoteContent(noteContent) {
    this.setState({content: {value: noteContent, touched: true}});
  }

  validateNoteName(){
    const noteName = this.state.name.value.trim();
    if (noteName.length === 0) {
      return 'Note name is required';
    }
  }

  validateNoteFolder(){
    const noteFolder = this.state.folderId.value.trim();
    if (noteFolder === 'default' || noteFolder.length === 0) {
      return 'Please select a folder to place note in.';
    }
  }


  handleSubmit(event){
    event.preventDefault();
    const {name, folderId, content} = this.state;
    

    const addNoteInfo = {
        name: name.value,
	folderId: folderId.value,
	content: content.value,
	modified: new Date().toISOString(),
    }

    this.setState({ error: null })

    fetch('http://localhost:9090/notes', {
      method: 'POST',
      body: JSON.stringify(addNoteInfo),
      headers: {
        'content-type': 'application/json',
      }
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
	this.props.history.push(`/folder/${folderId.value}`)
        this.context.addNote(data)
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  componentDidMount(){
    if( this.context.folders.filter((folder)=> {return folder.id === this.props.match.params.folderId}) ){
	this.updateNoteFolder(this.props.match.params.folderId);
    }
  }

  render(){
    const noteNameError = this.validateNoteName();
    const noteFolderError = this.validateNoteFolder();


    const { error } = this.state;
    let folderSelect = 'default';//default folder drop down select

    if( this.state.folderId.touched === false && this.context.folders.filter((folder)=> {return folder.id === this.props.match.params.folderId}) ){
	//if state has not been updated yet and the prop being passed in is in the folder list, set the default drop down to that
	folderSelect = this.props.match.params.folderId;
    }else if (this.state.folderId.touched){
	//or, if state has been updated, set default drop down selected as what is saved in state
	folderSelect = this.state.folderId.value;
    }

    return(
        <div className='add-note'>
            <h2>Add New Note</h2>
            <form className='add-note-form' onSubmit={e=>this.handleSubmit(e)}>
              <div className='add-note-error' role='alert'>
                {error && <p className='error-msg'>Error: {error.message}</p>}
              </div>
                <label htmlFor='note_name'>New Note Title: {'   '}</label>
                <input
                    type='text' name='note_name' id='note_name' placeholder='Stuff'
                    onChange={e=> this.updateNoteName(e.target.value)}
                />
                {this.state.name.touched && (<ValidationError message={noteNameError}/>)}

		<br/><br/>

                <label htmlFor='note_folder'>Note Folder: {'   '}</label>
		<select className='add-note-dropdown'
                    name='note_folder' id='note_folder'
                    onChange={e=> this.updateNoteFolder(e.target.value)}
		    value= {folderSelect}
                >
		<option key='default' value='default'>Select a folder</option>
		{this.context.folders.length > 0 ?
		  (
		    this.context.folders.map((folder,index) => {

			return <option key={folder.id} value={folder.id}>{folder.name}</option>
		    })
		  )
		:null }
		</select>
		{this.state.folderId.touched && (<ValidationError message={noteFolderError}/>)}
		<br/><br/>

                <label htmlFor='note_content'>Add Content to Note: {'   '}</label>
                <textarea className='add-note-textarea'
                    type='text' name='note_content' id='note_content'
                    onChange={e=> this.updateNoteContent(e.target.value)}
                />

		<br/><br/>

                <button type='submit' className='add-note-button'
                    disabled = {
                        this.validateNoteName() ||
			this.validateNoteFolder()
                    }
                >
                   Add Note
                </button>
            </form>
        </div>
    );
  }

}

export default AddNote;

