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
  } else {
    clearInput();
    alert('Book already exists.');
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
    <button class="btn" id="book-status" onclick="changeStatus()">On progress</button>
    <button class="btn" id="remove-book" onclick="removeBook()">Remove</button>
  </div>
  `;

  gridContainer.appendChild(bookContainer);
}

function changeStatus() {
  const statusBtn = document.getElementById('book-status');

  if (statusBtn.textContent === 'On progress') {
    statusBtn.textContent = 'Complete';
    statusBtn.style.backgroundColor = '#9fff9c';
  } else {
    statusBtn.textContent = 'On progress';
    statusBtn.style.backgroundColor = '#ff9c9c';
  }
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
