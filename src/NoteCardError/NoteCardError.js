import React, { Component } from 'react';

import './NoteCardError.css';

class NoteCardError extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render(){
    if (this.state.hasError) {
      return (
        <div className='card-error'>Sorry, unable to display information. <br/> Please try again later!</div>
      );
    }
    return this.props.children;
  }
}

export default NoteCardError;
