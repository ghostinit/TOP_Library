// Variables
const libContainer = document.querySelector(".library-container");

// Modal Vars
const openBtn = document.querySelector(".btn-new-book");
const modal = document.querySelector("#modal");
const closeBtn = modal.querySelector('.close-button');
const inputTitle = document.querySelector('#book-title');
const addBookButton = document.querySelector('#submit-book-button');
const newBookForm = document.querySelector('#add-book-form');


// Book Object
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
        <div data-cUUID="${this.id}" class="book-card" role="group" aria-labelledby="title-${this.id}">
            <h2 class="book-title" id="title-${this.id}">${this.title}</h2>
            <h3 class="book-author">By ${this.author}</h3>
            <div class="page-read-container">
                <p class="page-count">${this.pageCount} pages</p>
                <p class="has-read" aria-live="polite">${this.read ? "Read" : "Unread"}</p>
            </div>

            <div class="book-control">
                <button class="btn-remove-book" type="button" aria-label="Delete ${this.title}">Delete Book</button>
                <button class="btn-mark-read" type="button" aria-label="Toggle read status for ${this.title}">Toggle Read</button>
            </div>
        </div>
         `
    }
}


// Library Object
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

// Populate the page with some books
buildLibrary();
Library.populateCardContainer();

// Event listeners for 'toggle read' and 'delete' buttons on each book
document.addEventListener('click', (event) => {
    if (event.target.closest('.btn-mark-read')) {
        const card = event.target.closest('.book-card');
        if (!card) return;
        const id = card.dataset.cuuid;
        Library.toggleBookRead(id);
        Library.populateCardContainer();

    } else if (event.target.closest('.btn-remove-book')) {
        console.log("Delete clicked");
        const card = event.target.closest('.book-card');
        if (!card) return;
        const id = card.dataset.cuuid;
        Library.removeBook(id);
        Library.populateCardContainer();
    }
})


// Modal Logic
openBtn.addEventListener('click', () => {
    modal.classList.add('show');
    inputTitle.focus();
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
});

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.remove('show');
    }
});

addBookButton.addEventListener('click', (event) => {
    event.preventDefault();
    const isValid = newBookForm.reportValidity();
    if (isValid) {
        modal.classList.remove('show');
        const newTitle = newBookForm.querySelector('#book-title').value;
        newBookForm.querySelector('#book-title').value = "";

        const newAuthor = newBookForm.querySelector('#book-author').value;
        newBookForm.querySelector('#book-author').value = "";

        const newPageCount = newBookForm.querySelector('#page-count').value;
        newBookForm.querySelector('#page-count').value = "";

        Library.addBook(newTitle, newAuthor, newPageCount);
        Library.populateCardContainer();
    }

});