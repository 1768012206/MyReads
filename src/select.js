import React,{Component} from 'react'
import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom'


class Select extends Component {
  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.props.book.shelf} onChange ={(e)=> {
          BooksAPI.update(this.props.book, e.target.value)
          this.props.isFresh()
        }}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default Select