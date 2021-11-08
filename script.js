//DOM elements
const submit = document.querySelector('.submit');
let library = JSON.parse(localStorage.getItem('library'));
let bookshelf = document.querySelector('.books');
let totalPagesRead = 0;
const deleteBook = document.getElementsByClassName('delete');

//Book Constructor
const Book = function(title, author, pages, read){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
}

//Add new Book
const addNewBook = () =>{
    const form = document.querySelector('.form');
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    let read = document.getElementById('read').value;
    //check the read status and set to t/f
    if (read === 'true'){
        read = true;
    } else {
        read = false;
    }
    //make a new book object using the constuctor format
    newBook = new Book(title, author, pages, read);
    //add the book to the library
    library = JSON.parse(localStorage.getItem('library'));
    library.push(newBook);
    localStorage.setItem('library', JSON.stringify(library));
    //reset the form
    form.reset();
}

//Check if a library array exists. if not, make one. 
const initLibrary = function(){
    if (localStorage.library === undefined){
        localStorage.setItem('library', '[]');
    }
}

const pullLibrary = () => {
    bookshelf.innerHTML = '';
    for (i = 0; i < library.length; i++){
        let card = document.createElement('div');
        card.classList.add('card')
        bookshelf.appendChild(card);

        let title = document.createElement('h2');
        title.textContent = library[i].title;
        card.appendChild(title);

        let author = document.createElement('h2');
        author.textContent = library[i].author;
        card.appendChild(author);

        let pages = document.createElement('span');
        pages.textContent = library[i].pages;
        card.appendChild(pages); 

        let buttons = document.createElement('div');
        buttons.classList.add('management')
        card.appendChild(buttons); 

        let readStatus = document.createElement('button');
        //check to see if the book has been read
        if (library[i].read === true){
            //mark it as read
            readStatus.textContent = 'Read'
            readStatus.classList.add('markRead')
            //add the number of pages of the read book to the toal
            totalPagesRead += Number(library[i].pages)
        } else {
            readStatus.textContent = 'Unread'
            readStatus.classList.add('notRead')
        }
        buttons.appendChild(readStatus); 
        
        let removeBook = document.createElement('button')
            removeBook.classList.add('delete')
            removeBook.textContent = 'X Delete';
        
        //find a way to delete books
        removeBook.addEventListener('click', (e) =>{
            console.log(EventTarget)
        })
        buttons.appendChild(removeBook); 
    }

}

window.onload = initLibrary;
window.onload = pullLibrary;

submit.addEventListener('click', ()=> {
    addNewBook();
});







