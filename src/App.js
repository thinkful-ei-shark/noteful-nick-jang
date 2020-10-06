import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './Header/Header';
import MainMain from './Main/MainMain/MainMain';
import MainNote from './Main/MainNote/MainNote';
import SidebarMain from './Sidebar/SidebarMain/SidebarMain';
import SidebarNote from './Sidebar/SidebarNote/SidebarNote';
import STORE from './dummy-store'
import './App.css';

class App extends Component {
  state = {
    folders: [],
    notes: []
  }

  componentDidMount() {
    this.setState({
      folders: STORE.folders,
      notes: STORE.notes
    })
  }

  getNote = (noteId) => {
    return this.state.notes.find(note => {
      if (note.id === noteId) {
        return note;
      }
    });
  }

  getNotesOfFolder = (folderId) => {
    if (!folderId) return this.state.notes;
    return this.state.notes.filter(note => note.folderId === folderId);
  }

  getFolderOfNote = (noteId) => {
    const note = this.getNote(noteId);
    return this.state.folders.find(folder => folder.id === note.folderId);
  }

  renderSidebar = () => {
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route exact key={path} path={path} render={(routeProps) =>
            <SidebarMain folders={this.state.folders} {...routeProps} />} />)}
        <Route path='/note/:noteId' render={(routeProps) => {
          let error;
          let folderName = this.getFolderOfNote(routeProps.match.params.noteId);
          if (folderName) folderName = folderName.name;
          if (!folderName) error = "Folder could not be found.";
          return <SidebarNote folderName={folderName || error}
            goBack={routeProps.history.goBack} />}} />
      </>
    );
  }

  renderMain = () => {
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route exact key={path} path={path} render={(routeProps) => {
            const folderId = routeProps.match.params.folderId;
            return <MainMain notes={this.getNotesOfFolder(folderId)} {...routeProps} />
          }} />)}
        <Route path='/note/:noteId' render={(routeProps) => {
          const noteId = this.getNote(routeProps.match.params.noteId);
          if (!noteId) return;
          return <MainNote note={noteId} {...routeProps} />}} />
      </>
    );
  }

  render() {
    return (
      <div className="App">
        <Route path='/' component={Header} />
        <div className='group-row'>
          {this.renderSidebar()}
          {this.renderMain()}
        </div>
      </div>
    );
  }
}

export default App;
