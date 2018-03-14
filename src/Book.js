import React,{Component} from 'react'
import Select from './Select'
class Book extends Component{


  render() {
    const defaultCoverImage = "https://books.google.com/googlebooks/images/no_cover_thumb.gif";
    return (
        <li key={this.props.book.id}>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : defaultCoverImage})`}}> </div>
              <Select book={this.props.book} updateBookInfo={this.props.updateBookInfo}/>
              </div>
            <div className="book-title">{this.props.book.title}</div>
            <div className="book-authors">{this.props.book.authors}</div>
          </div>
        </li>
    )
  }
}

export default Book