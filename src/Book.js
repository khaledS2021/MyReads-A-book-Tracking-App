import React, { Component } from "react";
import ChangerTool from "./ChangerTool";
import propTypes from 'prop-types';

class Book extends Component {
    render() {
        //ES6 estructuring 
        const {itemBook , shelfChange}=this.props
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover"
                        //fixing the error fires when the book doesn't have an image                       
                            style={{ width: 128, height: 193, backgroundImage: (itemBook.imageLinks && itemBook.imageLinks.smallThumbnail)?
                                `url(${itemBook.imageLinks.smallThumbnail})`:`http://via.placeholder.com/128x193?text=No%20Cover`}}></div>

                        <ChangerTool
                            shelfChange={shelfChange}
                            shelf={itemBook.shelf}
                            itemBook={itemBook}
                        />
                    </div>
                    <div className="book-title">{itemBook.title}</div>
                    <div className="book-authors">
                        {/**putting , if there is more then 1 author */}
                        {(itemBook.authors && itemBook.authors.length) > 1 ? itemBook.authors.join(","):itemBook.authors}
                    </div>
                </div>
            </li>
        )
    }
}

//propTypes Validations

Book.propTypes={
    shelfChange:propTypes.func.isRequired,
    itemBook:propTypes.object.isRequired,
}

export default Book