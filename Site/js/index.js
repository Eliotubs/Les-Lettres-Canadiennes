var splitter = document.getElementById("splitter");
var left = document.querySelector(".main-body-ressources");
var right = document.querySelector(".main-body-text");
var container = document.querySelector(".main-body");
var moveX = 0;
var drag = false;

splitter.addEventListener("mousedown", function (e) {
  //   console.log((1 - e.pageX / window.innerWidth) * 100);
  drag = true;
});

container.addEventListener("mousemove", function (e) {
  moveX = e.pageX;
  if (drag) {
    leftValue = (moveX / window.innerWidth) * 100 + "%";
    leftValue = (moveX / window.innerWidth) * 100 + "%";
    rightValue = (1 - e.pageX / window.innerWidth) * 100 + "%";
    container.style.gridTemplateColumns =
      "minmax(400px, " + leftValue + ") 5px minmax(400px, " + rightValue + ")";
  }
});

container.addEventListener("mouseup", function (e) {
  drag = false;
});
