import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Header from './Header';
import HomePage from './HomePage/HomePage';
import FolderPage from './FolderPage/FolderPage';
import NotePage from './NotePage/NotePage';
import HomeSidebar from './HomeSidebar/HomeSidebar';
import FolderSidebar from './FolderSidebar/FolderSidebar';
import NoteSidebar from './NoteSidebar/NoteSidebar';
import AddNote from './AddNote/AddNote';
import AddFolder from './AddFolder/AddFolder';

import NotefulContext from './NotefulContext.js';

import './App.css';

class App extends Component {
  state = {
    folders: [],
    notes: [],
    error: null,
    handleDeleteNote: this.handleDeleteNote
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

  render(){

    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.handleNoteDelete
    }
    return (
      <div className='App'>
	<Header/>
        <main>
	  <NotefulContext.Provider value={contextValue}>
  	  <nav>
	    <Route exact path='/' component={HomeSidebar}/>

	    <Route path='/folder/:folderId' component={FolderSidebar}/>

	    <Route path='/note/:noteId' component={NoteSidebar}/>

	  </nav>
   	  <section>
	    <Route exact path='/' key='home' component={HomePage}/>

	    <Route key='folder' path='/folder/:folderId' component={FolderPage}/>

	    <Route key='note' path='/note/:noteId' component={NotePage}/>

	    <Route key='add_note' path='/addNote/:folderId' render={(props)=> {
		return(<AddNote
			folder= {props.match.params.folderId}
			/>
		      );
		}}
	    />
            <Route path='/addFolder/' component={AddFolder}/>
	  </section>
	  </NotefulContext.Provider>
        </main>
      </div>
    );
  }
}

export default App;
