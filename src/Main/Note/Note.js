import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Note.css';

class Note extends Component {
  static defaultProps = {
    id: '',
    name: '',
    modified: ''
  }

  nth = (d) => {
    if (d > 3 && d < 21) return d + 'th';
    switch (d % 10) {
      case 1: return d + 'st';
      case 2: return d + 'nd';
      case 3: return d + 'rd';
      default: return d + 'th';
    }
  }

  render() {
    const monthAbbreviations = [
      'Jan', 'Feb', 'Mar', 'Apr',
      'May', 'Jun', 'Jul', 'Aug',
      'Sep', 'Oct', 'Nov', 'Dec'
    ]
    let date = new Date(this.props.modified);
    date = {
      day: this.nth(date.getDay()),
      month: monthAbbreviations[date.getMonth()],
      year: date.getFullYear()
    };

    return (
      <li className='note'>
        <Link to={`/note/${this.props.id}`}>
          <h2>{this.props.name}</h2>
        </Link>
        <div className='group-row'>
          <p>Date modified on {date.day} {date.month} {date.year}</p>
          <button type='button'>Delete Note</button>
        </div>
      </li>
    );
  }
}

export default Note;