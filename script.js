const songs = [
  "songs/song.mp3",
  "songs/song2.mp3",
  "songs/song3.mp3",
  "songs/song4.mp3",
  "songs/song5.mp3"
];

const audio = document.getElementById("bg-music");
let currentIndex = Math.floor(Math.random() * songs.length);

audio.src = songs[currentIndex];
audio.volume = 0.2;
audio.loop = false;

// Play next song when current ends
audio.addEventListener("ended", () => {
  let next;
  do {
    next = Math.floor(Math.random() * songs.length);
  } while (next === currentIndex);

  currentIndex = next;
  audio.src = songs[currentIndex];
  audio.play();
});

// Start music after first interaction
function startMusic() {
  audio.play();
  document.removeEventListener("click", startMusic);
  document.removeEventListener("keydown", startMusic);
}

document.addEventListener("click", startMusic);
document.addEventListener("keydown", startMusic);

// Toggle button
function toggleMusic() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}