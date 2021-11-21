import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'
import { Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

// Using useState and useEffect hooks in functional component for less coding in the parent component
const BooksApp = () => {

  let [books, setbooks] = useState([]);
  let [flip, setflip] = useState([true]);

  useEffect(() => {
    BooksAPI.getAll().then((books) => {
      setbooks(books)
    })
  }, []);

  const shelfChange = (book, shelf) => {
    const bookIndex = books.findIndex((i) => i.id === book.id);
    const newBookList = books
    //checking the shelf of the book
    if (bookIndex === -1) {
      book.shelf = shelf
      newBookList.push(book)
    } else { newBookList[bookIndex].shelf = shelf }

    setbooks(newBookList);

    //update the api with the new shelf of the book

    BooksAPI.update(book, shelf);

    //instant update the UI by flipping the filp state value
    setflip(!flip)

  }


  return (
    <div className="app">
      {/**Using Route from React Router dom to navigate  */}
      <Route path='/search' render={() => (
        <BookSearch
          books={books}
          shelfChange={shelfChange}
        />)} />
      <Route exact path='/' render={() => (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <BookShelf
              //filtering every book with it's shelf name 
              books={books.filter((book) => book.shelf === 'currentlyReading')}
              className='bookshelf'
              title='Currently Reading'
              shelfChange={shelfChange}
            />
            <BookShelf
              books={books.filter((book) => book.shelf === 'wantToRead')}
              className='bookshelf'
              title='Want To Read'
              shelfChange={shelfChange}
            />
            <BookShelf
              books={books.filter((book) => book.shelf === 'read')}
              className='bookshelf'
              title='Read'
              shelfChange={shelfChange}
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

export default BooksApp
