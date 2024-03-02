const API_KEY = config.librarykey;

let bookList = [];
let keyword = "";

let url = new URL(
  `http://data4library.kr/api/libSrch?format=json&authKey=${API_KEY}&pageNo=1&pageSize=5`
);

let totalResult = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;



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
      `https://librarybooksbyjs.netlify.app/srchBooks?format=json&title=${keyword}&authKey=${API_KEY}`
    );
    url.searchParams.set("pageNo", page);
    url.searchParams.set("pageSize", pageSize);

    const response = await fetch(url);
    const data = await response.json();
    const numFound = await data.response.numFound.toLocaleString();

    document.querySelector(
      ".search_result"
    ).innerHTML = `"${keyword}" 검색결과 ${numFound}건`;

    bookList = data.response.docs;
    totalResult = data.response.numFound;
    console.log("LLL", bookList);
    searchRender();
    paginationRender();
  }
};

const searchRender = () => {
  let booksHTML = bookList
    .map(
      (books) => `<div class="books">
    <div class="img-content">
        <img class="books-img-size"
          src="${ books.doc.bookImageURL ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
          }" />
    </div>
    <div class="books-content">
      <p id="book-name">${books.doc.bookname}</p>
      <p><span>저자</span> <span>${books.doc.authors}</span></p>
      <p><span>출판사</span> <span>${books.doc.publisher}</span></p>
      <p><span>출판연도</span> <span>${books.doc.publication_year}</span></p>
      <p><span>ISBN</span> <span>${books.doc.isbn13}</span></p>
      <p><span>대출건수</span> <span>${books.doc.loan_count}</span></p>
      <button id="seeMore-btn"><a href="index.html?page=details&isbn=${books.doc.isbn13}">자세히보기</a></button>
    </div>
  </div>`
    )
    .join("");
  document.getElementById("main").innerHTML = booksHTML;
};

const paginationRender = () => {
  let totalPages = Math.ceil(totalResult / pageSize);
  let pageGroup = Math.ceil(page / groupSize);
  let lastPage = pageGroup * groupSize;

  if (lastPage > totalPages) {
    lastPage = totalPages;
  }
  let firstPage =
    lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

  let paginationHTML = ``;
  if (firstPage >= 6) {
    paginationHTML = `<li class="page-item" onclick="moveToPage(1)">
  <a class="page-link" href='#js-bottom'>&lt;&lt;</a>
</li>
<li class="page-item" onclick="moveToPage(${page - 1})">
  <a class="page-link" href='#js-bottom'>&lt;</a>
</li>`;
  }

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item ${
      i === page ? "active" : ""
    }" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
  }
  if (lastPage < totalPages) {
    paginationHTML += `<li class="page-item" onclick="moveToPage(${page + 1})">
  <a  class="page-link" href='#js-program-detail-bottom'>&gt;</a>
 </li>
 <li class="page-item" onclick="moveToPage(${totalPages})">
  <a class="page-link" href='#js-bottom'>&gt;&gt;</a>
 </li>`;
  }
  document.querySelector(".pagination").innerHTML = paginationHTML;
};

const moveToPage = (pageNum) => {
  console.log("movetopage", pageNum);
  page = pageNum;
  getBooksByKeyword();
};

function enterkey() {
  if (window.event.keyCode == 13) {
    getBooksByKeyword();
  }
}
