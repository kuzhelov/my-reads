import React from 'react'

import { Book } from '../../books'

// books: Book[]
// moveBook: (book, shelfId) => void
export const SearchBooksResults = ({ books, moveBook }) => (
    <div className="search-books-results">
        <ol className="books-grid">
            {books.map((book, index) => (
                <Book key={book.id} 
                    title={book.title} 
                    authors={book.authors} 
                    cover={book.cover}
                    shelfId={book.shelfId}
                    onChange={(newShelfId) => { moveBook(book, newShelfId)} } />
            ))}
        </ol>
    </div>
);