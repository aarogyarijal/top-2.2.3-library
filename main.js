let bookList = document.querySelector("#book-list")

//For storing arrays to LocalStorage = Converts arrays to string and vice-versa
Storage.prototype.setObj = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
}



//For prototype
// function changeStateConstructor() {

// }
// changeStateConstructor.prototype.change = function () {
//     if (this.read === "read") {
//         this.read = "not read";
//         render();
//     } else {
//         this.read = "read";
//         render();
//     }
// }

// changeStateConstructor.prototype.info = function () {
//     return (`${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`);
// }



function book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
// book.prototype = Object.create(changeStateConstructor.prototype);

//Checking if Library exists in localStorage
getLib = localStorage.getObj("SavedLibrary")
if (!getLib) {
    //If Library doesn't exist create new and add 2 demo books
    var myLibrary = [];
    addBookToLibrary("Mero 1st Book", "Aarogya Rijal", "200", "read");
    addBookToLibrary("Mero 2nd Book", "Aarogya Rijal", "100", "not read");
    localStorage.setObj("SavedLibrary", myLibrary)
} else {
    //If Library exists store it in myLibrary array
    myLibrary = localStorage.getObj("SavedLibrary");
    render();
}

function addBookToLibrary(title, author, pages, read) {
    bookobj = new book(title, author, pages, read);
    myLibrary.push(bookobj);
    localStorage.setObj("SavedLibrary", myLibrary)
    render();
}

function render() {
    bookList.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
        printBook = myLibrary[i]
        let newElement = document.createElement("div");
        newElement.className = "book-div";
        newElement.id = `book-${i}`;
        newElement.innerHTML = `<h1>${printBook.title}</h1>
            <ul>
            <li>Author: ${printBook.author}</li>
            <li>Pages: ${printBook.pages}</li>
            <li id="read-status">Status: ${printBook.read}</li>
            <button onclick="deleteBook(${i})">Delete</button>
            <button onclick="changeState(${i})">Change State</button>`;
        bookList.appendChild(newElement);
    }
    localStorage.setObj("SavedLibrary", myLibrary)
}

function pushBook() {
    let title = document.forms["bookForm"]["bookTitle"].value;
    let author = document.forms["bookForm"]["bookAuthor"].value;
    let pages = document.forms["bookForm"]["bookPages"].value;
    let readRaw = document.forms["bookForm"]["bookRead"].checked;
    if (title === "" || author === "" || pages === "") { alert("Invalid Input"); return; }
    console.log(readRaw)
    readRaw ? read = "read" : read = "not read";
    addBookToLibrary(title, author, pages, read);
    document.forms["bookForm"].reset();
    document.querySelector("#book-form").style.display = "none";
}

function deleteBook(bookNumber) {
    myLibrary.splice(bookNumber, 1);
    render();

}

function changeState(bookNumber) {
    if (myLibrary[bookNumber].read === "read") {
        myLibrary[bookNumber].read = "not read";
        render();
    } else {
        myLibrary[bookNumber].read = "read";
        render();
    }
}


function showForm() {
    document.querySelector("#book-form").style.display = "flex";
}