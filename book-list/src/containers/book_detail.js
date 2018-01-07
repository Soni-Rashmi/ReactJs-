import React, { Component } from 'react';
import { connect } from 'react-redux';

class BookDetail extends Component {

    render() {
      if(!this.props.book) {
          return <div> Select a book.</div>
      }
        return (
            <div>
                <h4>Title:  {this.props.book.title}</h4>
                <h4>Author: {this.props.book.author}</h4>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        book: state.activeBook
    };
}

export default connect(mapStateToProps)(BookDetail);
