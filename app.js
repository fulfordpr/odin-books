const bookDisplay = document.querySelector('.books');
const submit = document.querySelector('.submit');
const storage = JSON.parse(localStorage.myLibrary);
let myLibrary = [];


const saveData = (book) => {
    let data = JSON.parse(localStorage.getItem('myLibrary'));
    data.push(book);
    localStorage.setItem("myLibrary", JSON.stringify(data));

}


const Book = function(title, author, pages, read){
    for(let i = 0; i < storage.length; i++){
        if (title === storage[i].title){
            if (window.confirm(`You already have a book called "${storage[i].title}" in your library. Are you sure you want to add this book?`)){
                this.title = title;
                this.author = author;
                this.pages = pages;
                this.read = read;
                console.log('confirmed');
            } else {
                alert(`"${title}" was not added to the library`);
                return false;
            }
        }
    }
    
}


const addToLibrary = function(){
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');
    const read = document.getElementById('read');
    if(title.value === '' || author.value === ''){
        alert('Must have title and author.')
    } else {
        const newBook = new Book(title.value, author.value, pages.value, read.value);
        saveData(newBook);
        fetchBooks();
    }
    
}


const fetchBooks = function(){
    bookDisplay.innerHTML = '';
    if (localStorage.getItem('myLibrary')){
        for (let i = 0; i < storage.length; i++){
            const title = document.createElement('h2');
            const author = document.createElement('h3');
            const pages = document.createElement('span');
            const read = document.createElement('button');
            const card = document.createElement('div')

            card.classList.add('card');
            
            title.textContent = storage[i].title;
            card.appendChild(title);

            author.textContent = storage[i].author;
            card.appendChild(author);

            pages.textContent = `${storage[i].pages} pages`;
            card.appendChild(pages);
            
            read.type = 'radio';
            read.classList.add('markRead');
            if (storage[i].read === 'true'){
                read.classList.add('markRead');
                read.textContent = 'Read';
            } else {
                read.classList.add('notRead');
                read.textContent = 'Unread';
            }
            card.appendChild(read);
            bookDisplay.appendChild(card);
        }
    } else {
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    }
    
}

window.onload = fetchBooks();


submit.addEventListener('click', ()=>{
    addToLibrary();
});


