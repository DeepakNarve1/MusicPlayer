const playBtn = document.querySelector('#mainPlayBtn');
const audio = document.querySelector('#audio');
const btnPrev = document.querySelector('#btnPrev');
const btnNext = document.querySelector('#btnNext');
const trackTitle = document.querySelector('.track-title');
const artistName = document.querySelector('.artist-name');
const cover = document.querySelector('.cover');
const slider = document.querySelector('.slider');
const thumb = document.querySelector('.slider-thumb');
const progress = document.querySelector('.progress');
const time = document.querySelector('.time');
const fullTime = document.querySelector('.fulltime');
const volumeSlider = document.querySelector('.volume-slider .slider');
const volumeProgress = document.querySelector('.volume-slider .progress');
const volumeIcon = document.querySelector('.volume-slider .fa-volume-low');

let trackPlaying = false;

let volumeMuted = false

// Which track is currently loaded (based on the numerical id)
let trackId = 0;

// Data
// Track names

const tracks = [
    "The Night We Met",
    "Chemtrails Over The Country Club",
    "Say Yes to Heaven"
];

const artists = [
    "Lord Huron",
    "Lana Del Rey",
    "Lana Del Rey"
];

const covers = [
    "img_0",
    "img_1",
    "img_2"
];


playBtn.addEventListener('click', playTrack);


//Play track function
function playTrack() {
    if(trackPlaying === false) {
        audio.play();
        playBtn.innerHTML = `<span class="fa-solid fa-pause"></span>`;
        trackPlaying = true;
    }
    else {
        audio.pause();
        playBtn.innerHTML = `<span class="fa-solid fa-play"></span>`;
        trackPlaying = false;
    }
}






// switching tracks fnuction
function switchTrack() {
    if(trackPlaying === true) {
        audio.play();
    }
}

// Get the track source
const trackSrc = 'songs/' + tracks[trackId] + ".mp3";

    // Load track function
    function loadTrack() {
        // Set the audio track source
        audio.src = 'songs/' + tracks[trackId] + ".mp3";
        // Re- Load the audio track
        audio.load();
        // Set the track title
        trackTitle.innerHTML = tracks[trackId];
        // set the artist name
        artistName.innerHTML = artists[trackId];
        // set the cover image
        cover.src = 'cover/' + covers[trackId] + ".jpeg";
        // set the timeline slider to the start point
        progress.style.width = 0;
        thumb.style.left = 0;

        // wait for the audio data to load
        audio.addEventListener('loadeddata', () => {
            // display the duration of the audio file
            setTime(fullTime, audio.duration);
            // set max value to slider
            slider.setAttribute("max", audio.duration);
        });
    }


    // Initially load the track
    loadTrack(); 

    // Set click event to previous button
    btnPrev.addEventListener('click', () => {
        // Decrement track id
        trackId--;
        // if the track id goes below 0
        if(trackId < 0) {
            // go to the last track
            trackId = tracks.length -1;
        }

        // Load the track
        loadTrack();
        // run the switchtrack function
        switchTrack();
    });

    //Set click event to next button 
    btnNext.addEventListener('click', nextTrack);

    // next track function
    function nextTrack() {
        // increment track id
        trackId++;
        if(trackId > tracks.length-1) {
            // go to the first track
            trackId = 0;
        }
        // load the track
        loadTrack();
        // run the switchtrack function if it is playing then audio.play()
        switchTrack();
    }

    // when the audio ends, switch to next track
    audio.addEventListener('ended', nextTrack);


    // Slider not worked at first


    function setTime(output, input) {
        // calculate minutes from input
        const minutes = Math.floor(input/60);
        const seconds = Math.floor(input % 60);

        // If the seconds are under 10
        if(seconds < 10) {
            // Add a zero before the first number
            output.innerHTML = minutes + ":0" + seconds;
        // if it i sover 10
        }
        else {
            // output the time without zero
            output.innerHTML = minutes + ":" + seconds;
        }
    }

    // output the audio track duration
    setTime(fullTime, audio.duration);

    // when the time changes on the audio track
    audio.addEventListener('timeupdate', () => {
        // get the current audio time
        const currentAudioTime = Math.floor(audio.currentTime);
        // get the percentage
        const timePercentage = (currentAudioTime / audio.duration) * 100 + "%";
        // output the current audio time 
        setTime(time, currentAudioTime);
        // set the slider progress to the percentage
        progress.style.width = timePercentage;
        thumb.style.left = timePercentage;
        // slider.value = currentAudioTime;
    });


// function for handling slider
function customSlider() {
    // get percentage
    const val = (slider.value / audio.duration)* 100 +"%";
    // set the thumb and progress to the current value
    progress.style.width = val;
    thumb.style.left = val;
    // output the audio current time
    setTime(time, slider.value);
    // set audio current time to slider value
    audio.currentTime = slider.value;
} 

// call function initially
customSlider(); //it not necessary to call the function

// repeat the function when the slider is selected
slider.addEventListener('input', customSlider);



/*
chat

slider.addEventListener('input', () => {
    const newTime = slider.value;
    audio.currentTime = newTime;
    progress.style.width = (newTime / audio.duration) * 100 + "%";
    thumb.style.left = (newTime / audio.duration) * 100 + "%";
});

*/



/////


// volume slider current value
let val;

// volume slider
function customVolumeSlider() {
    // get max attribute vlaue from slider
    const maxVal = volumeSlider.getAttribute("max");
    // get the percentage
    val = (volumeSlider.value / maxVal) * 100 + "%";
    // set the thumb and progress to the current value
    volumeProgress.style.width = val;
    // set the current volume to current value
    audio.volume = volumeSlider.value / 100;
    // cahnge volume icon
    // If the volume is high
    if(audio.volume > 0.5) {
        // set the volume up icon
        volumeIcon.className = "fa-solid fa-volume-high";
    }
    else if (audio.volume === 0) {
        // set the mute icon
        volumeIcon.className = "fa-solid fa-volume-mute";
    }
    else{
        // set the volume low icon
        volumeIcon.className = "fa-solid fa-volume-low";
    }
}

// Run the volume slider function
customVolumeSlider();

/* run the function again on when the volume slider is selected*/

volumeSlider.addEventListener('input', customVolumeSlider)

// Adding a event on icon


volumeIcon.addEventListener('click', () => {
    // if the volume is not muted
    if(volumeMuted === false) {
        // set the volume mute icon
        volumeIcon.className = "fa-solid fa-volume-mute";
        // set the volume to mute
        audio.volume = 0;
        // set the volume slider to zero
        volumeProgress.style.width = 0;
        // set the volume muted to true
        volumeMuted = true;
    }
    else {
        volumeIcon.className = `fa-solid fa-volume-low`;

        audio.volume = 0.5;

        // volumeProgress.style.width = 50 + "%" ; //doubt

        volumeProgress.style.width = val;

        volumeMuted = false;
    }
});