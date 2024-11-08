let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');
let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');
let seek_slider = document.querySelector('.seek_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let randomIcon = document.querySelector('.bi-shuffle');
let randomTrackBtn = document.querySelector('.random-track');
let repeatIcon = document.querySelector('.bi-repeat');
let repeatTrackBtn = document.querySelector('.repeat-track');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'https://i.postimg.cc/vBBbx4y2/godlands.jpg',
        name : 'Charmer',
        artist : 'GODLANDS',
        music : 'https://music.songsio.com/a/bleach-ep/02%20Charmer.mp3'
    },
    {
        img : 'https://i.postimg.cc/0NFT0P8Q/bruno-mars.jpg',
        name : 'APT',
        artist : 'ROSÉ & Bruno Mars',
        music : 'https://music.songsio.com/s/kiara/01%20APT.mp3'
    },
    {
        img : 'https://i.postimg.cc/zfYtzjFd/new-jeans.jpg',
        name : 'GODS',
        artist : 'New Jeans & League of Legends',
        music : 'https://music.songsio.com/s/dCtr/01%20GODS.mp3'
    },
    {
        img : 'https://i.postimg.cc/Twb9MXnp/marshmello.jpg',
        name : 'Sou Musa do Verão',
        artist : 'Marshmello & Luísa Sonza',
        music : 'https://music.songsio.com/s/dCtr/01%20Sou%20Musa%20do%20Ver%C3%A3o.mp3'
    },
    {
        img : 'https://i.postimg.cc/8zywL41P/haoprox.jpg',
        name : 'Unbreakable',
        artist : 'Hoaprox & Bianca',
        music : 'https://music.songsio.com/s/foWn/01%20Unbreakable.mp3'
    },
    {
        img : 'https://i.postimg.cc/0NYsPnhn/azraziel.jpg',
        name : 'Snakes & Ladders',
        artist : 'Azraziel & Kuuro Ft. B.Eva',
        music : 'https://music.songsio.com/s/loV3/01%20Snakes%20%26%20Ladders.mp3'
    },
    {
        img : 'https://i.postimg.cc/SRMjfRdf/must-die.jpg',
        name : 'Sorrow Tech',
        artist : 'MUST DIE!',
        music : 'https://drive.google.com/uc?export=view&id='
    }, 
    {
        img : 'https://i.postimg.cc/26KmQC8k/kenya-grace.jpg',
        name : 'Strangers',
        artist : 'Kenya Grace',
        music : 'https://drive.google.com/uc?export=view&id='
    },
    {
        img : 'https://i.postimg.cc/Dm30jhYk/daizy.jpg',
        name : 'Smoke',
        artist : 'DAIZY',
        music : 'https://drive.google.com/uc?export=view&id='
    },
    {
        img : 'https://i.postimg.cc/ZKPYj8TQ/whipped-cream.jpg',
        name : 'Bad For Me',
        artist : 'Whipped Cream',
        music : 'https://drive.google.com/uc?export=view&id='
    }
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
}

function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="bi bi-pause-circle-fill"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="bi bi-play-circle-fill"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
