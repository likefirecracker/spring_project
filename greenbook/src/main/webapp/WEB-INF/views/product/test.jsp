<%--
  Created by IntelliJ IDEA.
  User: G
  Date: 2022-11-01
  Time: 오후 5:40
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>API 연습</title>
    <script src="https://code.jquery.com/jquery-3.6.1.js"
            integrity="sha256-3zlB5s2uwoUzrXK3BT7AX3FyvojsraNFxCc2vC/7pNI="
            crossorigin="anonymous"></script>
</head>
<body>
<h1>연습용</h1>
<input type="text" id="searchText">
<input type="button" value="검색" onclick="" id="search">
<h2 class="title"></h2>
<div class="thumbnail"></div>
<p class="content"></p>
<select id="dataPerPage">
    <option value="10">10개씩</option>
    <option value="15">15개씩</option>
    <option value="20">20개씩</option>
</select>
<table class="tables">
    <tr>
        <td>이미지</td>
        <td>제목</td>
        <td>저자</td>
        <td>출판사</td>
        <td>역자</td>
        <td>가격</td>
    </tr>
</table>
<div class="pageNav">

</div>
<script>
    $(function (){
        console.log("ok");
    });
    let startPage = 1;
    let endPage;
    let currentPage;
    let totalPage;
    let pageCount = $("#dataPerPage").val();

    $("#search").click(function (){

        currentPage;

        $.ajax({
            method: "GET",
            url: "https://dapi.kakao.com/v3/search/book?target=title",
            data:{ query: $("#searchText").val(), page: 1, size: pageCount },
            headers:{
                Authorization:"KakaoAK 791516fe4d4d98753319ee19b0cc93f9"
            }
        })
            .done(function (msg){
                totalPage = msg.meta.pageable_count;
                console.log(msg);
                console.log(msg.meta.pageable_count);
                $(".thumbnail").append('<img src="' + msg.documents[2].thumbnail + '"/>');
                $(".title").append(msg.documents[2].title);
                $(".content").append(msg.documents[2].contents);
                for (let i=0;i<msg.documents.length;i++) {
                    let tr = "";

                    tr += "<tr>";
                    tr += "<td><img src='" + msg.documents[i].thumbnail + "'></td>"
                    tr += "<td>" + msg.documents[i].title + "</td>";
                    tr += "<td>";
                    for (let j = 0; j < msg.documents[i].authors.length; j++) {
                        tr += msg.documents[i].authors[j] + ",";
                    }
                    tr += "</td>";
                    tr += "<td>" + msg.documents[i].publisher + "</td>";
                    tr += "<td>";
                    for (let j = 0; j < msg.documents[i].translators.length; j++) {
                        tr += msg.documents[i].translators[j];
                    }
                    tr += "</td>";
                    tr += "<td>" + msg.documents[i].price + "</td>";
                    tr += "</tr>";

                    $(".tables").append(tr);
                }

                for (let i = startPage; i<endPage; i++){

                }
            });

        function paging(totalData, dataPerPage,pageCount, currentPage, totalPage){
            let startPage = currentPage/pageCount + 1;
            let endPage = startPage + pageCount -1;

        }
    });
</script>
</body>
</html>