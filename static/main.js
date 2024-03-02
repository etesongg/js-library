
  var now = new Date();
  var today = new Date(now.setDate(now.getDate() - 3));

  var year = today.getFullYear();
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var day = ('0' + today.getDate()).slice(-2);

  var dateString = year + '-' + month  + '-' + day;

  console.log(dateString);

  // 대출 급상승 조회
  // let trendingBooks_Url = new URL(`https://librarybooksbyjs.netlify.app/hotTrend?format=json&authKey=${API_KEY}&searchDt=${dateString}`);
  let trendingBooks_Url = new URL(`http://data4library.kr/api/hotTrend?format=json&authKey=${API_KEY}&searchDt=${dateString}`);

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
          <article>
              <a href="index.html?page=details&isbn=${book.doc.isbn13}">
                  <figure>
                  <img style="max-width:100%;" src="${book.doc.bookImageURL}" alt="${book.doc.bookname}">
                  </figure>
                  <p class="book-title"><a href="index.html?page=details&isbn=${book.doc.isbn13}">${book.doc.bookname}</a></p>
                  <p class="book-authers">${book.doc.authors}</p>
              </a>
          </article>
      `;
        })
        .join("");

      document.querySelector(
        "#trending-loan-books-section .books-list"
      ).innerHTML = trendingResult;
    } catch (error) {
      console.error("Fetching book data failed", error);
    }
  };

  trendingBooks();

  // 인기대출도서 조회 
  // let popularBooks_Url = new URL(`https://librarybooksbyjs.netlify.app/loanItemSrch?format=json&authKey=${API_KEY}&pageNo=1&pageSize=7`);
  let popularBooks_Url = new URL(`http://data4library.kr/api/loanItemSrch?format=json&authKey=${API_KEY}&startDt=2024-02-01&endDt=2024-02-29&pageNo=1&pageSize=10`);

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
            <a href="index.html?page=details&isbn=${book.doc.isbn13}">
              <p class="book-rank">${book.doc.ranking}</p>
              <figure>
              <img style="max-width:100%;" src="${book.doc.bookImageURL}" alt="${book.doc.bookname}">
              </figure>
              <p class="book-title">${book.doc.bookname}</p>
            </a>
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


  window.addEventListener('load', function(){

var swiper = new Swiper(".swiper", {
        speed: 700,
        slidesPerView: 2,
        spaceBetween: 20,
        centeredSlides: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          768: {
            slidesPerView: 3,  //브라우저가 768보다 클 때
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,  //브라우저가 1024보다 클 때
            spaceBetween: 30,
          },
          1200: {
            slidesPerView: 5,  //브라우저가 1024보다 클 때
            spaceBetween: 30,
            },
        },
    }); 

  });
