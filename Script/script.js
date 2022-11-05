let myLibrary = [];

let nameInput = document.querySelector("#name-value");
let authorInput = document.querySelector("#author-value");
let statusInput = document.querySelector("#status-value");
let arrayCount = 0;

let a;
let form = document.querySelector(".form");
document.querySelector("#add").addEventListener("click", function () {
  if (a == 1) {
    form.style.display = "block";
    return (a = 0);
  } else {
    form.style.display = "none";
    return (a = 1);
  }
});

function Book(name, author, status) {
  this.name = name;
  this.author = author;
  this.status = status;
}

function addBookToLibrary() {
  let book = new Book(nameInput.value, authorInput.value, statusInput.value);
  return book;
}

document.querySelector("#submit").addEventListener("click", function () {
  if (
    nameInput.value != "" &&
    authorInput.value != "" &&
    statusInput.value != ""
  ) {
    myLibrary[arrayCount] = addBookToLibrary();
    arrayCount++;
    nameInput.value = "";
    authorInput.value = "";
    statusInput.value = "";
  }
  for (let i = 0; i < myLibrary.length; i++) {
    console.log(myLibrary[i]);
  }
});
