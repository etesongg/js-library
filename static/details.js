const ISBN = "9788934971351" // 예시 ISBN number, 실제 번호 받을 예정

// <!-- 정보공개 도서관 조회 - 도서관 주소, 연락처, 홈페이지-->
// let libraryLookup_Url = new URL(`http://data4library.kr/api/libSrch?format=json&authKey=${API_KEY}`);

// <!-- 도서관별 장서 대출 데이터 조회 - 도서명, 저자명, 출판사 등 -->
// let catalogingByLibrary_Url = new URL(`http://data4library.kr/api/libSrch?format=json&authKey=${API_KEY}`);

// <!-- 도서검색 -->
let srchBooks_Url = new URL(`http://data4library.kr/api/srchBooks?format=json&authKey=${API_KEY}&isbn13="${ISBN}"&pageNo=1&pageSize=5`);

// <!-- 도서기본정보 불러오는 함수 -->
const aboutbooks = async () => {
    try {
        const response = await fetch(srchBooks_Url);
        const data = await response.json();
        console.log(data);

        if (data.response.docs && data.response.docs.length > 0) {
            // 첫 번째 도서 정보로 bookInfo 객체 생성 및 화면에 표시
            displayBookInfo({
                imageUrl: data.response.docs[0].doc.bookImageURL,
                title: data.response.docs[0].doc.bookname,
                author: data.response.docs[0].doc.authors,
                publisher: data.response.docs[0].doc.publisher,
                publication_year: data.response.docs[0].doc.publication_year,
                isbn13: data.response.docs[0].doc.isbn13,
                // 기타 필요한 정보
            });
        }
    } catch (error) {
        console.error('Fetching book data failed', error);
    }
};

// aboutbooks 함수를 호출하여 비동기 처리 시작
aboutbooks();

// 도서 기본정보를 HTML 내의 요소에 데이터를 삽입하여 화면에 표시하는 함수
function displayBookInfo(info) {
    document.querySelector('.details-book-information-section figure').innerHTML = `<img src="${info.imageUrl}" alt="도서 이미지">`;
    document.querySelector('.details-book-information-section article').innerHTML = `
        <h2>${info.title}</h2>
        <p>저자: ${info.author}</p>
        <p>출판사: ${info.publisher}</p>
        <p>출판연도: ${info.publication_year}</p>
        <p>ISBN: ${info.isbn13}</p>
        // 기타 필요한 정보 출력
    `;
}

