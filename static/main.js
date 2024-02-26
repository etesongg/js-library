const API_KEY = config.librarykey;

let bookList = [];

let url = new URL(`http://data4library.kr/api/libSrch?format="json"&authKey=${API_KEY}`);

const getBooks = async() => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
}
getBooks()
