import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './NoteSidebar.css';

class NoteSidebar extends Component {

  render(){
    return(
        <div className='note-sidebar-folder'>
	<Link className='note-sidebar-back-btn' onClick={()=>this.props.onGoBack()}>Go back</Link>
	<h3>{this.props.folder.name}</h3>
	</div>
    );
  }

}

export default NoteSidebar;
