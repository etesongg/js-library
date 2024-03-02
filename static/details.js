const queryParams = new URLSearchParams(window.location.search);
const ISBN = queryParams.get('isbn');

// 도서 소장 도서관 부분
const regionInfo = libraryinfo.dtl_region;
const selectElement = document.getElementById("area-select-option");

// 도서 상세 조회
let srchDtlList_Url = new URL(`http://data4library.kr/api/srchDtlList?format=json&authKey=${API_KEY}&isbn13=${ISBN}&loaninfoYN=Y&pageNo=1&pageSize=5`);

window.onload = function() {
    dropdownOptionRender();
};

// 지역구 나타내는 함수 (initialization 에러로 함수 위치를 상단으로 올림)
const dropdownOptionRender = () => {
    let dtlRegionList = Object.entries(regionInfo);

    const dtlRegionHTML = dtlRegionList.map(region => {
        let dtlRegion = region[0]
        let splitRegion = region[1].split(" ")[1]
        return `<option value="${dtlRegion}">${splitRegion}</option>`;
    }).join("");
    selectElement.innerHTML = dtlRegionHTML;

    // option 초기 선택을 없애기
    selectElement.selectedIndex = -1;
}

// 도서 상세 불러오는 함수
async function srchDtlList() {
    const response = await fetch(srchDtlList_Url);
    const data = await response.json();

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
        dropdownOptionRender()
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




// option들의 change 이벤트를 추가
selectElement.addEventListener("change", (event) => {
    const selectedDtlRegion = event.target.value;
    filterLibRender(selectedDtlRegion);
});


const initLibTable = () => {
    document.querySelector('.lib-table thead').innerHTML = `
    <tr>
        <th>도서관</th>
        <th>홈페이지</th>
        <th>주소</th>
    </tr>
    `;
}

const filterLibRender = async (dtlRegion) => {
    const libTable = document.querySelector(".lib-place table tbody");
    libTable.innerHTML = '';  // 이전 내용 삭제
    initLibTable();

    let collectionBookURL = new URL(`http://data4library.kr/api/libSrchByBook?format=json&authKey=${API_KEY}&isbn=${ISBN}&region=11&dtl_region=${dtlRegion}`)
    const response_ = await fetch(collectionBookURL)
    const data_ = await response_.json()
    const libList = data_.response.libs;

    let filterLibHTML = '';

    if (libList && libList.length > 0) {
        filterLibHTML = libList.map((lib) => {
            return `<tr>
                <td>${lib.lib.libName}</td>
                <td>${lib.lib.homepage}</td>
                <td>${lib.lib.address}</td>
            </tr>`;
        }).join("");
    } else {
        filterLibHTML = `<tr><td colspan="3">해당 지역구에는 위의 책이 소장된 도서관이 없습니다.</td></tr>`;
    }

    libTable.innerHTML = filterLibHTML;  // 새로운 내용 추가
}