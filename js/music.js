const audio = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
let isPlay = false;
audio.volume = 0.25;

musicBtn.addEventListener('click', () => {
    if(!isPlay){
        audio.play();
        musicBtn.textContent = "🔇 关闭音乐";
        isPlay = true;
    }else{
        audio.pause();
        musicBtn.textContent = "🎵 开启音乐";
        isPlay = false;
    }
});