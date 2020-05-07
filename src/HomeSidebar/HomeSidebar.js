import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AddFolderButton from '../AddFolderButton/AddFolderButton';

class HomeSidebar extends Component {

  render(){
    return(
        <ul>
	  {this.props.folders.map(folder=>
            <li key={folder.id}><Link to={`/folder/${folder.id}`}>{folder.name}</Link></li>
        )}
	<li><AddFolderButton/></li>
	</ul>
    );
  }

}

export default HomeSidebar;
