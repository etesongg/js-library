const API_KEY = config.librarykey;

let bookList = [];
let keyword = ""

let url = new URL(`http://data4library.kr/api/libSrch?format=json&authKey=${API_KEY}&pageNo=1&pageSize=5`);

const getBooks = async() => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    const numFound = await data.response.numFound.toLocaleString()
    
    // 검색결과 건수 나오는 부분으로 render 함수가 생기면 render 함수 위치로 변경 예정
    document.querySelector(".search_result").innerHTML = `"${keyword}" 검색결과 ${numFound}건`;
}
getBooks()

const getBooksByKeyword = async() => {
    keyword = document.getElementById("search-input").value;

    url = new URL(`http://data4library.kr/api/srchBooks?format=json&title=${keyword}&authKey=${API_KEY}&pageNo=1&pageSize=5`)

    getBooks()
}

const enterkey = () => {
    if(window.event.keyCode == 13){
        getBooksByKeyword();
    }
}



<!-- 인기대출도서 조회 -->
let popularBooks_Url = new URL(`http://data4library.kr/api/loanItemSrch?format=json&authKey=${API_KEY}&pageNo=1&pageSize=5`);

<!-- 인기대출도서 불러오는 함수 -->
const popularBooks = async () => {
    try {
        const response2 = await fetch(popularBooks_Url);
        const data2 = await response2.json();
        const popularBooksList = data2.response.docs;
        console.log(popularBooksList);

        const resultHTML = popularBooksList.map(book => { return `
            <article>
                <a href="${book.doc.bookDtlUrl}" target="_blank">
                    <p class="book-rank">${book.doc.ranking}</p>
                    <figure>
                        <img src="${book.doc.bookImageURL}" alt="${book.doc.bookname}">
                    </figure>
                    <p class="book-title">${book.doc.bookname}</p>
                    <p class="book-authers">${book.doc.authors}</p>
                </a>
            </article>
        `}).join('');

        document.querySelector('#popular-books-section .slider-wrap').innerHTML = resultHTML;
        
    } catch (error) {
        console.error('Fetching book data failed', error);
    }
};

popularBooks();

