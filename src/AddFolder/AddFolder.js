import React, { Component } from 'react';
import config from '../config';
import ApiContext from '../ApiContext';
import ValidationError from '../ValidationError/ValidationError';
import PropTypes from 'prop-types';
import './AddFolder.css';

class AddFolder extends Component {
  static defaultProp = {
    id: '',
    deleteFolder: []
  }

  state = {
    folder: {
      value: '',
      touched: false
    },
    fetchError: ''
  }

  constructor() {
    super();
    this.folderRef = React.createRef();
  }

  updateFolder = (folder) => {
    this.setState({ folder: { value: folder, touched: true } });
  }

  validateFolder = () => {
    const folder = this.state.folder.value.trim();
    if (!folder) {
      if(this.state.folder.touched)
        this.folderRef.current.focus();
      return 'Name cannot be empty.';
    }
    return;
  }

  putFolder = (folderName) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "name": folderName })
    }
    return fetch(`${config.API_ENDPOINT}/folders`, options)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
  }

  handleSubmit = (event, callback) => {
    event.preventDefault();
    this.setState({ fetchError: '' })
    this.putFolder(this.state.folder.value)
      .then((resJson) => {
        this.props.deleteFolder(this.props.id);
        callback(resJson);
      })
      .catch(e => this.setState({ fetchError: e.message }));
  }

  componentDidMount() {
    if(this.state.folder.touched)
      this.folderRef.current.focus();
  }

  render() {
    return (
      <ApiContext.Consumer>
        {(context) => (
          <li className="add-folder">
            <form id='add-folder-form'>
              <p className='form-status'>{this.state.fetchError}</p>
              <p className='form-title'>Add Folder</p>
              <label htmlFor='folder'>Enter a folder name:</label>
              <p className='hint'>* required</p>
              <input
                ref={this.folderRef}
                type='text'
                id='folder'
                name='folder'
                aria-required="true"
                aria-describedby='folder-description'
                aria-label="Enter a folder name"
                aria-invalid={!!this.validateFolder()}
                onChange={(e) => this.updateFolder(e.target.value)}
              />
              {this.state.folder.touched && <ValidationError id='folder-description' message={this.validateFolder()} />}
              <button
                type='submit'
                form='add-folder-form'
                onClick={(e) => {
                  this.handleSubmit(e, context.addFolder)
                }}
                disabled={this.validateFolder()}
              > Submit
            </button>
              <button
                type='reset'
                form='add-folder-form'
                onClick={(e) => this.props.deleteFolder(this.props.id, e)}
              > Cancel
              </button>
            </form>
          </li>
        )}
      </ApiContext.Consumer>
    );
  }
}

AddFolder.propTypes = {
  deleteFolder: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
}

export default AddFolder;