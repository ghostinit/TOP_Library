// Variables
const libContainer = document.querySelector(".library-container");

// Modal Vars
const openBtn = document.querySelector(".btn-new-book");
const modal = document.querySelector("#modal");
const closeBtn = modal.querySelector('.close-button');
const inputTitle = document.querySelector('#book-title');
const addBookButton = document.querySelector('#submit-book-button');
const newBookForm = document.querySelector('#add-book-form');
const booksInLibraryValue = document.querySelector('#books-in-lib');
const booksReadValue = document.querySelector('#books-read');
const pagesReadValue = document.querySelector('#pages-read');


// Book Object
function Book(title, author, pageCount, read) {
    if (!new.target) {
        throw Error("You MUST use 'new' keyword when creating a Book object");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;

    this.hasRead = function () {
        return this.read;
    }

    this.getInfo = function () {
        return `${this.title} by ${this.author}, ${this.pageCount} pages, ${this.read ? "Has Read" : "Has NOT Read"}`
    }

    this.toggleRead = function () {
        this.read = !this.read;
        return this.read;
    }

    this.getHTML = function () {
        let base = `
        <div data-cUUID="${this.id}" class="book-card" role="group" aria-labelledby="title-${this.id}">
                    <div class="book-title-container">
                        <h2 class="book-title" id="title-${this.id}">${this.title}</h2>
                        <img id="book-read-icon-${this.id}" class="${this.read ? "icon-visible" : "icon-hidden"} has-read-icon" src="icons/eye-check-outline.svg"
                            alt="Icon of eye with a checkmark indicating the book has been read">
                    </div>
                    <h3 class="book-author">By ${this.author}</h3>
                    <div class="page-read-container">
                        <p class="page-count">${this.pageCount} pages</p>
                    </div>

                    <div class="book-control">
                        <button class="btn-remove-book" type="button" aria-label="Delete ${this.title}"><img class="delete-book-icon"
                                src="icons/trash-can-outline.svg" alt="Icon of a trash red trash can"></button>
                        <!-- <button class="btn-mark-read" type="button"
                            aria-label="Toggle read status for ${this.title}">Toggle Read</button> -->

                        <div class="read-toggle-container">
                            Read
                            <label class="switch">
                                <input type="checkbox" class="read-toggle" ${this.read ? "checked" : ""}/>
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>
                </div>
         `

        // const readIcon = base.querySelector(`#book-read-icon-${this.id}`);
        // const hasRead = this.read;
        // if (hasRead) {
        //     readIcon.classList.remove('icon-hidden');
        //     readIcon.classList.add('icon-visible');
        // } else {
        //     readIcon.classList.remove('icon-visible');
        //     readIcon.classList.add('icon-hidden');
        // }
        return base;
    }
}


// Library Object
const Library = {
    books: [],
    sortedFilteredBooks: [],
    pagesRead: 0,
    booksRead: 0,
    booksInLibrary: 0,
    addBook: function (title, author, pageCount, read = false) {
        this.books.push(new Book(title, author, pageCount, read));
        this.updateLibStats();
    },
    printBooks: function () {
        this.books.forEach((book) => {
            console.log(`${book.title} by ${book.author}, ${book.pageCount} pages, ${book.read ? "Has Read" : "Has NOT Read"}: ID: ${book.id}`)
        })
    },
    removeBook: function (UUID) {
        const idx = this.getIndexById(UUID);
        this.books.splice(idx, 1);
        this.updateLibStats();
    },
    getIndexById: function (UUID) {
        return this.books.findIndex(book => book.id === UUID);
    },
    toggleBookRead: function (UUID) {
        const hasRead = this.books[this.getIndexById(UUID)].toggleRead();
        this.updateLibStats();
        return hasRead;
    },
    populateCardContainer: function () {
        libContainer.innerHTML = "";
        this.books.forEach((book) => {
            const html = book.getHTML();
            libContainer.insertAdjacentHTML("beforeend", html);
        });
    },
    updateLibStats: function () {
        this.booksInLibrary = this.books.length;
        this.booksRead = 0;
        this.pagesRead = 0;
        this.books.forEach((book) => {
            if (book.hasRead()) {
                this.booksRead += 1;
                this.pagesRead += book.pageCount;
            }
        })
    }

}

const starterBooks = [
    ['Lord of the Rings', 'J.R.R. Tolkien', 684, true],
    ['Odd Thomas', 'Dean Koontz', 732, false],
    ['Autobiography of A Yogi', 'Parmahansa Yogananda', 1255, true],
    ['The Dancing Wu Li Masters', 'Gary Zukav', 422, true],
    ['1984', 'George Orwell', 328, false],
    ['Dune', 'Frank Herbert', 688, true],
    ['Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', 498, false],
    ['The Power of Now', 'Eckhart Tolle', 236, true],
    ['A Brief History of Time', 'Stephen Hawking', 212, false],
    ['The Alchemist', 'Paulo Coelho', 208, false],
    ['The Four Agreements', 'Don Miguel Ruiz', 160, true],
    ['The Art of War', 'Sun Tzu', 273, true],
    ['Meditations', 'Marcus Aurelius', 304, false],
    ['The Bhagavad Gita', 'Vyasa', 700, true],
    ['Crime and Punishment', 'Fyodor Dostoevsky', 671, false],
    ['The Book of Secrets', 'Deepak Chopra', 288, false],
    ['Man’s Search for Meaning', 'Viktor E. Frankl', 200, true],
    ['Becoming Supernatural', 'Dr. Joe Dispenza', 384, true],
    ['The Tao of Physics', 'Fritjof Capra', 352, false],
    ['The Road', 'Cormac McCarthy', 287, true],
    ['Brave New World', 'Aldous Huxley', 311, true],
    ['Zen and the Art of Motorcycle Maintenance', 'Robert M. Pirsig', 540, false],
    ['Ishmael', 'Daniel Quinn', 266, false],
    ['The Untethered Soul', 'Michael A. Singer', 200, true],
    ['Atomic Habits', 'James Clear', 320, false],
    ['The War of Art', 'Steven Pressfield', 190, true],
    ['Think and Grow Rich', 'Napoleon Hill', 238, false],
    ['The Prophet', 'Kahlil Gibran', 128, true],
    ['The Doors of Perception', 'Aldous Huxley', 96, false],
    ['The Seat of the Soul', 'Gary Zukav', 384, true]
];


function buildLibrary() {
    starterBooks.forEach((book) => {
        Library.addBook(book[0], book[1], book[2], book[3]);
    })
}

function updateStats() {
    booksInLibraryValue.textContent = Library.booksInLibrary;
    booksReadValue.textContent = Library.booksRead;
    pagesReadValue.textContent = Library.pagesRead;
}

// Populate the page with some books
buildLibrary();
Library.populateCardContainer();
updateStats();

// Event listeners for 'toggle read' and 'delete' buttons on each book
document.addEventListener('click', (event) => {
    if (event.target.closest('.read-toggle')) {
        const card = event.target.closest('.book-card');
        if (!card) return;

        const id = card.dataset.cuuid;

        const readIcon = card.querySelector(`#book-read-icon-${id}`);
        const hasRead = Library.toggleBookRead(id);
        if (hasRead) {
            readIcon.classList.remove('icon-hidden');
            readIcon.classList.add('icon-visible');
        } else {
            readIcon.classList.remove('icon-visible');
            readIcon.classList.add('icon-hidden');
        }
        updateStats();

    } else if (event.target.closest('.btn-remove-book')) {
        console.log("Delete clicked");
        const card = event.target.closest('.book-card');
        if (!card) return;
        const id = card.dataset.cuuid;
        Library.removeBook(id);
        Library.populateCardContainer();
        updateStats();
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
        updateStats();
    }

});