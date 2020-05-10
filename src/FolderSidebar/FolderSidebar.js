import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import NotefulContext from '../NotefulContext.js';
import AddFolderButton from '../AddFolderButton/AddFolderButton';

class FolderSidebar extends Component {
  static contextType = NotefulContext;

  render(){
    const { folders } = this.context;

    return(
        <ul>
        {folders.map(folder=>{
	    const styles = (folder.id === this.props.match.params.folderId) ? 'selected' : '';
            return(<li className={styles} key={folder.id}><Link to={`/folder/${folder.id}`}>{folder.name}</Link></li>);
        })}
	<li><AddFolderButton/></li>
        </ul>
    );
  }

}

export default FolderSidebar;
