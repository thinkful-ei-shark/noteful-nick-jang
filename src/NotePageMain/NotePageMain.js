import React from 'react'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import { findNote } from '../notes-helpers'
import PropTypes from 'prop-types'
import './NotePageMain.css'

export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  handleDeleteNote = noteId => {
    this.props.history.push(`/`)
  }

  render() {
    const { notes = [] } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId)
    console.log('notes', notes);
    console.log('noteid', noteId);
    console.log('note', note);
    return (
      <section className='NotePageMain'>
        {!!note.id &&
          <Note
            note={note}
            onDeleteNote={this.handleDeleteNote}
          />}
        <div className='NotePageMain__content'>
          {note.note_content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}

NotePageMain.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  })
}

