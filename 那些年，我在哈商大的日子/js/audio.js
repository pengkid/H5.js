window.onload = function () {
    var play = document.getElementsByClassName("play")[0];
    var audio = document.getElementsByTagName("audio")[0];

    document.addEventListener('DOMContentLoaded', function () {
        function audioAutoPlay() {
            audio.play();
            document.addEventListener("WeixinJSBridgeReady", function () {
                audio.play();
            }, false);
        }
        audioAutoPlay();
    });

    //点击停止，点击播放
    play.onclick = function () {
        if (audio.paused) {
            audio.play();
            this.style.animationPlayState = "running";
        }
        else {
            audio.pause();
            this.style.animationPlayState = "paused";
        }
    };
};
