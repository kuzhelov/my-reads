import React from 'react'
import { Link } from 'react-router-dom'

import { Book } from '../books'
import { search } from '../../BooksAPI'

import { getShelfOfBook, convertToBook } from '../../stores/books'

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
				books={this.state.books}
				moveBook={ this.props.moveBook } />
		</div>);
	}
}

export class OpenSearchButton extends React.Component {
    render() {
        return (
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>);
    }
}

// onChange: () => void
// getShelfOfBook: (book) => shelfId: string
class SearchBooksBar extends React.Component {
	constructor(props) {
		super(props);

		this.lastSearchTime = new Date();

		this.getShelfOfBook = this.props.getShelfOfBook || (() => 'none');
	}

	handleChange(e) {
		const searchTerm = e.target.value;
		this.lastSearchTime = new Date();

		if (!searchTerm) { this.updateBooks([]); return; }

		search(searchTerm)
			.then(books => {
				if (!books || books.error) { return; }

				this.updateBooks(books.map(book => {
					return convertToBook(book, this.getShelfOfBook(book));
				}));
			})
			.catch(error => { this.updateBooks([]); })
	}

	updateBooks(books) {
		const currentUpdateTime = new Date();
		if (currentUpdateTime < this.lastSearchTime) { return; }

		this.props.onChange && this.props.onChange(books);
	}

	render() {
		return (<div className="search-books-bar">
		<Link className="close-search" to="/">Close</Link>
		<div className="search-books-input-wrapper">
			{/*
NOTES: The search from BooksAPI is limited to a particular set of search terms.
You can find these search terms here:
https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
you don't find a specific author or title. Every search is limited by search terms.
*/}
			<input type="text" placeholder="Search by title or author" onChange={ this.handleChange.bind(this) } />
		</div>
	</div>);
	}
}

// books: Book[]
// moveBook: (book, shelfId) => void
class SearchBooksResults extends React.Component {
	render() {
		return (
			<div className="search-books-results">
				<ol className="books-grid">
					{this.props.books.map((book, index) => (
						<Book key={index} 
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