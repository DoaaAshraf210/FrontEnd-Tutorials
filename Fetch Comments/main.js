let commentsButton = document.querySelector(
    ".container .post .reactions .comment"
  ),
  comments = document.querySelector(".comments");

commentsButton.onclick = function () {
  getComments();
};
function getComments() {
  fetch("https://jsonplaceholder.typicode.com/comments")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        let div = document.createElement("div"),
          img = document.createElement("img"),
          commentBody = document.createElement("div"),
          info = document.createElement("div"),
          username = document.createElement("div"),
          date = document.createElement("div"),
          commentContent = document.createElement("div");
        div.className = "comment";
        comments.appendChild(div);
        img.src = "username.jpg";
        div.appendChild(img);

        commentBody.className = "comment-body";
        div.appendChild(commentBody);

        info.className = "info";
        commentBody.appendChild(info);

        username.appendChild(document.createTextNode(element.name));
        username.className = "username";
        info.appendChild(username);

        let d = new Date();
        date.appendChild(
          document.createTextNode(
            `${d.getHours()}H`
          )
        );

        date.className = "date";
        info.appendChild(date);

        commentContent.appendChild(document.createTextNode(element.body));
        commentContent.className = "comment-content";
        commentBody.appendChild(commentContent);
      });
    });
}
