
const ISBN = "9791161571188" // 예시 ISBN number, 실제 번호 받을 예정

// <!-- 정보공개 도서관 조회 - 도서관 주소, 연락처, 홈페이지-->
// let libraryLookup_Url = new URL(`https://librarybooksbyjs.netlify.app/libSrch?format=json&authKey=${API_KEY}`);

// <!-- 도서관별 장서 대출 데이터 조회 - 도서명, 저자명, 출판사 등 -->
// let catalogingByLibrary_Url = new URL(`https://librarybooksbyjs.netlify.app/libSrch?format=json&authKey=${API_KEY}`);

// 도서 상세 조회
let srchDtlList_Url = new URL(`http://data4library.kr/api/srchDtlList?format=json&authKey=${API_KEY}&isbn13=${ISBN}&loaninfoYN=Y&pageNo=1&pageSize=5`);

// 도서 상세 불러오는 함수

async function srchDtlList() {
    const response = await fetch(srchDtlList_Url);
    const data = await response.json();
    // console.log(data);

    displayBookInfo({
        imageUrl: data.response.detail[0].book.bookImageURL,
        title: data.response.detail[0].book.bookname,
        author: data.response.detail[0].book.authors,
        publisher: data.response.detail[0].book.publisher,
        publication_year: data.response.detail[0].book.publication_year,
        isbn13: data.response.detail[0].book.isbn13,
    });

    initBorrowingTrendTable(); // 테이블 초기화를 데이터 로드 후에 수행

    data.response.loanInfo[2].ageResult.forEach((ageInfo) => {
            borrowingTrend({
                borrowingAge: ageInfo.age.name,
                borrowingNum: ageInfo.age.loanCnt,
                borrowingRank: ageInfo.age.ranking,
            });
        });  
};


srchDtlList();


// 도서 기본정보를 HTML 내의 요소에 데이터를 삽입하여 화면에 표시하는 함수
function displayBookInfo(info) {
    document.querySelector('.details-book-information-section figure').innerHTML = `<img src="${info.imageUrl}" alt="도서 이미지">`;
    document.querySelector('.details-book-information-section article').innerHTML = `
        <h5><b>${info.title}</b></h5>
        <p>저자: ${info.author}</p>
        <p>출판사: ${info.publisher}</p>
        <p>출판연도: ${info.publication_year}</p>
        <p>ISBN: ${info.isbn13}</p>
    `;
}

function initBorrowingTrendTable() {
    document.querySelector('.borrowing-trend-by-age thead').innerHTML = `
        <tr>
            <th>대출 연령</th>
            <th>대출 건수</th>
            <th>대출 순위</th>
        </tr>
    `;
}

function borrowingTrend(info) {
    const tbody = document.querySelector('.borrowing-trend-by-age tbody');
    const row = `<tr>
                    <td>${info.borrowingAge}</td>
                    <td>${info.borrowingNum}</td>
                    <td>${info.borrowingRank}</td>
                </tr>`;
    tbody.innerHTML += row; // 기존 행에 추가
}