import React,{Component}from 'react'
import Book from './Book'

class BookShelf extends Component {

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.distinc}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map(book => (
              book.shelf === this.props.distinc &&(
                <Book key={book.id} book={book} updateBookInfo={this.props.updateBookInfo}/>
              )))
            }
            </ol>
          </div>
        </div>

    )
  }
}
export default BookShelf