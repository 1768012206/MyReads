import React,{Component} from 'react'
import BookShelf from "./bookShelf"
import {Link} from "react-router-dom"
import * as BooksAPI from "./BooksAPI";
class BookList extends Component{
  state = {
    books:[],

  }
  freshBooks = () => {
    BooksAPI.getAll().then(books =>{
      this.setState({books})
    })
  }


  componentDidMount() {
    BooksAPI.getAll().then(books =>{
      this.setState({books})
    })
  }
  render() {
    return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>

          <div className="list-books-content">
            <div>
              <BookShelf books={this.state.books} distinc="currentlyReading" freshBooks={this.freshBooks}/>
              <BookShelf books={this.state.books} distinc="wantToRead" freshBooks={this.freshBooks}/>
              <BookShelf books={this.state.books} distinc="read" freshBooks={this.freshBooks}/>
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