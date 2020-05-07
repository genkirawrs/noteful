import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AddFolderButton from '../AddFolderButton/AddFolderButton';

class FolderSidebar extends Component {

  render(){
    return(
        <ul>
        {this.props.folders.map(folder=>{
	    const styles = (folder.id === this.props.selectedFolder) ? 'selected' : '';
            return(<li className={styles} key={folder.id}><Link to={`/folder/${folder.id}`}>{folder.name}</Link></li>);
        })}
	<li><AddFolderButton/></li>
        </ul>
    );
  }

}

export default FolderSidebar;
