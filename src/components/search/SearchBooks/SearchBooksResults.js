import React from 'react'

import { Book } from '../../books'

// books: Book[]
// moveBook: (book, shelfId) => void
export class SearchBooksResults extends React.Component {
	render() {
		return (
			<div className="search-books-results">
				<ol className="books-grid">
					{this.props.books.map((book, index) => (
						<Book key={book.id} 
							title={book.title} 
							authors={book.authors} 
							cover={book.cover}
							shelfId={book.shelfId}
							onChange={(newShelfId) => { this.props.moveBook(book, newShelfId)} } />
					))}
				</ol>
			</div>);
	}
}