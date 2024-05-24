var image = document.querySelector('.loading-image');
var percent = document.querySelector('.percent');
var progress = document.querySelector('.progress');
var count = 0;
var per = 0;
var loading = setInterval(animate, 50);

function animate() {
  if (count >= 100) {
    image.src = "trainerwalk.png";
    clearInterval(loading);
  } else {
    per += 4.06; 
    count++;
    progress.style.width = per + 'px';
    percent.textContent = count + '%';
    image.style.left = (per - 50) + 'px'; 
  }
}