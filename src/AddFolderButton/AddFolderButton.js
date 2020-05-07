import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './AddFolderButton.css';

class AddFolderButton extends Component {
  render(){
    return(
        <Link className='add-folder-btn' to={`/addFolder`}>Add Folder</Link>
    );
  }

}

export default AddFolderButton;
