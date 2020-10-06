import React, { Component } from 'react';
import Note from '../Note/Note'
import './MainMain.css';

class MainMain extends Component {
  static defaultProps = {
    notes: []
  }

  render() {
    const notes = this.props.notes.map(note => {
      return <Note key={note.id} id={note.id} name={note.name} modified={note.modified} />
    });

    return (
      <main className='main-main'>
        <ul className='main-notes'>
          {notes}
        </ul>
        <button type="button" className="add-button">Add note</button>
      </main>
    );
  }
}

export default MainMain;