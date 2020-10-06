import React, { Component } from 'react';
import Folder from '../Folder/Folder';
import './SidebarMain.css';

class SidebarMain extends Component {
  static defaultProps = {
    folders: []
  }

  render() {
    const folders = this.props.folders.map(folder => 
      <Folder key={folder.id} id={folder.id} name={folder.name} className='item'/>
    );

    return (
      <aside className='sidebar-main group-column'>
        {folders}
        <button type='button'>Add Folder</button>
      </aside>
    );
  }
}

export default SidebarMain;