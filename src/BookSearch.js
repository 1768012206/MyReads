import React,{Component} from 'react'
import * as BooksAPI from "./BooksAPI";
import BookShelf from './BookShelf'
import {Link} from "react-router-dom"
import { Debounce  } from 'react-throttle';
import escapeRegExp from 'escape-string-regexp';
class BookSearch extends Component{
  state = {
    books:[],
    searchingBooks:[],
    query:'',
  }

  searchingBooks = {}
  isFresh = () =>{
    BooksAPI.search(this.state.query).then(searchingBooks => {
      this.setState({searchingBooks})
    })
  }
  bookQuery = (e) => {
    const match = new RegExp(escapeRegExp(e.target.value),'i')
    if(match.test(e.target.value)) {
      this.setState({query:e.target.value})
      BooksAPI.search(e.target.value).then(searchingBooks => {
        this.setState({searchingBooks})
      })
    }
  }

  componentDidMount(){
    BooksAPI.getAll().then(books =>{
      this.setState({books})
    })
  }

  render() {
    this.searchingBooks = this.state.searchingBooks
    if (this.searchingBooks !== undefined && this.searchingBooks instanceof Array) {
      for(const searchingBook of this.searchingBooks){
        let flag = 0
        for(const book of this.state.books){
          if (searchingBook.id === book.id) {
            searchingBook.shelf = book.shelf
            flag = 1
          }
        }
        if(flag === 0){
          searchingBook.shelf = 'new'
        }
      }
    }
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <Debounce time="400" handler="onChange">
            <input type="text" placeholder="Search by title or author" onChange={this.bookQuery}/>
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <div className="list-books-content">
              <div>
                <BookShelf books={this.searchingBooks} distinc="currentlyReading" freshBooks={this.freshBooks}/>
                <BookShelf books={this.searchingBooks} distinc="wantToRead" freshBooks={this.freshBooks}/>
                <BookShelf books={this.searchingBooks} distinc="read" freshBooks={this.freshBooks}/>
                <BookShelf books={this.searchingBooks} distinc="new" freshBooks={this.freshBooks}/>
              </div>
            </div>
          </ol>
        </div>
      </div>)
    }
}
export default BookSearch