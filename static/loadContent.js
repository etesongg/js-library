document.addEventListener("DOMContentLoaded", function() {
    const headerDiv = document.getElementById('header');
    const mainDiv = document.getElementById('main');
    const footerDiv = document.getElementById('footer');

    // Header와 Footer는 모든 페이지에서 공통으로 사용
    fetch('includes/header.html')
        .then(response => response.text())
        .then(data => {
            headerDiv.innerHTML = data;
        });

    fetch('includes/footer.html')
        .then(response => response.text())
        .then(data => {
            footerDiv.innerHTML = data;
        });

    // index.html로 접속 시 ?page=main 으로 리다이렉트
    if (window.location.search === '') {
        window.location.search = '?page=main';
    }

    // URL의 쿼리 문자열에 따라 Main 콘텐츠 변경
    const queryParams = new URLSearchParams(window.location.search);
    const page = queryParams.get('page'); // URL에서 'page' 쿼리 파라미터 가져오기

    // page 값에 따라 다른 HTML 파일을 불러옴
    let contentToLoad = 'includes/main.html'; // 기본값 설정
    if (page === 'details') {
        contentToLoad = 'details.html';
    } else if (page === 'list') {
        contentToLoad = 'list.html';
    }

    fetch(contentToLoad)
        .then(response => response.text())
        .then(data => {
            mainDiv.innerHTML = data;
        });
});
