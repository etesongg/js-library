const API_KEY = config.librarykey;

let bookList = [];
let keyword = "";

let url = new URL(
  `http://data4library.kr/api/libSrch?format=json&authKey=${API_KEY}&pageNo=1&pageSize=5`
);

document.addEventListener("DOMContentLoaded", function () {
  const queryParams = new URLSearchParams(window.location.search);
  const page = queryParams.get("page");
});

const getBooksByKeyword = async () => {
  keyword = document.getElementById("search-input").value;

  // 경고창
  if (keyword == "") {
    Swal.fire({
      icon: "warning",
      title: "검색어를 입력하세요.",
    });
  } else {
    url = new URL(
      `https://librarybooksbyjs.netlify.app/srchBooks?format=json&title=${keyword}&authKey=${API_KEY}&pageNo=1&pageSize=5`
    );

    const response = await fetch(url);
    const data = await response.json();
    const numFound = await data.response.numFound.toLocaleString();

    document.querySelector(
      ".search_result"
    ).innerHTML = `"${keyword}" 검색결과 ${numFound}건`;

    bookList = data.response.docs;
    console.log("LLL", bookList);
    searchRender();
  }
};

const searchRender = () => {
  let booksHTML = bookList
    .map(
      (books) => `<div class="row books">
    <div class="col-lg-4 img-content">
        <img class="books-img-size"
                src="${
                  books.doc.bookImageURL ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
                }" />
    </div>
    <div class="col-lg-8 books-content">
<<<<<<< HEAD
      <p id="book-name">${books.doc.bookname}</p>
      <br>
      <p>저자 : ${books.doc.authors}</p>
      <p>출판사 : ${books.doc.publisher}</p>
      <p>출판연도 : ${books.doc.publication_year}</p>
      <p>ISBN : ${books.doc.isbn13}</p>
      <p>대출건수 : ${books.doc.loan_count}</p>
      <button id="seeMore-btn">자세히보기</button>
=======
        <h5>${books.doc.bookname}</h5>
        <br>
        <p>저자 : ${books.doc.authors}</p>
        <p>발행처 : ${books.doc.publisher}</p>
        <p>발행연도 : ${books.doc.publication_year}</p>
        <button id="seeMore-btn"><a href="index.html?page=details&isbn=${books.doc.isbn13}">자세히보기</a></button>
>>>>>>> 987297ded04f606f6c2cccb9a3c02edf0393cc16
    </div>
  </div>`
    )
    .join("");
  document.getElementById("main").innerHTML = booksHTML;
};

function enterkey() {
  if (window.event.keyCode == 13) {
    getBooksByKeyword();
  }
}
