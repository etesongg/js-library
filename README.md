# 독서의 민족

**독서의 민족**은 도서 정보와 서울 소재 도서관의 도서 소장 여부를 확인할 수 있는 웹 사이트입니다.

## 프로젝트 개요

- [Sprint Planning](https://www.figma.com/file/e4SAwvfg4JTfdrFP75rthR/JS-library?type=whiteboard&node-id=0%3A1&t=ZeUO2BllCyUhENwx-1) 
- [와이어프레임](https://www.figma.com/file/4Tq5yWe8W0lRl1m8SQAsab/%EB%8F%85%EC%84%9C%EC%9D%98%EB%AF%BC%EC%A1%B1-%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84?type=design&node-id=0%3A1&mode=design&t=nWgW7KvznXD7lgA6-1)

## 사용 기술 스택

- **프론트엔드**: HTML, CSS, JavaScript, Bootstrap, Swiper
- **사용 API**: 정보나루

## 주요 기능

1. **메인 페이지**
   - 웹 사이트에 접속하면 메인 페이지가 표시됩니다.
   - 메인 페이지에서는 최신 인기 대출 도서와 대출 급상승 도서를 확인할 수 있습니다.

2. **책 검색**
   - 메인 페이지에서는 책 제목 검색 기능을 제공합니다.
   - 검색 결과에서 원하는 책을 선택하여 상세 정보를 확인할 수 있습니다.

3. **책 상세 페이지**
   - 책의 기본 정보를 제공합니다.
   - 대출 연령, 대출 건수, 대출 순위, 도서 소장 도서관 정보를 제공합니다.

4. **도서 소장 도서관 조회**
   - 책 상세 페이지에서는 해당 책의 도서 소장 도서관을 확인할 수 있습니다.
   - 서울 지역의 지역구를 선택하면 해당 지역구에서 책이 소장되어 있는 도서관의 목록을 확인할 수 있고 링크를 통해 해당 도서관 사이트로 이동할 수 있습니다.


## 스크린샷
![main](https://github.com/etesongg/js-library/assets/55964387/ee5172ed-69d8-4e2a-bbaf-0e461d6507f5)

<details>
  <summary> 전체 시나리오 </summary>

   ![main](https://github.com/etesongg/js-library/assets/55964387/2137642c-9d8b-4af8-bb73-9becbfb1228e)

</details>

<details>
  <summary> 반응형 화면 보기 </summary>
  
  <details>
  <summary> 메인 페이지 </summary>

  ![main_act](https://github.com/etesongg/js-library/assets/55964387/8bdcb791-7dbc-49b7-a0ab-42d4688376e9)
  </details>
  
   <details>
  <summary> 디테일 페이지 </summary>
     
  ![det_act](https://github.com/etesongg/js-library/assets/55964387/0a7aaaac-1e3d-4d3e-b506-26b60cbcf30a)
  </details>
  
</details>

[위 사이트 접속하기](https://librarybooksbyjs.netlify.app/index.html?page=main)