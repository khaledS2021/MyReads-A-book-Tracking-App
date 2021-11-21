import React, { Component } from "react"
import propTypes from 'prop-types';

class ShelfChanger extends Component {

    render() {

        //ES6 Destructuring 
        const {shelfChange,itemBook}=this.props;

        return (
            <div className="book-shelf-changer">
                {/**getting the shelfchange to change book shelfs */}
                <select onChange={(event)=> shelfChange(itemBook , event.target.value)} value={(itemBook.shelf ? itemBook.shelf : "none")}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>

        )
    }



}

//propTypes validations
ShelfChanger.propTypes={
    shelfChange:propTypes.func.isRequired,
    shelf:propTypes.string.isRequired,
    itemBook:propTypes.object.isRequired,
}

export default ShelfChanger