// variables
const btnBookInsert = document.getElementById('btn-book-insert');
const chIsComplete = document.getElementById('is-complete');
const btnSearch = document.getElementById('btn-search');
let btnStatus = document.getElementById('btn-status');
let title = '';
let author = '';
let year = '';
let isComplete = false;
let id = '';
const storageKey = 'BOOK_DATA';
let completeList = document.getElementById('complete-list');
let unCompleteList = document.getElementById('uncomplete-list');
let listBookSearchHTML = document.getElementById('list-search-book');
listBookSearchHTML.innerHTML = '<tr><td colspan="4"><center>Data akan muncul di sini</center></td></tr>';
let sessionKey = 'positionPage';

// if "Hapus" button clicked
function deleteItem(bookId) {
    var deleteConfirm = confirm("Lanjut menghapus ?");
    if(deleteConfirm != true) {
        window.reload();
    }
    let getBookData = JSON.parse(localStorage.getItem(storageKey));
    for (let i = 0; i < getBookData.length; i++) {
        if (getBookData[i].id === bookId) {
            getBookData.splice(i, 1);
        }
    }
    localStorage.setItem(storageKey, JSON.stringify(getBookData));
    location.reload();
}

// if "Belum Selesai" button clicked
function setUnComplete(bookId) {
    let getBookData = JSON.parse(localStorage.getItem(storageKey));
    for(let i = 0; i < getBookData.length; i++) {
        if(getBookData[i].id == bookId) {
            getBookData[i].isComplete = false;
        }
    }
    localStorage.setItem(storageKey, JSON.stringify(getBookData));
    location.reload();
}

// if "Sudah Selesai" button clicked
function setComplete(bookId) {
    let getBookData = JSON.parse(localStorage.getItem(storageKey));
    for(let i = 0; i < getBookData.length; i++) {
        if(getBookData[i].id == bookId) {
            getBookData[i].isComplete = true;
        }
    }
    localStorage.setItem(storageKey, JSON.stringify(getBookData));
    location.reload();
}

// web storage available or not in your browser
function checkForStorage() {
    return typeof (Storage) !== 'undefined';
}

// navigation function
function create() {
    sessionStorage.setItem(sessionKey, "Create");
    location.reload();
}
function complete() {
    sessionStorage.setItem(sessionKey, "Complete");
    location.reload();
}
function uncomplete() {
    sessionStorage.setItem(sessionKey, "UnComplete");
    location.reload();
}
function search() {
    sessionStorage.setItem(sessionKey, "Search");
    location.reload();
}

// action when page loaded
function pageOnLoad() {
    if (sessionStorage.getItem(sessionKey) == null || sessionStorage.getItem(sessionKey) == "Create") {
        document.getElementById('create').style.display = "block";
        document.getElementById('complete').style.display = "none";
        document.getElementById('uncomplete').style.display = "none";
        document.getElementById('search').style.display = "none";
    } else if (sessionStorage.getItem(sessionKey) == "Complete") {
        document.getElementById('create').style.display = "none";
        document.getElementById('complete').style.display = "block";
        document.getElementById('uncomplete').style.display = "none";
        document.getElementById('search').style.display = "none";
    } else if (sessionStorage.getItem(sessionKey) == "UnComplete") {
        document.getElementById('create').style.display = "none";
        document.getElementById('complete').style.display = "none";
        document.getElementById('uncomplete').style.display = "block";
        document.getElementById('search').style.display = "none";
    } else if (sessionStorage.getItem(sessionKey) == "Search") {
        document.getElementById('create').style.display = "none";
        document.getElementById('complete').style.display = "none";
        document.getElementById('uncomplete').style.display = "none";
        document.getElementById('search').style.display = "block";
    }

    if(checkForStorage()) {

        if(localStorage.getItem(storageKey) == null) {
            let listElement = '<tr><td colspan="4"><center>Local Storage Masih Kosong</center></td></tr>';
            completeList.innerHTML = listElement;
            unCompleteList.innerHTML = listElement;
        } else {
            let arrObjBook = JSON.parse(localStorage.getItem(storageKey));
            let listElementComplete = '';
            let listElementUnComplete = '';
            for(let i = 0; i < arrObjBook.length; i++) {
                if(arrObjBook[i].isComplete == true) {
                    listElementComplete += '<tr><td>' + arrObjBook[i].title + '</td><td>' + arrObjBook[i].author + '</td><td><center>' + arrObjBook[i].year + '</center></td><td><center><button class="btn-set-status" onclick="setUnComplete('+ arrObjBook[i].id +')">Belum Selesai</button><br><button class="btn-delete" onclick="deleteItem('+ arrObjBook[i].id +')">Hapus</button></center></td></tr>';
                    completeList.innerHTML += listElementComplete;
                } else {
                    listElementUnComplete += '<tr><td>' + arrObjBook[i].title + '</td><td>' + arrObjBook[i].author + '</td><td><center>' + arrObjBook[i].year + '</center></td><td><center><button class="btn-set-status" onclick="setComplete('+ arrObjBook[i].id +')">Sudah Selesai</button><br><button class="btn-delete" onclick="deleteItem('+ arrObjBook[i].id +')">Hapus</button></center></td></tr>';
                    unCompleteList.innerHTML += listElementUnComplete;
                }
            }
            completeList.innerHTML = listElementComplete;
            unCompleteList.innerHTML = listElementUnComplete;
        }
    } else {
        alert('Fitur web storage tidak tersedia di browsermu');
        alert('Silahkan gunakan browser lainnya');
    }
}

// change text on submit button
chIsComplete.addEventListener('change', function(event) {
    event.preventDefault();
    if (this.checked) {
        btnStatus.innerText = 'Sudah Selesai Dibaca';
        isComplete = true;
    } else {
        btnStatus.innerText = 'Belum Selesai Dibaca';
        isComplete = false;
    }
});

// action when submit button clicked
btnBookInsert.addEventListener('click', function(event) {
    event.preventDefault();
    // get data from input form
    title = document.getElementById('title').value;
    author = document.getElementById('author').value;
    year = document.getElementById('year').value;
    id = +new Date();

    // process book data for insert to local storage
    if(checkForStorage()) {
        if(
            title == '' ||
            author == '' ||
            year == ''
        ) {
            alert('Input tidak valid, silahkan input ulang data anda');
        } else {
            if(localStorage.getItem(storageKey) == null) {
                let objBook = {
                    id: id,
                    title: title,
                    author: author,
                    year: year,
                    isComplete: isComplete,
                };
                let arrObjBook = [];
                arrObjBook.push(objBook);
                localStorage.setItem(storageKey, JSON.stringify(arrObjBook));
            } else {
                let arrObjBook = JSON.parse(localStorage.getItem(storageKey));
                let objBook = {
                    id: id,
                    title: title,
                    author: author,
                    year: year,
                    isComplete: isComplete,
                };
                arrObjBook.push(objBook);
                localStorage.setItem(storageKey, JSON.stringify(arrObjBook));
            }
        }
    } else {
        alert('Fitur web storage tidak tersedia di browsermu');
        alert('Silahkan gunakan browser lainnya');
    }
});

// action when "Cari Buku" button clicked
btnSearch.addEventListener('click', function(event) {
    event.preventDefault();
    listBookSearchHTML.innerHTML = '';
    let searchText = document.getElementById('search-text').value;
    let getBookForSearch = JSON.parse(localStorage.getItem(storageKey));
    if(typeof searchText === 'string' && searchText.trim() !== '') {
        for(let i = 0; i < getBookForSearch.length; i++) {
            let titleTest = JSON.stringify(getBookForSearch[i].title);
            let authorTest = JSON.stringify(getBookForSearch[i].author);
            let titlePosition = titleTest.toLowerCase().includes(searchText.toLowerCase());
            let authorPosition = authorTest.toLowerCase().includes(searchText.toLowerCase());
            let statusText = '';
            if(getBookForSearch[i].isComplete == true) {
                statusText = 'Sudah selesai dibaca';
            } else {
                statusText = 'Belum selesai dibaca';
            }
            if(titlePosition == true || authorPosition == true) {
                let bookSearchElement = '<tr><td>' + getBookForSearch[i].title + '</td><td>' + getBookForSearch[i].author + '</td><td><center>' + getBookForSearch[i].year + '</center></td><td>' + statusText + '</td></tr>';
                listBookSearchHTML.innerHTML += bookSearchElement;
            }
        }
    } else {
        listBookSearchHTML.innerHTML = '<tr><td colspan="4"><center>Data tidak ditemukan</center></td></tr>';
    }
});