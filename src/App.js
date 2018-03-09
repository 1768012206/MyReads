import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom'
import Select from './select'
import './App.css'
import BookShelf from "./bookShelf";

class BooksApp extends React.Component {
  state = {
    books:[],
    showSearchPage: false,
    query:'',
    searchingBooks:[],
  }
  freshBooks = () => {
    BooksAPI.getAll().then(books =>{
      this.setState({books})
    })
  }
  bookQuery = (e) => {
    if(e.target.value) {
      this.setState({query:e.target.value})
      BooksAPI.search(this.state.query).then(searchingBooks => {
        this.setState({searchingBooks})
      })
    }
  }
  componentDidMount() {
    BooksAPI.getAll().then(books =>{
      this.setState({books})
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={this.bookQuery}/>
                {JSON.stringify(this.state.query)}
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.searchingBooks !== undefined && this.state.searchingBooks.map(book => (
                  <li key={book.id}>
                    <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail })`}}></div>
                      <Select book={book} isFresh = {this.isFresh}/>
                      </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                  </div>
                  </li>
                ))
              }
              </ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <div className="list-books-content">
              <div>
                <BookShelf books = {this.state.books} distinc = "currentlyReading" freshBooks = {this.freshBooks}/>
                <BookShelf books = {this.state.books} distinc = "wantToRead" freshBooks = {this.freshBooks}/>
                <BookShelf books = {this.state.books} distinc = "read" freshBooks = {this.freshBooks}/>
              </div>
            </div>

            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp