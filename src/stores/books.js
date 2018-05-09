// book shelves
let shelves =  {
    currentlyReading: {
        title: "Currently Reading",
        books: []
    },
    wantToRead: {
        title: "Want to Read",
        books: []
    },
    read: {
        title: "Read",
        books: []
    }
};

export default shelves;

export function moveBook(book, toShelfId) {
    for (const id in shelves) {
        const shelf = shelves[id];

        const bookIndex = getIndexOfBook(shelf, book);
        if (bookIndex >= 0) {
            if (id === toShelfId) {
                return;
            }

            shelf.books.splice(bookIndex, 1);
        }

        if (id === toShelfId) {
            shelf.books.push(book);
        }
    }

    return shelves;
}

// (book) => shelfId
export function getShelfOfBook(book) {
    for (const shelfId in shelves) {
        if (getIndexOfBook(shelves[shelfId], book) >= 0) {
            return shelfId;
        }
    }

    return 'none';
}

function getIndexOfBook(shelf, book) {
    return shelf.books.findIndex(shelfBook => shelfBook.title === book.title);
}

export function convertToBook(bookAsJson, shelfId) {
    return {
        id: bookAsJson.id,
        title: bookAsJson.title,
        authors: bookAsJson.authors && bookAsJson.authors.join(', '),
        cover: {
            url: bookAsJson.imageLinks && bookAsJson.imageLinks.thumbnail,
            height: 190
        },
        shelfId: shelfId
    };
}