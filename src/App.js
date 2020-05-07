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


import STORE from './store';
import './App.css';

class App extends Component {
  state = {
    folders: STORE.folders,
    notes: STORE.notes
  }

  render(){
    return (
      <div className='App'>
	<Header/>
        <main>
  	  <nav>
	    <Route exact path='/' component={()=> {
		return(<HomeSidebar folders={this.state.folders}/>);
	    }}/>
            <Route path='/folder/:folderId' component={(props)=> {
                return(<FolderSidebar
			selectedFolder={props.match.params.folderId} 
			folders={this.state.folders}
			/>
		);
            }}/>
            <Route path='/note/:noteId' render={(props)=> {
		const noteFolderId = this.state.notes.find( ({id}) => id === props.match.params.noteId );
                return(
			<NoteSidebar
			folder={this.state.folders.find( ({id}) => id === noteFolderId.folderId) } 
			onGoBack={()=>{props.history.goBack()}}
		        />
		      );
            }}/>

	  </nav>
   	  <section>
	    <Route exact path='/' render={()=>{
		return(<HomePage notes={this.state.notes}/>);
	    }}/>
            <Route path='/folder/:folderId' render={(props) => {
                return(<FolderPage 
			folderId={props.match.params.folderId}
			notes={ this.state.notes.filter( ({folderId})=> folderId === props.match.params.folderId) }
			/>
		      );
                }}
            />
            <Route path='/note/:noteId' render={(props) => {
                return(<NotePage
			note={this.state.notes.find( ({id})=> id === props.match.params.noteId)}
			/>
		      );
                }}
            />
	    <Route path='/addNote/:folderId' render={(props)=> {
		return(<AddNote
			folder= {props.match.params.folderId}
			/>
		      );
		}}
	    />
            <Route path='/addFolder/' component={AddFolder}/>
	  </section>
        </main>
      </div>
    );
  }
}

export default App;
