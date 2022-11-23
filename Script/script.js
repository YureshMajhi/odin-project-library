let myLibrary = [];

// initializing Value
const form = document.querySelector("#form");
const nameVal = document.querySelector("#name-el");
const authorVal = document.querySelector("#author-el");
const statusVal = document.querySelector("#status-el");
const submitBtn = document.querySelector("#submit-el");
const displayBook = document.querySelector(".main");
const myLibraryStorage = JSON.parse(localStorage.getItem("myLibrary"));

if (myLibraryStorage) {
  myLibrary = myLibraryStorage;
  generateList();
}

// storing value using constructor
function Book(name, author, id) {
  this.name = name;
  this.author = author;
  this.id = id;
}

// giving value to constructor
function addBookToLibrary() {
  let book = new Book(
    nameVal.value,
    authorVal.value,
    (id = new Date().getTime())
  );
  return book;
}

// form display
form.style.display = "none";

document.querySelector("#add-book").addEventListener("click", function () {
  form.style.display = "flex";
});

// submit button clicked
submitBtn.addEventListener("click", function () {
  submit();
});
form.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    submit();
  }
});

function submit() {
  form.style.display = "none";
  if (nameVal.value && authorVal.value) {
    myLibrary.push(addBookToLibrary());

    generateList();

    nameVal.value = "";
    authorVal.value = "";
  }
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function generateList() {
  // clearing main before rendering all
  displayBook.innerHTML = "";

  //   generating library
  myLibrary.forEach(function (bookEl) {
    let element = document.createElement("div");
    let name = document.createElement("p");
    let author = document.createElement("p");
    name.textContent = bookEl.name;
    author.textContent = "By:- " + bookEl.author;

    // creating delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.id = bookEl.id;

    // adding book info to document
    element.appendChild(name);
    element.appendChild(author);
    element.appendChild(deleteBtn);
    displayBook.appendChild(element);

    deleteBtn.addEventListener("click", deleteBook);
  });
}

// deleting book
function deleteBook(e) {
  myLibrary = myLibrary.filter(function (bookEl) {
    if (e.target.id == bookEl.id) {
      return false;
    } else {
      return true;
    }
  });
  generateList();
}
