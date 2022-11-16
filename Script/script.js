let myLibrary = [];

let nameInput = document.querySelector("#name-value");
let authorInput = document.querySelector("#author-value");
let statusInput = document.querySelector("#status-value");
let arrayCount = 0;
let contents = document.querySelector(".main");

const arrFromLocal = JSON.parse(localStorage.getItem("myLibrary"));

if (arrFromLocal) {
  myLibrary = arrFromLocal;
  contents.innerHTML = generateList(myLibrary);
  arrayCount = JSON.parse(localStorage.getItem("arrayCount"));
}

let form = document.querySelector(".form");
form.style.display = "none";
document.querySelector("#add").addEventListener("click", function () {
  form.style.display = "block";
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
    localStorage.setItem("arrayCount", JSON.stringify(arrayCount));
    nameInput.value = "";
    authorInput.value = "";
    statusInput.value = "";
  }
  contents.innerHTML = generateList(myLibrary);
  form.style.display = "none";

  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
});

function generateList(arg) {
  let items = "";
  for (let i = 0; i < myLibrary.length; i++) {
    items += `
    <div class="card">
        <p>Name = ${arg[i].name}</p>
        <p>Author = ${arg[i].author}</p>
        <p>Status = ${arg[i].status}</p>
        <hr>
    <div>
    `;
  }
  return items;
}

document.querySelector("#delete").addEventListener("click", function () {
  myLibrary = [];
  contents.innerHTML = generateList(myLibrary);
  arrayCount = 0;
  localStorage.clear();
});
