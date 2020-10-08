import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import AddFolder from '../AddFolder/AddFolder'
import { countNotesForFolder } from '../notes-helpers'
import './NoteListNav.css'

class NoteListNav extends React.Component {
  static contextType = ApiContext;

  state = {
    newFolderItems: []
  }

  deleteFolder = (id, event = null) => {
    if (event) event.preventDefault();
    const newFolderItems = this.state.newFolderItems.filter(folder => 
      folder.id !== id);
    this.setState({
      newFolderItems: newFolderItems
    })
  }

  handleNewFolderClick = (event) => {
    event.preventDefault();
    const id = this.state.newFolderItems.length;
    const newFolderItems = [
      ...this.state.newFolderItems, 
      {id,
      item: <AddFolder key={id} id={id} deleteFolder={this.deleteFolder}/>}
    ]

    this.setState({
      newFolderItems: newFolderItems
    });
  }

  render() {
    const { folders = [], notes = [] } = this.context
    return (
      <div className='NoteListNav'>
        <ul className='NoteListNav__list'>
          {folders.map(folder =>
            <li key={folder.id}>
              <NavLink
                className='NoteListNav__folder-link'
                to={`/folder/${folder.id}`}
              >
                <span className='NoteListNav__num-notes'>
                  {countNotesForFolder(notes, folder.id)}
                </span>
                {folder.name}
              </NavLink>
            </li>
          )}
          {this.state.newFolderItems.map(folder => folder.item)}
        </ul>
        <div className='NoteListNav__button-wrapper'>
          <CircleButton
            tag={Link}
            to='/add-folder'
            type='button'
            className='NoteListNav__add-folder-button'
            onClick={e => this.handleNewFolderClick(e)}
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Folder
          </CircleButton>
        </div>
      </div>
    )
  }
}

export default NoteListNav;
