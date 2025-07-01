// Variables
const libContainer = document.querySelector(".library-container");

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

    this.toggleRead = function () {
        this.read = !this.read;
    }

    this.getHTML = function () {
        return `
        <div data-cUUID="${this.id}" class="book-card">
            <h3 class="book-title">${this.title}</h3>
            <h4 class="book-author">By ${this.author}</h4>
            <div class="page-read-container">
                <p class="page-count">${this.pageCount} pages</p>
                <p class="had-read">${this.read ? "Read" : "Unread"}</p>
            </div>

            <div class="book-control">
                <button class="remove-book" type="button" id="btn-delete">Delete Book</button>
                <button class="mark-read" type="button" id="btn-mark-read">Toggle Read</button>
            </div>
        </div>
         `
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
    },
    toggleBookRead: function (UUID) {
        this.books[this.getIndexById(UUID)].toggleRead();
    },
    // setEventListeners: function () {
    //     const cards = document.querySelectorAll(".book-card");

    //     //Mark Read Event Listener
    //     Array.from(cards).forEach((element) => {
    //         const btnRead = element.querySelector("#btn-mark-read");
    //         console.log(btnRead);
    //         const id = element.dataset.cuuid;
    //         console.log(id);
    //         btnRead.addEventListener('click', () => {
    //             console.log(`Clicked: ${id}`)
    //             Library.markBookRead(id);
    //             Library.populateCardContainer();
    //             Library.setEventListeners();
    //         });

    //     });

    // },
    populateCardContainer: function () {
        libContainer.innerHTML = "";
        this.books.forEach((book) => {
            const html = book.getHTML();
            libContainer.insertAdjacentHTML("beforeend", html);
        });
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

// Populate HTML
Library.populateCardContainer();
// Library.setEventListeners();

document.addEventListener('click', (event) => {
    if (event.target.closest('#btn-mark-read')) {
        const card = event.target.closest('.book-card');
        if (!card) return;
        const id = card.dataset.cuuid;
        Library.toggleBookRead(id);
        Library.populateCardContainer();

    } else if (event.target.closest('#btn-delete')) {
        console.log("Delete clicked");
        const card = event.target.closest('.book-card');
        if (!card) return;
        const id = card.dataset.cuuid;
        Library.removeBook(id);
        Library.populateCardContainer();
    }
})


