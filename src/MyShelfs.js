import React, { Component } from "react";
import Book from "./Book";
import propTypes from 'prop-types';

class MyShelfs extends Component {

  render() {
    //ES6 distructuring 
    const { shelfChange } = this.props
    return (
      <div className="bookshelf">
        {/**getting the shelf title from the props */}
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) =>
              //maping over the book from books aray
              <Book
                key={book.id}
                shelfChange={shelfChange}
                itemBook={book}
              />
            )}
          </ol>
        </div>
      </div>
    )
  }


}
//propTypes validations
MyShelfs.propTypes = {
  books: propTypes.array.isRequired,
  shelfChange: propTypes.func.isRequired,
}

export default MyShelfs