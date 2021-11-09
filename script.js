//Check if a library array exists. if not, make one. 
function initLibrary(){
    if (localStorage.library === undefined){
        localStorage.setItem('library', '[]');
    }
}

window.onload = initLibrary()

//DOM elements
const submit = document.querySelector('.submit');
let library = JSON.parse(localStorage.getItem('library'));
let bookshelf = document.querySelector('.books');
let totalPagesRead = 0;


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
    if (title === '' || author === '' || pages === ''){
        alert('Title, Author, and PAge number are Required.')
        return;
    }
    for (let i = 0; i < library.length; i ++){
        if (title === library[i].title){
            alert(`You already have ${title} in your library.`)
            form.reset();
            return;
        }
    }
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



const pullLibrary = () => {
    bookshelf.innerHTML = '';
    totalPagesRead = 0;
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
            document.querySelector('.totalPages').textContent = `${totalPagesRead} Pages Read`
        } else {
            readStatus.textContent = 'Unread'
            readStatus.classList.add('notRead')
        }
        buttons.appendChild(readStatus); 
        
        let removeBook = document.createElement('button')
            removeBook.classList.add('delete')
            removeBook.textContent = 'X Delete';
        
        //Mke each 'delete' button delete books
        removeBook.addEventListener('click', () =>{
            //Remove the card from the UI
            removeBook.parentElement.parentElement.outerHTML = '';
            //find the book title in the card
            thisTitle = removeBook.parentElement.parentElement.firstChild.textContent
            //remove from local storage
            deleteFromLibrary(thisTitle);
        })
        buttons.appendChild(removeBook); 
    }

}

//deletes selected book from local storage {title} comes from the text content of the h2 tag in the card
const deleteFromLibrary = function(title){
    //loop through local storage
    for (let i = 0; i < library.length; i ++){
        //check to see if the chosen card title matches the current index title
        if (library[i].title === title){
            //if a match is found, remove it from the array
            library.splice(i, 1);
            //replacing the library object with the updated library
            localStorage.setItem('library', JSON.stringify(library))
        }
    }
}

//change the status of a book from unread to read.
const changeReadStatus = function(title){
    //loop through local storage
    for (let i = 0; i < library.length; i ++){
        //check to see if the chosen card title matches the current index title
        if (library[i].title === title){
            //if a match is found, set read to true
            library[i].read = true;
            //replacing the library object with the updated library
            localStorage.setItem('library', JSON.stringify(library))
        }
    }
}


window.onload = pullLibrary();


//setting and looping through all the unread buttons and changing their classes/changing the read status
const notRead = document.querySelectorAll('.notRead');
for (i of notRead){
    i.addEventListener('click', function(){
        console.log(this);
        this.classList.remove('notRead');
        this.classList.add('markRead');
        this.textContent = 'Read';
        thisTitle = this.parentElement.parentElement.firstChild.textContent
        console.log(thisTitle)
        changeReadStatus(thisTitle);
    })
}

//button to add new books
submit.addEventListener('click', ()=> {
    addNewBook();
    pullLibrary();
});




