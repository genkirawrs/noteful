import React, { Component } from 'react';

import './DefaultSidebar.css';

class DefaultSidebar extends Component {

  render(){

    return(
        <div className='note-sidebar-folder'>
        <a className='note-sidebar-back-btn' onClick={()=>this.props.history.goBack()}>Go back</a>
        </div>
    );
  }

}

export default DefaultSidebar;
