import React from 'react'

import { Bookshelf } from './Bookshelf'

// title: string
// shelves: { 
//	title: string,
//	id: string,	
//  books: []
// }
// moveBook: (book: Book, newShelfId: string) => void
export class ListBooks extends React.Component {
	render() {
		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>{this.props.title}</h1>
				</div>
				<div className="list-books-content">
					<div>      
						{Object.keys(this.props.shelves).map(id => {
                            const shelf = this.props.shelves[id];
                            return (
                                <Bookshelf 
                                    key={id} 
                                    title={shelf.title} 
                                    id={id}
                                    books={shelf.books}
                                    onChange={ (book, newShelfId) => { this.props.moveBook(book, newShelfId); } } />
                            )}
                        )}
					</div>
				</div>
				
				{ this.props.children }
				
			</div>);
	}
}