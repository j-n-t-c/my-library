//DOM ELEMENTS
const titleInput = document.querySelector('.title-input');
const authorInput = document.querySelector('.author-input');
const pagesInput = document.querySelector('.pages-input');
const finishedRadio = document.querySelector('.finished-radio');
const unopenedRadio = document.querySelector('.unopened-radio');
const inProgressRadio = document.querySelector('.in-progress-radio');
const submitButtonAdd = document.querySelector('.submit');
const cardTitle = document.querySelector('.title');
const cardAuthor = document.querySelector('.author');
const cardPages = document.querySelector('.pages');
const cardStatus = document.querySelector('.status');
const lastArrow = document.querySelector('.last-arrow')
const nextArrow = document.querySelector('.next-arrow')
const addButton = document.querySelector('.add-button');
const editButton = document.querySelector('.edit-button');
const popUpDiv = document.querySelector('.popup-wrapper');
const popUpDivEdit = document.querySelector('.popup-wrapper-edit');
const formClose = document.querySelector('.form-close');
const editClose = document.querySelector('.edit-form-close');
const editTitle = document.querySelector('.title-edit');
const editAuthor = document.querySelector('.author-edit');
const editPages = document.querySelector('.pages-edit');
const finishedRadioEdit = document.querySelector('.finished-radio-edit');
const unopenedRadioEdit = document.querySelector('.unopened-radio-edit');
const inProgressRadioEdit = document.querySelector('.in-progress-radio-edit');
const submitButtonEdit = document.querySelector('.submit-edit');
const bookCountDisplay = document.querySelector('.book-head');
const removeButton = document.querySelector('.remove-edit');
const cardWrapper = document.querySelector('.card-wrapper');
const emptyLibrary = document.querySelector('.empty-library');
const resetRatingButton = document.querySelector('.reset-rating');
const hideCardWrapper = document.querySelector('.hide-wrapper');

//GLOBAL VARIABLES
var indexCounter = 0
var myLibrary = [];
var starsArray = ['one', 'two', 'three', 'four', 'five'];
var starsArrayEdit = ['one-e', 'two-e', 'three-e', 'four-e', 'five-e'];
var starsArrayAdd = ['one-a', 'two-a', 'three-a', 'four-a', 'five-a'];
var ratingAdd = 0;
var valid = true;

//localStorage
//allow objects to be set and get
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

//EDIT STARS - current book shown
function editStars(array){
        array.forEach(function(element) {
        document.getElementById(element).addEventListener("click", function() {
            //set rating to value of star clicked
            myLibrary[indexCounter]['rating'] = array.indexOf(element) + 1;
        showRating(starsArrayEdit)
        showRating(starsArray);
        })
    })
}
//ADD STARS - when adding new book to library
function addStars(array) {
    array.forEach(function(element) {
    document.getElementById(element).addEventListener("click", function() {
        ratingAdd = array.indexOf(element) + 1;
        showRating(starsArrayAdd);
        return ratingAdd;
        })
    })
}

//function to show rating of current book shown
//must be passed correct array (display or edit or add)
function showRating(array) {
    for (i = 0; i < array.length; i++) {
        document.getElementById(array[i]).classList.remove('checked');
            }
    if (array === starsArrayAdd) {
        for (i = 0; i < ratingAdd; i++) {
            document.getElementById(array[i]).classList.add('checked');
            }
    } else {
        for (i = 0; i < myLibrary[indexCounter]['rating']; i++) {
        document.getElementById(array[i]).classList.add('checked');
        }
    }
    array = starsArray;
}

//book constructor
function Book(title, author, pages, read, rating) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    if (read === 'finished') {
        this.status = "finished"
    } else if (read === 'unopened') {
        this.status = "unopened"
    } else if (read === 'in progress'){
        this.status = 'in progress'
    }
    this.rating = rating;
    this.info = function() {
        return title + ' by ' + author + ', ' + pages + ' pages, ' + this.status + ', ' + this.rating;
    }
}

//create new book in array
function addBook (title, author, pages, read, rating) {
    var newBook = new Book(title, author, pages, read, rating);
    myLibrary.push(newBook);
}

//add books on page load
addBook('The Hobbit', 'J.R. Tolkien', 245, 'in progress', 5)
console.log(myLibrary[0].info());
addBook('Behold a White Wizard', 'Philip Róor', 416, 'finished', 3)
console.log(myLibrary[1].info());
addBook('How to Kill a Rat', 'Dr. Inrig Montezuma', 99, 'unopened', 1)
console.log(myLibrary[2].info());

//display myLibrary[0] to 'card' on page load
//loads edited card on edit submit
function loadCard(index) {
cardTitle.innerHTML = myLibrary[index].title;
cardAuthor.innerHTML = myLibrary[index].author;
cardPages.innerHTML = myLibrary[index].pages;
    if (myLibrary[index].status === 'finished') {
        cardStatus.innerHTML = 'read'
    } else if (myLibrary[index].status === 'unopened') {
        cardStatus.innerHTML = 'unread'
    } else if (myLibrary[index].status === 'in progress'){
        cardStatus.innerHTML = 'reading'
    }
    showRating(starsArray);

//display number of books and current 1/10
bookCountDisplay.innerHTML = indexCounter + 1 + ' of ' + myLibrary.length;
cardWrapper.style.display = 'block';
}
loadCard(indexCounter);

//display current book to EDIT popup
function loadEdit(index) {
    editTitle.value = myLibrary[index].title;
    editAuthor.value = myLibrary[index].author;
    editPages.value = myLibrary[index].pages;
    if (myLibrary[index].status === 'finished') {
        finishedRadioEdit.checked = true
    } else if (myLibrary[index].status === 'unopened') {
        unopenedRadioEdit.checked = true
    } else if (myLibrary[index].status === 'in progress'){
        inProgressRadioEdit.checked = true
    }
}

//change card in library with arrows
nextArrow.addEventListener("click", function(){
    indexCounter == myLibrary.length - 1 ? indexCounter = 0 : indexCounter++;
    loadCard(indexCounter);
})
lastArrow.addEventListener("click", function(){
    indexCounter == 0 ? indexCounter = myLibrary.length - 1 : indexCounter--;
    loadCard(indexCounter);
})

//add book BUTTON
addButton.addEventListener("click", function(){
    hideCardWrapper.style.display = 'none';
    popUpDiv.style.display = 'block';
    addStars(starsArrayAdd);
})
//edit BUTTON
editButton.addEventListener("click", function(){
    hideCardWrapper.style.display = 'none';
    popUpDivEdit.style.display = 'block';
    loadEdit(indexCounter);
    editStars(starsArrayEdit);
    showRating(starsArrayEdit)
})

//close pop up windows
function clearCloseForm(popup) {
        titleInput.value = '';
        authorInput.value = '';
        pagesInput.value = '';
        finishedRadio.checked = false;
        unopenedRadio.checked = false
        inProgressRadio.checked = false;
        popup.style.display = 'none';
        hideCardWrapper.style.display = 'block';
}

//validate inputs on ADD and EDIT
function validateAdd() {
    if (titleInput.value == '' || authorInput.value == '' || pagesInput.value == '') {
        alert('Please complete the form.')
        valid = false;
    }
    if (finishedRadio.checked == false && unopenedRadio.checked == false && inProgressRadio.checked == false) {
        alert('Please select status of this book.')
        valid = false;
    }
    if (pagesInput.value <= 0) {
        alert('Please enter a valid number of pages.')
        valid = false;
    }
}
function validateEdit() {
    if (editTitle.value == '' || editAuthor.value == '' || editPages.value == '') {
        alert('Please complete the form.')
        valid = false;
    }
    if (finishedRadioEdit.checked == false && unopenedRadioEdit.checked == false && inProgressRadioEdit.checked == false) {
        alert('Please select status of this book.')
        valid = false;
    }
    if (editPages.value <= 0) {
        alert('Please enter a valid number of pages.')
    }
}
//submit button to ADD book
submitButtonAdd.addEventListener("click", function(){
    valid = true;
    validateAdd();
    if (valid == true) {
        addStars(starsArrayAdd);
        if (finishedRadio.checked === true) {
            var read = 'finished';
        } else if (unopenedRadio.checked === true) {
            var read = 'unopened';
        } else if (inProgressRadio.checked === true) {
            var read = 'in progress';
        }
        addBook(titleInput.value, authorInput.value, pagesInput.value, read, ratingAdd);
        console.log(myLibrary);
        validateAdd();
        clearCloseForm(popUpDiv);
        indexCounter = myLibrary.length - 1;
        emptyLibrary.style.display = 'none';
        loadCard(indexCounter);
        }
    })
//submit button to EDIT book
submitButtonEdit.addEventListener("click", function(){
    valid = true;
    validateEdit();
    if (valid == true) {
        editStars(starsArrayAdd);
        myLibrary[indexCounter].title = editTitle.value;
        myLibrary[indexCounter].author = editAuthor.value;
        myLibrary[indexCounter].pages = editPages.value;
        if (finishedRadioEdit.checked === true) {
            myLibrary[indexCounter].status = 'finished';
        } else if (unopenedRadioEdit.checked === true) {
            myLibrary[indexCounter].status = 'unopened';
        } else if (inProgressRadioEdit.checked === true) {
            myLibrary[indexCounter].status = 'in progress';
        }
        loadCard(indexCounter);
        clearCloseForm(popUpDivEdit);
    }
})

//close submit form BUTTON
formClose.addEventListener("click", function() {
    clearCloseForm(popUpDiv);
})
editClose.addEventListener("click", function() {
    clearCloseForm(popUpDivEdit);
})

function showEmpty() {
    emptyLibrary.innerHTML = 'Your library is empty. Click \'add book\' to create a new entry.'
}

function removeFromLibrary (index) {
    let result = confirm('Are you sure you want to remove this book from your library?');
    if (result == true) {
    myLibrary.splice(index, 1);

    if (myLibrary.length < 1) {
        cardWrapper.style.display = 'none';
        showEmpty();
    } else {
        if (indexCounter !== 0) {
            indexCounter--;
          }
        loadCard(indexCounter);
    } 
    }
}
removeButton.addEventListener("click", function() {
    removeFromLibrary(indexCounter);
    clearCloseForm(popUpDivEdit);
})

resetRatingButton.addEventListener("click", function() {
    myLibrary[indexCounter].rating = 0;
    starsArrayEdit.forEach(function(element) {
        document.getElementById(element).classList.remove('checked');
    })
    editStars(starsArrayEdit);
})


