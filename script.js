const myLibrary = [];

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

function addBookToLibrary(title, author, page, read) {
  const newBook = new Book(title, author, page, read);

  myLibrary.push(newBook);
}

addBookToLibrary("Harry Potter", "J.K Rowling", 100, false);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("1984", "George Orwell", 328, false);

const bookContainer = document.querySelector("#library");
function displayBooks() {
  bookContainer.innerHTML = "";

  myLibrary.forEach((book) => {
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
      const bookIndex = myLibrary.findIndex((b) => b.id === card.dataset.id);
      myLibrary.splice(bookIndex, 1);
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

  addBookToLibrary(title, author, pages, read);

  displayBooks();

  bookForm.reset();

  dialog.close();
});
