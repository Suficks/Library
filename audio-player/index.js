const background = document.querySelector('.background');
const cover = document.querySelector('.cover');
const titleContainer = document.querySelector('.title');
const authorContainer = document.querySelector('.author');
const audio = document.querySelector('.audio');
const play = document.querySelector('.play');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const currentTime = document.querySelector('.current__time');
const durationTime = document.querySelector('.duration__time');
const volume = document.querySelector('.volume');
const mute = document.querySelector('.mute');
const progressLine = document.querySelector('.audio__bar');
const volumeBar = document.querySelector('.volume__bar');

const songsTitle = ['Dance The Night', 'Remember', 'Dog Days Are Over', 'Strangers', 'Brother', 'Skyline'];
const songsAuthor = ['Dua Lipa', 'Becky Hill', 'Florence and The Machine', 'Kenya Grace', 'Matt Corby', 'Mowe'];

let songIndex = 0

const loadSong = (title, author) => {
  titleContainer.innerHTML = title;
  authorContainer.innerHTML = author;
  audio.src = `./assets/audio/${author} - ${title}.mp3`;
  cover.src = `./assets/img/${title}.jpg`;
  background.src = `./assets/img/${title}.jpg`;
}

loadSong(songsTitle[songIndex], songsAuthor[songIndex])

let isPlay = false;

const audioToggle = () => {
  if (!isPlay) {
    audio.play();
    isPlay = true;
    play.style.backgroundImage = 'url(./assets/img/pause.png)';
  } else {
    audio.pause();
    isPlay = false;
    play.style.backgroundImage = 'url(./assets/img/icons-play.png)';
  };
}

const audioProgress = () => {
  const progress = (Math.floor(audio.currentTime) / (Math.floor(audio.duration) / 100));
  progressLine.value = progress;
  progressLine.style.background = `linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) ${progress}%, rgba(0, 0, 0, 0.5) ${progress}%, rgba(0, 0, 0, 0.5) 100%)`;
};

const audioChangeTime = (e) => {
  const progress = e.offsetX / (progressLine.offsetWidth / 100);
  audio.currentTime = audio.duration * (progress / 100);
  progressLine.style.background = `linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) ${progress}%, rgba(0, 0, 0, 0.5) ${progress}%, rgba(0, 0, 0, 0.5) 100%)`;
};

let savedVolume = 50;

volumeBar.addEventListener('input', () => {
  savedVolume = volumeBar.value;
  volumeBar.style.background = `linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) ${savedVolume}%, rgba(0, 0, 0, 0.5) ${savedVolume}%, rgba(0, 0, 0, 0.5) 100%)`;
});

const toggleVolume = () => {
  if (audio.volume === 0) {
    audio.volume = savedVolume / 100;
    volumeBar.value = savedVolume;
    volumeBar.style.background = `linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) ${savedVolume}%, rgba(0, 0, 0, 0.5) ${savedVolume}%, rgba(0, 0, 0, 0.5) 100%)`;
  } else {
    audio.volume = 0;
    volumeBar.value = 0;
    volumeBar.style.background = 'linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%)';
  };
};

const fullVolume = () => {
  if (audio.volume !== 1) {
    audio.volume = 1;
    volumeBar.value = 100;
    volumeBar.style.background = `linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%`;
  } else {
    audio.volume = savedVolume / 100;
    volumeBar.value = savedVolume;
    volumeBar.style.background = `linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.7) ${savedVolume}%, rgba(0, 0, 0, 0.5) ${savedVolume}%, rgba(0, 0, 0, 0.5) 100%)`;
  };
};

const changeVolume = () => {
  const volume = volumeBar.value / 100;
  audio.volume = volume;
};

const nextSong = () => {
  songIndex++;

  if (songIndex > songsTitle.length - 1) {
    songIndex = 0;
  }
  loadSong(songsTitle[songIndex], songsAuthor[songIndex]);
}

const prevSong = () => {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songsTitle.length - 1;
  }
  loadSong(songsTitle[songIndex], songsAuthor[songIndex]);
}

play.addEventListener('click', audioToggle);
audio.addEventListener('timeupdate', audioProgress);
progressLine.addEventListener('click', (e) => {
  audioChangeTime(e);
});
volumeBar.addEventListener('change', changeVolume);
mute.addEventListener('click', toggleVolume);
volume.addEventListener('click', fullVolume);
next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);