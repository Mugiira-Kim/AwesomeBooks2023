// Retrieve the collection from localStorage if it exists, or initialize it to an empty array
const collection = JSON.parse(localStorage.getItem('collection')) || [];

// Get references to the form and list elements
const addBookForm = document.getElementById('add-book-form');
const bookList = document.getElementById('book-list');

// Define a function to add a new book to the collection and display it in the list
function addBook(title, author) {
	// Create a new book object and add it to the collection
	const newBook = { title, author };
	collection.push(newBook);

	// Save the updated collection to localStorage
	localStorage.setItem('collection', JSON.stringify(collection));

	// Create a new list item and append it to the list
	const li = document.createElement('li');
	li.textContent = `${title} by ${author}`;
	bookList.appendChild(li);
}

// Define a function to remove a book from the collection and the list
function removeBook(bookIndex) {
	// Remove the book from the collection using the array filter() method
	collection.splice(bookIndex, 1);

	// Save the updated collection to localStorage
	localStorage.setItem('collection', JSON.stringify(collection));

	// Remove the corresponding list item from the list
	bookList.removeChild(bookList.childNodes[bookIndex]);
}

// Display all books saved in the collection in the top part of the page
for (const book of collection) {
	const li = document.createElement('li');
	li.textContent = `${book.title} by ${book.author}`;
	bookList.appendChild(li);
}

// Add an event listener to the form to add a new book when submitted
addBookForm.addEventListener('submit', event => {
	event.preventDefault();
	const title = document.getElementById('title-input').value;
	const author = document.getElementById('author-input').value;
	addBook(title, author);
	addBookForm.reset();
});

// Add event listeners to each list item to remove the corresponding book when clicked
bookList.addEventListener('click', event => {
	if (event.target.nodeName === 'LI') {
		const bookIndex = Array.from(bookList.childNodes).indexOf(event.target);
		removeBook(bookIndex);
	}
});
