class Book {
  constructor(title, author, page, read) {
    this.title = title;
    this.author = author;
    this.page = page;
    this.read = read;
    this.id = crypto.randomUUID();
  }

  toggleRead() {
    this.read = !this.read;
  }
}

class Library {
  #books = [];

  add(title, author, page, read) {
    const book = new Book(title, author, page, read);
    this.#books.push(book);
  }

  remove(id) {
    this.#books = this.#books.filter((book) => book.id !== id);
  }

  get books() {
    return [...this.#books];
  }
}

const library = new Library();

library.add("Harry Potter", "J.K Rowling", 100, false);
library.add("The Hobbit", "J.R.R. Tolkien", 295, true);
library.add("1984", "George Orwell", 328, false);

const bookContainer = document.querySelector("#library");
function displayBooks() {
  bookContainer.innerHTML = "";

  library.books.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.dataset.id = book.id;

    card.innerHTML = `
  <h2>Title: ${book.title}</h2>
    <p>Author: ${book.author}</p>
    <p>Pages: ${book.page}</p>
    <p>Status: ${book.read ? "Yes" : "No"}</p>

    <button class="remove-button">Remove</button>
     <button class="toggle-read">Toggle Read</button>`;

    const removeButton = card.querySelector(".remove-button");

    removeButton.addEventListener("click", () => {
      library.remove(card.dataset.id);

      displayBooks();
    });

    const toggledButton = card.querySelector(".toggle-read");

    toggledButton.addEventListener("click", () => {
      book.toggleRead();
      displayBooks();
    });

    bookContainer.appendChild(card);
  });
}

displayBooks();

const newBookButton = document.querySelector("#new-book");

const dialog = document.querySelector("#book-dialog");

const bookForm = document.querySelector("#book-form");

newBookButton.addEventListener("click", () => {
  dialog.showModal();
});

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value;

  const author = document.querySelector("#author").value;

  const pages = document.querySelector("#pages").value;

  const read = document.querySelector("#read").checked;

  library.add(title, author, pages, read);

  displayBooks();

  bookForm.reset();

  dialog.close();
});
