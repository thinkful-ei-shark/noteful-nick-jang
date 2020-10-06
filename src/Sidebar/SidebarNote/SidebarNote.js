import React, { Component } from 'react';
import './SidebarNote.css';

class SidebarNote extends Component {
  static defaultProps = {
    folderName: '',
    goBack: () => {}
  }

  render() {
    return (
      <aside className='sidebar-note'>
        <button type='button' onClick={this.props.goBack}>Go Back</button>
        <h2>{this.props.folderName}</h2>
      </aside>
    );
  }
}

export default SidebarNote;