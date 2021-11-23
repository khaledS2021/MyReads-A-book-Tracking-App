import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'
import { Route, Link } from 'react-router-dom'

class BooksApp extends Component {



  state = {
    books: [],
    upState: true,
  }


  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: books
      })
    })
  }

  shelfChange = (book, shelf) => {
    const { books, upState } = this.state
    const bookIndex = books.findIndex((i) => i.id === book.id);
    const newBookList = books
    //checking the shelf of the book
    if (bookIndex === -1) {
      book.shelf = shelf
      newBookList.push(book)
    } else { newBookList[bookIndex].shelf = shelf }

    this.setState({
      books: newBookList
    });

    //update the api with the new shelf of the book

    BooksAPI.update(book, shelf);

    //instant update the UI by updating  state
    this.setState({
      upState: !upState
    })
  }


  render() {

    return (
      <div className="app">
        {/**Using Route from React Router dom to navigate  */}
        <Route path='/search' render={() => (
          <BookSearch
            books={this.state.books}
            shelfChange={this.shelfChange}
          />)} />
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <BookShelf
                //filtering every book with it's shelf name 
                books={this.state.books.filter((book) => book.shelf === 'currentlyReading')}
                className='bookshelf'
                title='Currently Reading'
                shelfChange={this.shelfChange}
              />
              <BookShelf
                books={this.state.books.filter((book) => book.shelf === 'wantToRead')}
                className='bookshelf'
                title='Want To Read'
                shelfChange={this.shelfChange}
              />
              <BookShelf
                books={this.state.books.filter((book) => book.shelf === 'read')}
                className='bookshelf'
                title='Read'
                shelfChange={this.shelfChange}
              />
            </div>

          </div>
        )} />
        {/**Using the Link component to navigate to search page */}
        <Link className='open-search'
          to='/search'>Add a book</Link>

      </div>

    )
  }

}
export default BooksApp
