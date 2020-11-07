import React from 'react';
import config from '../config'
import ApiContext from '../ApiContext'
import ValidationError from '../ValidationError/ValidationError';
import './AddNote.css';


class AddNote extends React.Component {
    state = {
        name: {
            value: '',
            touched: false
        },
        folder: {
            value: '',
            touched: false
        },
        content: {
            value: '',
            touched: false
        },
        fetchError: '',
    }

    constructor() {
        super();
        this.nameRef = React.createRef();
    }

    updateName = (name) => {
        this.setState({ name: { value: name, touched: true } });
    }

    updateFolder = (folder) => {
        this.setState({ folder: { value: folder, touched: true } });
    }

    updateContent = (content) => {
        this.setState({ content: { value: content, touched: true } });
    }

    validateName = () => {
        const name = this.state.name.value.trim();
        if (!name)
            return 'Name cannot be empty.'
        return;
    }

    validateFolder = (contextfolders) => {
        const folder = this.state.folder.value.trim();
        if (!folder)
            return 'Folder cannot be empty.'
        if (!contextfolders.find(contextfolder => String(contextfolder.id) === String(folder)))
            return 'Folder must be one of the available folders.'
        return;
    }

    validateContent = () => {
        const content = this.state.content.value.trim();
        if (!content)
            return 'Content cannot be empty.'
        return;
    }

    putNote = () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "note_name": this.state.name.value,
                "note_content": this.state.content.value,
                "folder_id": this.state.folder.value,
            })
        }
        return fetch(`${config.API_ENDPOINT}/notes`, options)
            .then(res => {
                if (!res.ok) throw new Error(res.statusText);
                return res.json();
            })
    }

    handleSubmit = (event, callback) => {
        event.preventDefault();
        this.setState({ fetchError: '' })
        this.putNote()
            .then((resJson) => {
                callback(resJson);
                this.props.history.push('/');
            })
            .catch(e => this.setState({ fetchError: e.message }));
    }

    createOption = (folders) => {
        const folderOption = folders.map(folder => {
            return (
                <option key={folder.id} value={folder.id}>{folder.folder_name}</option>
            )
        });
        return folderOption;
    }

    componentDidMount() {
        if(this.state.name.touched)
          this.nameRef.current.focus();
      }

    render() {
        return (
            <ApiContext.Consumer>
                {(context) => (
                    <form id='add-note-form' className="add-note">
                        <p className='form-status'>{this.state.fetchError}</p>
                        <p className='form-title'>Add Note</p>
                        <label htmlFor='note-name'>Enter a note name:</label>
                        <p className='hint'>* required</p>
                        <input
                            ref={this.nameRef}
                            type='text'
                            id='note-name'
                            name='note-name'
                            className='name-input'
                            aria-required="true"
                            aria-describedby='name-description'
                            aria-label="Enter a note name"
                            aria-invalid={this.state.name.touched && !!this.validateName()}
                            onChange={(e) => this.updateName(e.target.value)}
                        />
                        {this.state.name.touched
                            && <ValidationError id='name-description' message={this.validateName()} />}
                        <label htmlFor='note-content'>Content:</label>
                        <textarea
                            rows="4" cols="49"
                            id='note-content'
                            name='note-content'
                            className='content-textarea'
                            aria-required="true"
                            aria-describedby='content-description'
                            aria-label="Enter contents of the note:"
                            aria-invalid={this.state.content.touched && !!this.validateContent()}
                            onChange={(e) => this.updateContent(e.target.value)}
                        />
                        {this.state.content.touched
                            && <ValidationError id='content-description' message={this.validateContent()} />}
                        <label htmlFor='folder-select'>Folder:</label>
                        <select
                            id="folder-select"
                            name="folder-select"
                            defaultValue=''
                            aria-required="true"
                            aria-describedby='folder-description'
                            aria-label="Select folder:"
                            aria-invalid={this.state.folder.touched && !!this.validateFolder(context.folders)}
                            onChange={(e) => this.updateFolder(e.target.value)}>
                            <option value='' disabled >Select a Folder:</option>
                            {this.createOption(context.folders)}
                        </select>
                        {this.state.folder.touched
                            && <ValidationError id='folder-description' message={this.validateFolder(context.folders)} />}
                        <button
                            type='submit'
                            form='add-note-form'
                            className="submit-button"
                            onClick={(e) => {
                                this.handleSubmit(e, context.addNote)
                            }}
                            disabled={
                                this.validateName() ||
                                this.validateContent() ||
                                this.validateFolder(context.folders)}
                        > Submit
                        </button>
                    </form>
                )}
            </ApiContext.Consumer>
        )
    }
}

export default AddNote;