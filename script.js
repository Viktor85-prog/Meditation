const song = document.querySelector(".song");
const play = document.querySelector(".play");
const outline = document.querySelector(".moving-outline circle");
const video = document.querySelector(".video-container video");
const sounds = document.querySelectorAll(".sound button");
const timeDisplay = document.querySelector(".time-display");
const timeSelect = document.querySelectorAll(".time-select button");
const outlineLength = outline.getTotalLength();
outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;

sounds.forEach((sound) => {
  sound.onclick = function () {
    song.src = this.getAttribute("data-sound");
    video.src = this.getAttribute("data-video");
    checkPlaying(song);
  };
});
play.onclick = () => {
  checkPlaying(song);
};

timeSelect.forEach((option) => {
  option.onclick = function () {
    duration = this.getAttribute("data-time");
    timeDisplay.textContent = `${Math.floor(duration / 600)}:${Math.floor(
      duration % 60
    )}`;
    checkPlaying(song);
  };
});

const checkPlaying = (song) => {
  if (song.paused) {
    song.play();
    video.play();
    play.src = "./svg/pause.svg";
  } else {
    song.pause();
    video.pause();
    play.src = "./svg/play.svg";
  }
};

const checkPlayingAlarm = () => {
  let lastsrc = song.src;
  let lastduration = duration;
  song.src = "./sounds/alarm.mp3";
  song.play();
  duration = 2;
  setTimeout(() => song.pause(), 2000);
  setTimeout(() => (song.src = lastsrc), 2000);
  setTimeout(() => (duration = lastduration), 2000);
};

song.ontimeupdate = () => {
  let currentTime = song.currentTime;
  let elapsed = duration - currentTime;
  let seconds = Math.floor(elapsed % 60);
  let minutes = Math.floor(elapsed / 60);
  let progress = outlineLength - (currentTime / duration) * outlineLength;
  outline.style.strokeDashoffset = progress;

  timeDisplay.textContent = `${minutes}:${seconds}`;

  if (currentTime >= duration) {
    song.currentTime = 0;
    play.src = "./svg/play.svg";
    checkPlayingAlarm();
    video.pause();
  }
};
