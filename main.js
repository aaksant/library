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

// Inputs
let titleInput = document.getElementById('title');
let authorInput = document.getElementById('author');
let numOfPagesInput = document.getElementById('numOfPages');

// Buttons
const addButton = document.getElementById('add-btn');
const addForm = document.getElementById('add-form');
const confirmAdd = document.getElementById('confirm-add');

// Dialog
const dialog = document.getElementById('dialog');

// Add book button
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

// Confirm add
addForm.onsubmit = addBook;
