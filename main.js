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
    books.slice(0, -1);
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

  return new Book(toTitleCase(title), toTitleCase(author), numOfPages);
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
    <button class="btn" id="book-status" onclick="changeStatus(this)">On progress</button>
    <button class="btn" id="remove-book" onclick="removeBook(this.parentNode.parentNode)">Remove</button>
  </div>
  `;

  gridContainer.appendChild(bookContainer);
}

function changeStatus(currentStatus) {
  if (currentStatus.textContent === 'On progress') {
    currentStatus.textContent = 'Completed';
    currentStatus.style.backgroundColor = '#9fff9c';
  } else {
    currentStatus.textContent = 'On progress';
    currentStatus.style.backgroundColor = '#ff9c9c';
  }
}

function removeBook(bookContainer) {
  const gridContainer = document.querySelector('.grid-container');
  gridContainer.removeChild(bookContainer);
}

function clearInput() {
  titleInput.value = '';
  authorInput.value = '';
  numOfPagesInput.value = '';
}

function toTitleCase(str) {
  let lower = str.toLowerCase();
  return lower
    .split(' ')
    .map((word) => {
      if (word.includes("'")) {
        return word
          .split("'")
          .map((part) => part[0].toUpperCase() + part.substring(1))
          .join("'");
      }
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(' ');
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
