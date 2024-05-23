document.addEventListener("DOMContentLoaded", function () {
  var radial = document.getElementById("radial");

  document.addEventListener("mousemove", function (e) {
    var xPos = e.clientX;
    var yPos = e.clientY;

    radial.style.background =
      "radial-gradient(circle at " +
      xPos +
      "px " +
      yPos +
      "px, rgba(255, 255, 255, 0.8), transparent )";
  });
});
