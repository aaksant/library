let books = [];

class Book {
  constructor(title, author, numOfPages, initialStatus) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.initialStatus = initialStatus;
  }
}

function addBook() {
  const newBook = getBookData();

  if (!isAlreadyExist(newBook)) {
    clearInput();
    books.push(newBook);
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
  const initialStatus = checkbox.checked;

  return new Book(
    toTitleCase(title),
    toTitleCase(author),
    numOfPages,
    setInitialStatus(initialStatus)
  );
}

function displayBook(book) {
  const gridContainer = document.querySelector('.grid-container');
  const bookContainer = document.createElement('div');

  bookContainer.classList.add('book-container');

  const initialStatusColor = book.initialStatus === 'Completed' ? '#9fff9c' : '#ff9c9c';

  bookContainer.innerHTML = `
    <div class="book-id">
      <p class="book-title">${book.title}</p>
      <p class="book-author">by ${book.author}</p>
      <p class="book-pages">${book.numOfPages} pages</p>
    </div>
    <div class="book-control">
      <button class="btn" id="book-status" onclick="changeStatus(this)" style="background-color: ${initialStatusColor};">${book.initialStatus}</button>
      <button class="btn" id="remove-book" onclick="removeBook(this.parentNode.parentNode)">Remove</button>
    </div>
  `;

  gridContainer.appendChild(bookContainer);
}


function setInitialStatus(cond) {
  if (cond === true) return 'Completed';
  return 'On progress';
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
  const bookIndex = Array.from(gridContainer.childNodes).indexOf(bookContainer);

  gridContainer.removeChild(bookContainer);
  books.splice(bookIndex, 1);
}

function clearInput() {
  titleInput.value = '';
  authorInput.value = '';
  numOfPagesInput.value = '';
  checkbox.checked = false;
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
let checkbox = document.getElementById('initialStatus');

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
