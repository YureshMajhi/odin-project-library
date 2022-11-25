let myLibrary = [];

// initializing Value
const form = document.querySelector("#form");
const nameVal = document.querySelector("#name-el");
const authorVal = document.querySelector("#author-el");
const submitBtn = document.querySelector("#submit-el");
const displayBook = document.querySelector(".main");

// checking local storage
const myLibraryStorage = JSON.parse(localStorage.getItem("myLibrary"));

// rendering from local storage
if (myLibraryStorage) {
  myLibrary = myLibraryStorage;
  generateList();
}

// setting local storage
function setLocalStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
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
}

function generateList() {
  // clearing main before rendering all
  displayBook.innerHTML = "";

  //   generating library
  myLibrary.forEach(function (bookEl) {
    const element = document.createElement("div");
    const name = document.createElement("p");
    const author = document.createElement("p");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    name.textContent = bookEl.name;
    author.textContent = "By:- " + bookEl.author;

    // creating delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.id = bookEl.id;

    // checkbox
    checkbox.dataset.todoId = bookEl.id;
    checkbox.onchange = changeTodo;
    if (bookEl.isDone == true) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }

    // adding book info to document
    element.appendChild(name);
    element.appendChild(author);
    element.appendChild(checkbox);
    element.appendChild(deleteBtn);

    displayBook.appendChild(element);

    deleteBtn.addEventListener("click", deleteBook);
  });
  setLocalStorage();
}

function changeTodo(e) {
  const checkbox = e.target;

  const todoId = checkbox.dataset.todoId;
  const checked = checkbox.checked;

  toggleCheckbox(todoId, checked);
  generateList();
}

function toggleCheckbox(todoId, checked) {
  myLibrary.forEach(function (bookEl) {
    if (bookEl.id == todoId) {
      bookEl.isDone = checked;
    }
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
  setLocalStorage();
}
