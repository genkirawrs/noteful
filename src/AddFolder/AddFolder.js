import React, { Component } from 'react';
import ValidationError from '../ValidationError/ValidationError';

import NotefulContext from '../NotefulContext.js';
import './AddFolder.css';

class AddFolder extends Component {
  static contextType = NotefulContext;

  constructor(props) {
    super(props);
    this.state = {
      folder_name: {
        value: '',
        touched: false
      },
      error: null
    }
  }

  updateFolderName(folderName) {
    this.setState({folder_name: {value: folderName, touched: true}});
  }

  validateFolderName(){
    const folderName = this.state.folder_name.value.trim();
    if (folderName.length === 0) {
      return 'Folder name is required';
    }
  }

  handleSubmit(event){
    event.preventDefault();
    const {folder_name} = this.state;

    const addFolderInfo = {
	name: folder_name.value
    }

    this.setState({ error: null })
    fetch('http://localhost:9090/folders', {
      method: 'POST',
      body: JSON.stringify(addFolderInfo),
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
        this.props.history.push(`/folder/${data.id}`)
        this.context.addFolder(data)
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  render(){
    const folderNameError = this.validateFolderName();
    const { error } = this.state;

    return(
        <div className='add-folder'>
            <h2>Add New Folder</h2>
	    <form className='add-folder-form' onSubmit={e=>this.handleSubmit(e)}>
              <div className='add-folder-error' role='alert'>
                {error && <p>Error: {error.message}</p>}
              </div>
		<label htmlFor='folder_name'>New Folder Name</label>
		<input 
		    type='text' name='folder_name' id='folder_name' placeholder='Stuff'
		    onChange={e=> this.updateFolderName(e.target.value)}
		/>
		{this.state.folder_name.touched && (<ValidationError message={folderNameError}/>)}

		<button type='submit' className='add-folder-button'
		    disabled = {
			this.validateFolderName()
		    }
		>
		   Add Folder
		</button>
	    </form>
        </div>
    );
  }

}

export default AddFolder;
