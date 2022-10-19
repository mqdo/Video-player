const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const video = $("video");
const player = $(".player");
const controls = $(".controls");
const expand = $(".expand");
const play = $(".play");
const skip = $$(".skip");
const volume = $("#volume");
const playbackRate = $("#playback_rate");
const currentTime = $("#current");

function toggleFullScreen(player) {
  if (!document.fullscreenElement) {
    player.requestFullscreen();
    video.width = screen.width;
    video.height = screen.height;
    controls.style.transform = "scale(1.5) translateX(50%)";
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      video.width = 480;
      video.height = 270;
      controls.style.transform = "scale(1) translateX(0%)";
    }
  }
}

const handleChange = (e) => {
  video[e.target.name] = parseFloat(e.target.value);
};

const playVideo = () => {
  if (video.paused) {
    video.play();
    play.innerHTML = '<i class="fa-pause fa-solid"></i>';
  } else {
    video.pause();
    play.innerHTML = '<i class="fa-play fa-solid"></i>';
  }
};

window.addEventListener("keypress", (e) => {
  if (e.defaultPrevented) return;
  if (e.key === " ") playVideo();
  if (e.key === "Enter") toggleFullScreen(player);
});

expand.addEventListener(
  "click",
  function (e) {
    toggleFullScreen(player);
  },
  false
);

skip.forEach((s) => {
  s.addEventListener("click", (e) => {
    video.currentTime += parseFloat(s.dataset.skip);
  });
});

video.addEventListener("click", (e) => {
  if (controls.style.bottom === "1%") {
    controls.style.bottom = "200%";
  } else {
    controls.style.bottom = "1%";
  }
});
play.addEventListener("click", playVideo);
currentTime.addEventListener("click", handleChange);
currentTime.addEventListener("change", handleChange);
currentTime.addEventListener("mouseup", handleChange);
volume.addEventListener("change", handleChange);
volume.addEventListener("mouseup", handleChange);
playbackRate.addEventListener("change", handleChange);
playbackRate.addEventListener("mouseup", handleChange);
