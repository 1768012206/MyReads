import React,{Component} from 'react'
import BookShelf from "./BookShelf"
import {Link} from "react-router-dom"
class BookList extends Component{

  render() {
    return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf books={this.props.books} distinc="currentlyReading" updateBookInfo={this.props.updateBookInfo}/>
              <BookShelf books={this.props.books} distinc="wantToRead" updateBookInfo={this.props.updateBookInfo}/>
              <BookShelf books={this.props.books} distinc="read" updateBookInfo={this.props.updateBookInfo}/>
            </div>
          </div>

          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
    )
  }
}
export default BookList