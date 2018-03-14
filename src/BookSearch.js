import React,{Component} from 'react'
import * as BooksAPI from "./BooksAPI";
import Book from './Book'
import {Link} from "react-router-dom"
import { Debounce } from 'react-throttle';
import escapeRegExp from 'escape-string-regexp';
class BookSearch extends Component{
  state = {
    books:[],
    searchingBooks:[],
    query:'',
  }

  searchingBooks = {}
  bookQuery = (e) => {
    const match = new RegExp(escapeRegExp(e.target.value),'i')
    if(match.test(e.target.value)) {
      this.setState({query:e.target.value})
      BooksAPI.search(e.target.value).then(searchingBooks => {
        if(Array.isArray(searchingBooks)) {
          this.searchingBooks = searchingBooks
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
                searchingBook.shelf = 'none'
              }
            }
            this.setState({
              searchingBooks:this.searchingBooks
            })
          }
        }else {
          this.setState({searchingBooks:[]})
        }
      })
    }
  }

  componentDidMount(){
    BooksAPI.getAll().then(books =>{
      this.setState({books})
    })
    this.searchingBooks = this.state.searchingBooks
  }
  render() {

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
            {this.state.searchingBooks.map(searchingBook => (
              <Book key={searchingBook.id} book={searchingBook} updateBookInfo={this.props.updateBookInfo} />
            ))}
          </ol>
        </div>
      </div>)
    }
}
export default BookSearch