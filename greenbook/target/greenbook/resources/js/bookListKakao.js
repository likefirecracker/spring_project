 function bookList() {
    if ($("#searchText").val() == "") {
    alert("검색할 제목을 입력해 주세요.");
    } else {
        console.log("currentPage(hidden) = "+ $("#currentPage").val());
        $.ajax({
            method: "GET",
            url: "https://dapi.kakao.com/v3/search/book?target=title&limit=50",
            data: {query: $("#searchText").val(), page: $("#currentPage").val()},
            headers: {
                Authorization: "KakaoAK 791516fe4d4d98753319ee19b0cc93f9"
            }
        }).done(function (msg) {
            $(".firstRow").nextAll().remove();
            $("#listPage").children().remove();
            console.log(msg);

            for (let i = 0; i < msg.documents.length; i++) {
                let tr = "";

                tr += "<tr class='contain" + i + "'>";
                tr += "<td><img class='img" + i + "' src='" + msg.documents[i].thumbnail + "'></td>"
                tr += "<td>" + msg.documents[i].title + "</td>";
                tr += "<td>";
                for (let j = 0; j < msg.documents[i].authors.length; j++) {
                    tr += msg.documents[i].authors[j];
                    if (j != msg.documents[i].authors.length - 1) {
                        tr += ",";
                    }
                }
                tr += "</td>";
                tr += "<td class='publisher'>" + msg.documents[i].publisher + "</td>";
                tr += "<td>";
                for (let j = 0; j < msg.documents[i].translators.length; j++) {
                    tr += msg.documents[i].translators[j];
                    if (j != msg.documents[i].translators.length - 1) {
                        tr += ",";
                    }
                }
                tr += "</td>";
                tr += "<td>" + msg.documents[i].price + "</td>";
                tr += "<td>" + msg.documents[i].datetime.split("T")[0] + "  <input id='content" + i + "' type='hidden' value='" + msg.documents[i].contents + "'>" +
                    "<input class='isbn"+i+"' type='hidden' name='isbn' value='"+msg.documents[i].isbn.split(" ")[1]+"'>"+"</td>";
                tr += "<td><input type='button' onclick='upload(" + i + ")' value='등록'></td>";
                tr += "</tr>";

                $(".tables").append(tr);
            }

            let pageSize = 10;
            let currentPage = $("#currentPage").val();
            let totalPage = msg.meta.pageable_count;
            if(totalPage > 50){
                 totalPage = 50;
            }
            if(currentPage%pageSize == 0) currentPage -= 10;
            let firstPage = (Math.trunc(( currentPage/pageSize )))*10 +1;
            let endPage = firstPage + pageSize -1;
            if(endPage > totalPage){
                 endPage = totalPage;
            }
            console.log("totalPage = "+totalPage);
            console.log("firstPage = "+firstPage);
            console.log("endPage = "+endPage);
            console.log("currentPage = "+currentPage);

            let pb = "";
            if(firstPage != 1){
                pb += "<li><a onclick='pageChange("+(firstPage-1)+")'>이전</a></li>";
            }

            for (let i = firstPage;i<= endPage; i++){
                if(i == $("#currentPage").val()){
                    pb += "<li><a class='active' onclick='pageChange("+i+")'>"+i+"</a></li>";
                }else{
                    pb += "<li><a onclick='pageChange("+i+")'>"+i+"</a></li>";
                }
            }

            if(endPage < totalPage){
                pb += "<li><a onclick='pageChange("+(endPage+1)+")'>다음</a></li>";
            }

            $("#listPage").append(pb);
        });
    }
}

function pageChange(num){
    $("#currentPage").val(num);
    bookList();
}

function upload(num){
    console.log(num);

    let img = $(".img"+num).attr("src");
    let title = $(".contain"+num+" td:nth-child(2)").text();
    let authorsAndTranslators = $(".contain"+num+" td:nth-child(3)").text();
    let publisher = $(".contain"+num+" td:nth-child(4)").text();
    let price = $(".contain"+num+" td:nth-child(6)").text();
    let datetime = $(".contain"+num+" td:nth-child(7)").text();
    let content = $("#content"+num).attr("value");
    let isbn = $(".isbn"+num).val();
    // datetime = datetime.split("T")[0];

    console.log(img);
    console.log(title);
    console.log(authorsAndTranslators);
    console.log(publisher);
    console.log(price);
    console.log(datetime);
    console.log(content);
    console.log(isbn);

    $("#preview_image").attr("src",img);
    $("input[name=imgSrc]").attr("value",img);
    $("input[name=bookTitle]").attr("value",title);
    $("input[name=bookAuthor]").attr("value",authorsAndTranslators);
    $("input[name=bookPublisher]").attr("value",publisher);
    $("input[name=bookPrice]").attr("value",price);
    $("input[name=publicationDate]").attr("value",datetime);
    $("input[name=bookDescription]").attr("value",);
    $("textarea[name=bookDescription]").text(content);
    $("input[name=isbn]").attr("value",isbn);
}
