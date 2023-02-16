const collection = JSON.parse(localStorage.getItem('collection')) || [];
const addBookForm = document.getElementById('add-book-form');
const bookList = document.getElementById('book-list');

function addBook(title, author) {
	const newBook = { title, author };
	collection.push(newBook);
	localStorage.setItem('collection', JSON.stringify(collection));

	const li = document.createElement('li');
	li.textContent = `${title} by ${author}`;
	bookList.appendChild(li);
}

function removeBook(bookIndex) {

	collection.splice(bookIndex, 1);
	localStorage.setItem('collection', JSON.stringify(collection));

	bookList.removeChild(bookList.childNodes[bookIndex]);
}

for (const book of collection) {
	const li = document.createElement('li');
	li.textContent = `${book.title} by ${book.author}`;
	bookList.appendChild(li);
}

addBookForm.addEventListener('submit', event => {
	event.preventDefault();
	const title = document.getElementById('title-input').value;
	const author = document.getElementById('author-input').value;
	addBook(title, author);
	addBookForm.reset();
});

bookList.addEventListener('click', event => {
	if (event.target.nodeName === 'LI') {
		const bookIndex = Array.from(bookList.childNodes).indexOf(event.target);
		removeBook(bookIndex);
	}
});
