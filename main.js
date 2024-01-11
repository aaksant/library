// Buttons
const addButton = document.getElementById('add-btn');

// Dialog
const dialog = document.getElementById('dialog');
const title = document.getElementById('title');
const author = document.getElementById('author');
const numOfPages = document.getElementById('numOfPages');

// Add book button handling
addButton.addEventListener('click', () => dialog.showModal());

dialog.addEventListener('close', () => {
  title.value = '';
  author.value = '';
  numOfPages.value = '';
});

document.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
