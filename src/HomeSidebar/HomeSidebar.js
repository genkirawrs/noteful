import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import NotefulContext from '../NotefulContext.js';
import AddFolderButton from '../AddFolderButton/AddFolderButton';

class HomeSidebar extends Component {
  static contextType = NotefulContext;

  render(){
    const { folders } = this.context;
    return(
        <ul>
	  {folders.map(folder=>
            <li key={folder.id}><Link to={`/folders/${folder.id}`}>{folder.name}</Link></li>
        )}
	<li><AddFolderButton/></li>
	</ul>
    );
  }

}

export default HomeSidebar;
