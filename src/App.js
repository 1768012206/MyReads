import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom'
import BookList from './BookList'
import './App.css'
import bookSearch from "./bookSearch";


class App extends React.Component {

  render() {
    return (<div className="app">
        <Route exact path="/" render={() => {
          return (<BookList />)
        }}/>
        <Route path="/search" component={bookSearch}/>
      </div>)

  }
}


export default App