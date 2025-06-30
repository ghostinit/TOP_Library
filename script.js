function Book(title, author, pageCount) {
    if (!new.target) {
        throw Error("You MUST use 'new' keyword when creating a Book object");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = false;

    this.getInfo = function () {
        return `${this.title} by ${this.author}, ${this.pageCount} pages, ${this.read ? "Has Read" : "Has NOT Read"}`
    }

    this.markRead = function () {
        this.read = true;
    }
}

const Library = {
    books: [],
    addBook: function (title, author, pageCount) {
        this.books.push(new Book(title, author, pageCount));
    },
    printBooks: function () {
        this.books.forEach((book) => {
            console.log(`${book.title} by ${book.author}, ${book.pageCount} pages, ${book.read ? "Has Read" : "Has NOT Read"}: ID: ${book.id}`)
        })
    },
    removeBook: function (UUID) {
        const idx = this.getIndexById(UUID);
        this.books.splice(idx, 1);
    },
    getIndexById: function (UUID) {
        return this.books.findIndex(book => book.id === UUID);
    }

}

const starterBooks = [
    ['Lord of the Rings', 'J.R.R. Tolkien', 684],
    ['Odd Thomas', 'Dean Koontz', 732],
    ['Autobiography of A Yogi', 'Parmahansa Yogananda', 1255],
    ['The Dancing Wu Li Masters', 'Gary Zukav', 422]
]

function buildLibrary() {
    starterBooks.forEach((book) => {
        Library.addBook(book[0], book[1], book[2]);
    })
}

buildLibrary();

