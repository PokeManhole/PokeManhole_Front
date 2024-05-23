function playAudio(audioId) {
    var audio = document.getElementById(audioId);
    audio.play();
  }

  document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('audio');
    const playPauseButton = document.getElementById('playPause');
    const playPauseImg = document.getElementById('playPauseImg');
    const seekBar = document.getElementById('seekBar');
  
    playPauseButton.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            playPauseImg.src = 'Pikachu Run.gif'; // 재생 중일 때 이미지 변경
        } else {
            audio.pause();
            playPauseImg.src = 'Sport Ball.png'; // 일시정지 중일 때 이미지 변경
        }
    });
  
    audio.addEventListener('timeupdate', function() {
        const value = (audio.currentTime / audio.duration) * 100;
        seekBar.value = value;
    });
  
    seekBar.addEventListener('input', function() {
        const time = (seekBar.value / 100) * audio.duration;
        audio.currentTime = time;
    });
  });  