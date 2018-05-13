import React from 'react'

import { Book } from "../Book";

// title: string
// id: string
// books: BookModel[]
// onChange: (book: Book, newShelfId: string) => void
export class Bookshelf extends React.Component {
	render() {
		return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{this.props.title}</h2>
			<div className="bookshelf-books">
				<ol className="books-grid">
					{this.props.books.map(book => (
						<li key={book.id}>
							<Book 
								title={book.title}
								authors={book.authors}
                                cover={book.cover}
                                shelfId={this.props.id} 
                                onChange={ (newShelfId) => this.props.onChange(book, newShelfId) } />
						</li>)) 
					}
				</ol>
			</div>
		</div>);
	}
}