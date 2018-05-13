import React from 'react'

import { SearchBooksBar } from './SearchBooksBar'
import { SearchBooksResults } from './SearchBooksResults'

import { getShelfOfBook } from '../../../stores/books'

// moveBook: (book, shelfId) => void
export class SearchBooks extends React.Component {
	constructor(props) {
		super(props);

		this.state = { books: [] };
	}

	render() {
		return (
		<div className="search-books">
			<SearchBooksBar 
				onChange={ books => this.setState({ books: books }) } 
				getShelfOfBook={ book =>  getShelfOfBook(book) }/>

			<SearchBooksResults 
				books={ this.state.books }
				moveBook={ this.props.moveBook } />
		</div>);
	}
}