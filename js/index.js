window.onload = function(){
    $.ajax({
        url: "https://script.google.com/macros/s/AKfycbwafKoSHjdBxd9sDBB-ohKjaDsOlaeXkRD4BMLPG28ZNgK7wFw/exec",
        type : "GET",
        success : function (data, status, xhr) {
          var articles = JSON.parse(data);
          for(var i = 0; i < 3; i++){
              var article = articles[i];
              var link = document.getElementById("articlelink" + String(i));
              link.setAttribute("href", article.link);
              var img = document.getElementById("articleimg" + String(i));
              img.setAttribute("src", article.img);
              var title = document.getElementById("articletitle" + String(i));
              title.innerText = article.title;
          }
          document.getElementById("articles").style.visibility = "visible";
        },
      });
}