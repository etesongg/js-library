// 인기대출도서 조회 
// let popularBooks_Url = new URL(`https://librarybooksbyjs.netlify.app/loanItemSrch?format=json&authKey=${API_KEY}&pageNo=1&pageSize=5`);
let popularBooks_Url = new URL(`http://data4library.kr/api/loanItemSrch?format=json&authKey=${API_KEY}&pageNo=1&pageSize=5`);

// 인기대출도서 불러오는 함수
const popularBooks = async () => {
    try {
        const responsePopular = await fetch(popularBooks_Url);
        const dataPopular = await responsePopular.json();
        const popularBooksList = dataPopular.response.docs;
        console.log("인기대출도서",popularBooksList);

    const popularResult = popularBooksList
      .map((book) => {
        return `
            <article class="swiper-slide">
              <p class="book-rank">${book.doc.ranking}</p>
              <figure>
                  <img style="max-width:100%;" src="${book.doc.bookImageURL}" alt="${book.doc.bookname}">
              </figure>
              <p class="book-title"><a href="${book.doc.bookDtlUrl}" target="_blank">${book.doc.bookname}</a></p>
              <p class="book-authers">${book.doc.authors}</p>
            </article>
        `;
      })
      .join("");

    document.querySelector("#popular-books-section .swiper-wrapper").innerHTML =
      popularResult;
  } catch (error) {
    console.error("Fetching book data failed", error);
  }
};

popularBooks();

// 대출 급상승 조회
// let trendingBooks_Url = new URL(`https://librarybooksbyjs.netlify.app/hotTrend?format=json&authKey=${API_KEY}&searchDt=2024-02-28&pageNo=1&pageSize=5`);
let trendingBooks_Url = new URL(`http://data4library.kr/api/hotTrend?format=json&authKey=${API_KEY}&searchDt=2024-02-27`);

// 대출 급상승 불러오는 함수
const trendingBooks = async () => {
  try {
    const responseTrending = await fetch(trendingBooks_Url);
    const dataTrending = await responseTrending.json();
    const trendingBooksList = dataTrending.response.results[0].result.docs;
    console.log("대출 급상승",trendingBooksList);

    const trendingResult = trendingBooksList
      .map((book) => {
        return `
      <article class="swiper-slide">
        <p class="book-rank">${book.doc.no}</p>
        <figure>
            <img style="max-width:100%;" src="${book.doc.bookImageURL}" alt="${book.doc.bookname}">
        </figure>
        <p class="book-title"><a href="${book.doc.bookDtlUrl}" target="_blank">${book.doc.bookname}</a></p>
        <p class="book-authers">${book.doc.authors}</p>
      </article>
    `;
      })
      .join("");

    document.querySelector(
      "#trending-loan-books-section .swiper-wrapper"
    ).innerHTML = trendingResult;
  } catch (error) {
    console.error("Fetching book data failed", error);
  }
};

trendingBooks();

window.onload = function () {
  var swiper = new Swiper(".swiper", {
    speed: 700,
    slidesPerView: 6,
    spaceBetween: 40,
    centeredSlides: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
};

