class BookCollection {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('collection')) || [];
    this.bookList = document.getElementById('book-list');
    this.addBookForm = document.getElementById('add-book-form');
    this.addBookButton = this.addBookForm.querySelector('button');
    this.titleInput = this.addBookForm.querySelector('#title-input');
    this.authorInput = this.addBookForm.querySelector('#author-input');

    this.addBook = this.addBook.bind(this);
    this.removeBook = this.removeBook.bind(this);

    this.addBookButton.addEventListener('click', this.addBook);
    this.bookList.addEventListener('click', this.removeBook);

    this.render();
  }

  addBook(event) {
    event.preventDefault();
    const title = this.titleInput.value;
    const author = this.authorInput.value;
    const book = { title, author };
    this.books.push(book);
    localStorage.setItem('collection', JSON.stringify(this.books));
    this.render();
    this.addBookForm.reset();
  }

  removeBook(event) {
    if (event.target.nodeName === 'BUTTON') {
      const li = event.target.closest('li');
      const bookIndex = Array.prototype.indexOf.call(li.parentNode.children, li);
      this.books.splice(bookIndex, 1);
      localStorage.setItem('collection', JSON.stringify(this.books));
      this.render();
    }
  }

  render() {
    this.bookList.innerHTML = '';
    this.books.forEach((book) => {
      const li = document.createElement('li');
      li.textContent = `${book.title} by ${book.author}`;

      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.id = 'toa';

      li.appendChild(removeButton);
      this.bookList.appendChild(li);
    });
  }
}

new BookCollection();
