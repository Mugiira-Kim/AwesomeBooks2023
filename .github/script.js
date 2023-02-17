class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class BookCollection {
  constructor() {
    this.books = JSON.parse(localStorage.getItem("collection")) || [];
    this.bookList = document.getElementById("book-list");
    this.addBookForm = document.getElementById("add-book-form");
    this.addBookForm.addEventListener("submit", this.addBook.bind(this));
    this.bookList.addEventListener("click", this.removeBook.bind(this));
    this.render();
  }

  addBook(event) {
    event.preventDefault();
    const title = document.getElementById("title-input").value;
    const author = document.getElementById("author-input").value;
    const book = new Book(title, author);
    this.books.push(book);
    localStorage.setItem("collection", JSON.stringify(this.books));
    this.render();
    this.addBookForm.reset();
  }

  removeBook(event) {
    if (event.target.nodeName === "BUTTON") {
      const bookIndex = Array.from(
        event.target.parentNode.parentNode.children
      ).indexOf(event.target.parentNode);
      this.books.splice(bookIndex, 1);
      localStorage.setItem("collection", JSON.stringify(this.books));
      this.render();
    }
  }

  render() {
    this.bookList.innerHTML = "";
    for (const [index, book] of this.books.entries()) {
      const li = document.createElement("li");
      li.textContent = `${book.title} by ${book.author}`;

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.id = "toa";

      li.appendChild(removeButton);
      this.bookList.appendChild(li);
    }
  }
}

const bookCollection = new BookCollection();
