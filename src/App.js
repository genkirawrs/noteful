import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './Header';
import HomePage from './HomePage/HomePage';
import FolderPage from './FolderPage/FolderPage';
import NotePage from './NotePage/NotePage';
import HomeSidebar from './HomeSidebar/HomeSidebar';
import FolderSidebar from './FolderSidebar/FolderSidebar';
import NoteSidebar from './NoteSidebar/NoteSidebar';
import DefaultSidebar from './DefaultSidebar/DefaultSidebar';
import AddNote from './AddNote/AddNote';
import AddFolder from './AddFolder/AddFolder';
import NotePageError from './NotePageError/NotePageError';
import DefaultPage from './DefaultPage/DefaultPage';

import NotefulContext from './NotefulContext.js';

import './App.css';

class App extends Component {
  state = {
    folders: [],
    notes: [],
    error: null,
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

    Promise.all([
        fetch(folder_url, {method:'GET', headers: {'content-type': 'application/json'}}).then(response=>response.json()).then(data=>{return data;}),
        fetch(notes_url, {method:'GET', headers: {'content-type': 'application/json'}}).then(response=>response.json()).then(data=>{return data;})
    ]).then( arr =>{
        this.setLists(arr[0],arr[1]);
    }).catch((error)=>{
        this.setState({
          error: 'uho, something went wrong'
        });
    })
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

export default App;
