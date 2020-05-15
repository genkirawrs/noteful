import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './Header';
import HomePage from './HomePage/HomePage';
import FolderPage from './FolderPage/FolderPage';
import NotePage from './NotePage/NotePage';
import HomeSidebar from './HomeSidebar/HomeSidebar';
import FolderSidebar from './FolderSidebar/FolderSidebar';
import NoteSidebar from './NoteSidebar/NoteSidebar';
import AddNote from './AddNote/AddNote';
import AddFolder from './AddFolder/AddFolder';
import NotePageError from './NotePageError/NotePageError';

import NotefulContext from './NotefulContext.js';

import './App.css';

class App extends Component {
  state = {
    folders: [],
    notes: [],
    error: '',
    handleDeleteNote: this.handleDeleteNote,
    addFolder: this.addFolder,
    addNote: this.addNote,
  }

  setLists = (folders, notes) => {
    this.setState({
      folders: folders,
      notes: notes,
      error: null,
    })
  }

  handleNoteDelete = (noteId) => {
    const notes = this.state.notes.filter( note => note.id !== noteId );

    this.setState({
	notes:notes
    })
  }

  componentDidMount(){
    const folder_url = 'http://localhost:9090/folders';
    const notes_url = 'http://localhost:9090/notes';

    Promise.all([fetch(folder_url), fetch(notes_url)])
	.then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));

                return Promise.all([notesRes.json(), foldersRes.json()]);
         })
         .then(([folders,notes]) => {
                this.setState({folders:folders, notes:notes});
         })
         .catch(error => {
		this.setState({error: 'Sorry, there was an error loading Noteful, please refresh or try again later.'});
         });


  }

  addFolder = folder => {
    this.setState({
      folders: [ ...this.state.folders, folder ],
    })
  }

  addNote = note => {
    this.setState({
      notes: [ ...this.state.notes, note],
    })
  }

  render(){
    if(this.state.error.length > 0){
	return(
	<div className='App'>
	<Header/>
	<main>
	<h2>{this.state.error}</h2>
	</main>
	</div>
	);
    }else{

      const contextValue = {
        folders: this.state.folders,
        notes: this.state.notes,
        deleteNote: this.handleNoteDelete,
        addFolder: this.addFolder,
        addNote: this.addNote,
      }
      return (
        <div className='App'>
  	  <Header/>
          <main>
	    <NotefulContext.Provider value={contextValue}>
   	    <nav>
	      <Switch>
	        <Route path='/folder/:folderId' component={FolderSidebar}/>
	        <Route path='/note/:noteId' component={NoteSidebar}/>
	        <Route component={HomeSidebar} />
	      </Switch>
	    </nav>
   	    <section>
	      <Switch>
                <NotePageError>
  	        <Route exact path='/' key='home' component={HomePage}/>

 	        <Route key='folder' path='/folder/:folderId' component={FolderPage}/>

	        <Route key='note' path='/note/:noteId' component={NotePage}/>

	        <Route key='add_note' path='/addNote/:folderId' component={AddNote}/>

                <Route key='add_folder' path='/addFolder/' component={AddFolder}/>

                </NotePageError>
	      </Switch>
	    </section>
	    </NotefulContext.Provider>
          </main>
        </div>
      );
    }
  }
}

export default App;
