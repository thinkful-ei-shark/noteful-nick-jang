import React, { Component } from 'react';
import Note from '../Note/Note';
import './MainNote.css';

class MainNote extends Component {
  static defaultProps = {
    note: {}
  }

  render() {
    return (
      <main className='main-note'>
        <Note key={this.props.note.id} id={this.props.note.id} name={this.props.note.name} modified={this.props.note.modified} />
        <p>{this.props.note.content}</p>
      </main>
    );
  }
}

export default MainNote;