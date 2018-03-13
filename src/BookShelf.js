import React,{Component}from 'react'
import Select from './Select'
class BookShelf extends Component {

  isFresh = () => {
    this.props.freshBooks()
  }
  render() {
    const defaultCoverImage = "https://books.google.com/googlebooks/images/no_cover_thumb.gif";
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.distinc}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map(book => (
              book.shelf === this.props.distinc &&(
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : defaultCoverImage})`}}></div>
                      <Select book={book} isFresh={this.isFresh}/>
                      </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                  </div>
                </li>
              )))
            }
            </ol>
          </div>
        </div>

    )
  }
}
export default BookShelf