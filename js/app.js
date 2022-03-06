import { books } from './books.js'

const mainDivEl = document.querySelector("#root");
const divLeftEl = document.createElement("div");
const divRightEl = document.createElement("div");

mainDivEl.append(divLeftEl, divRightEl);

divLeftEl.classList.add("divLeft");
divRightEl.classList.add("divRight");

const titleEl = document.createElement("h1");
titleEl.textContent = "Библиотека";
divLeftEl.appendChild(titleEl);

const listLeftEl = document.createElement("ul");
const btnAddLeftEl = document.createElement("button");
btnAddLeftEl.textContent = "Добавить";

divLeftEl.append(listLeftEl, btnAddLeftEl);

btnAddLeftEl.addEventListener('click', addBook);

function renderList() {
    const booksListMarkup = books.map(({ title, id }) =>
        `<li id="${id}"><p class="bookName">${title}</p><button type="button" class="editBtn">Редактировать</button><button type="button" class="delBtn">Удалить</button></li>`).join("");
    listLeftEl.insertAdjacentHTML('afterbegin', booksListMarkup);


    const bookName = document.querySelectorAll('.bookName');
    bookName.forEach(el => el.addEventListener('click', onRenderPreview));
    
    const btnEdit = document.querySelectorAll('.editBtn');
    const btnDelete = document.querySelectorAll('.delBtn');

    btnEdit.forEach(el => el.addEventListener('click', onEditBook))
    btnDelete.forEach(el => el.addEventListener('click', onDeleteBook))
}
    
renderList();

function onRenderPreview(event) {
    const findBook = books.find(({ title }) =>
        event.target.textContent === title);
    const markup = bookMarkup(findBook);
    divRightEl.innerHTML = '';
    divRightEl.insertAdjacentHTML('afterbegin', markup);
};

function bookMarkup({title, author, img, plot}) {
    return `<div>
        <h2>${title}</h2>
        <p>${author}</p>
        <img src="${img}" alt="Обложка книги ${title}">
        <p>${plot}</p>
    </div>`;
};

function onEditBook(event) {
    const editBtn = event.target;
    const titleEdit = editBtn.previousElementSibling;
    
    const findBook = books.find(({ title }) =>
        titleEdit.textContent === title);
};

function onDeleteBook() {
};

function addBook() {
    const newBook = { id: `${Date.now()}`, title: '', author: '', img: '', plot: '' };

    const markup = createForm();
    divRightEl.innerHTML = '';
    divRightEl.insertAdjacentHTML('afterbegin', markup);
}

function createForm() {
    return `
    <form>
        <label>Название книги<input name="title"></label>
        <label>Автор<input name="author"></label>
        <label>Изображение<input name="img"></label>
        <label>Описание<input name="plot"></label>
        <button type="button">Сохранить</button>
    </form>`;
}