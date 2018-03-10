import React,{Component} from 'react'
import * as BooksAPI from "./BooksAPI";
import Select from './select'
class bookSearch extends Component{
  state = {
    searchingBooks:[],
    query:'',
  }
  isFresh = () =>{
    BooksAPI.search(this.state.query).then(searchingBooks => {
      this.setState({searchingBooks})
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
  render() {
    return(
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
            {this.state.searchingBooks !== undefined && this.state.searchingBooks.map((book)=>(
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail })`}}></div>
                    <Select book={book} isFresh={this.isFresh}/>
                    </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
                </li>
              ))}
          </ol>
        </div>
      </div>)
  }
}
export default bookSearch