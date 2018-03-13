import React from 'react'
import {Route} from 'react-router-dom'
import BookList from './BookList'
import './App.css'
import BookSearch from "./BookSearch";


class App extends React.Component {

  render() {
    return (<div className="app">
        <Route exact path="/" render={() => {
          return (<BookList />)
        }}/>
        <Route path="/search" component={BookSearch}/>
      </div>)

  }
}


export default App