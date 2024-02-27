const API_KEY = config.librarykey;

let bookList = [];

let url = new URL(`http://data4library.kr/api/libSrch?format=json&authKey=${API_KEY}`);

const getBooks = async() => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
}
getBooks()

const getBooksByKeyword = async() => {
    const keyword = document.getElementById("search-input").value;

    url = new URL(`http://data4library.kr/api/srchBooks?format=json&keyword=${keyword}&authKey=${API_KEY}`)

    getBooks()
}

const enterkey = () => {
    if(window.event.keyCode == 13){
        getBooksByKeyword();
    }
}