let books = [];

function Book(title, author, numOfPages) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
}

function addBook() {
  const newBook = getBookData();

  if (!isAlreadyExist(newBook)) {
    books.push(newBook);
    clearInput();
    displayBook(newBook);
  }
}

function isAlreadyExist(book) {
  return books.some((entry) => entry.title === book.title);
}

function getBookData() {
  const title = titleInput.value;
  const author = authorInput.value;
  const numOfPages = numOfPagesInput.value;

  return new Book(title, author, numOfPages);
}

function clearInput() {
  titleInput.value = '';
  authorInput.value = '';
  numOfPagesInput.value = '';
}

function displayBook(book) {
  const gridContainer = document.querySelector('.grid-container');
  const bookContainer = document.createElement('div');

  bookContainer.classList.add('book-container');
  
  bookContainer.innerHTML = `
  <div class="book-id">
    <p class="book-title">${book.title}</p>
    <p class="book-author">by ${book.author}</p>
    <p class="book-pages">${book.numOfPages} pages</p>
  </div>
  <div class="book-control">
    <button class="btn status" id="book-status">Done read</button>
    <button class="btn remove" id="remove-book" onclick="removeBook()">Remove</button>
  </div>
  `;

  gridContainer.appendChild(bookContainer);
}

function changeStatus() {
  
}

function removeBook() {
  const gridContainer = document.querySelector('.grid-container');
  const lastEntry = gridContainer.lastChild;

  gridContainer.removeChild(lastEntry);
}

let titleInput = document.getElementById('title');
let authorInput = document.getElementById('author');
let numOfPagesInput = document.getElementById('numOfPages');

const addButton = document.getElementById('add-btn');
const addForm = document.getElementById('add-form');

const dialog = document.getElementById('dialog');

addButton.addEventListener('click', () => dialog.showModal());

document.addEventListener('click', (e) => {
  if (e.target === dialog) {
    clearInput();
    dialog.close();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    clearInput();
    dialog.close();
  }
});

addForm.onsubmit = addBook;