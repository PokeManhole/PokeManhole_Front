document.addEventListener('mousemove', (e) => {
    let mouseX = e.pageX + 10; // document의 x좌표값
    let mouseY = e.pageY + 10; // document의 y좌표값

    let cursor = document.querySelector('.cursor');
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
})