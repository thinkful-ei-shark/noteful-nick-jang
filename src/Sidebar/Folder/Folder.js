import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Folder.css';

class Folder extends Component {
  static defaultProps = {
    name: ''
  }

  render() {
    return (
      <NavLink to={`/folder/${this.props.id}`} className='folder'>
        {this.props.name}
      </NavLink>
    );
  }
}

export default Folder;