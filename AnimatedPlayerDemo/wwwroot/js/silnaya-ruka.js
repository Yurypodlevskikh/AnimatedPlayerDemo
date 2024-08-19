let context, analyser, src, array;
let red = 196;
let green = 23
let blue = 43;
let progressOfColor = 0;
let partOfTrack = 0;
let trackTimeDiv = document.getElementById("track-time");
let trackDurationDiv = document.getElementById("track-duration");
let progressbar = document.getElementById("s-ruka-progressbar");
let progressbarWidth = progressbar.offsetWidth;
let progressmeter = document.getElementById("s-ruka-progressmeter");

const audio = document.getElementById("audio");
//let cover = document.getElementById("cover").style;

// 4.
//const logo = document.getElementById("logo").style;

let redThings = document.getElementById("red-things");

let starLeft = document.getElementById("stars-wrapper-left");
let starRight = document.getElementById("stars-wrapper-right");
let leftPath = starLeft.firstElementChild;
let rightPath = starRight.firstElementChild;
leftPath.style.stroke = "#ffffff";
rightPath.style.stroke = "#ffffff";
leftPath.style.strokeWidth = 2 + "px";
rightPath.style.strokeWidth = 2 + "px";

// Frequency 200
let starLeft200 = document.getElementById("stars-wrapper-left-200");
let starRight200 = document.getElementById("stars-wrapper-right-200");
let leftPath200 = starLeft200.firstElementChild;
let rightPath200 = starRight200.firstElementChild;
leftPath200.style.fill = "rgba(0, 0, 255, 1)";
rightPath200.style.fill = "rgba(0, 0, 255, 1)";

// Frequency 600
let starLeft600 = document.getElementById("stars-wrapper-left-600");
let starRight600 = document.getElementById("stars-wrapper-right-600");
let leftPath600 = starLeft600.firstElementChild;
let rightPath600 = starRight600.firstElementChild;
leftPath600.style.fill = "rgba(255, 255, 0, 1)";
rightPath600.style.fill = "rgba(255, 255, 0, 1)";

function tuneColor(part) {
    if (part === undefined) {
        red = red - 1.96;
        green = green - 0.23;
        blue = blue + 2.12;
    } else {
        if (part > 0) {
            red = red - 1.96 * part;
            green = green - 0.23 * part;
            blue = blue + 2.12 * part;
        } else if (part < 0) {
            part = Math.abs(part);
            red = red + 1.96 * part;
            green = green + 0.23 * part;
            blue = blue - 2.12 * part;
        }
    }
    
    progressmeter.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

    redThings.style.fill = `rgb(${red}, ${green}, ${blue})`;
    // Change colore on the main stars
    leftPath.style.fill = `rgb(${red}, ${green}, ${blue})`;
    rightPath.style.fill = `rgb(${red}, ${green}, ${blue})`;
    //leftPath.style.fill = `rgba(${red}, 0, ${blue}, ${opacity})`;
    //rightPath.style.fill = `rgba(${red}, 0, ${blue}, ${opacity})`;
}

function displayTime(seconds) {
    let minutes = parseInt(seconds / 60);
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    seconds = parseInt(seconds - minutes * 60);
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
}

function seeking(e) {
    let percentToAudio = e.offsetX / progressbarWidth;
    audio.currentTime = percentToAudio * audio.duration;
    let seekPartOfSong = Math.trunc(percentToAudio * 100);
    if (seekPartOfSong !== progressOfColor) {
        let part = seekPartOfSong - progressOfColor;
        partOfTrack = seekPartOfSong;
        progressOfColor = seekPartOfSong;
        tuneColor(part);
    }
    
    let percentToProgressbar = percentToAudio * progressbarWidth;
    progressmeter.style.width = percentToProgressbar + "px";
}
progressbar.addEventListener("click", seeking);

function loop() {
    // 8. We need to stop the loop in order not to waste resources. Put the
    // method with starting loop in a condition
    if (!audio.paused) {
        window.requestAnimationFrame(loop);
    }
    // 1. Let's realize(implement) recursion with a special looping method
    // to reduce the load on the browser. By default, this method will
    // call the parenthesized function approximately 60 times per second.
    // If it still difficult for the browser to process information at such a speed,
    // then the number of frames per second will automatically decrease.

    // window.requestAnimationFrame(loop);

    // 2. This type of array optimizes all incoming data into integers without
    // plus or minus signs, with values from 0 to 255. The parentyesized argument
    // "analyser.frequencyBinCount" as standard equals 1024. You can write it
    // also as a number. If the amount of data is greater than the specified value
    // the excess will be cut off.

    array = new Uint8Array(analyser.frequencyBinCount);
    
    // 3. Copy the current frequency data to our array. Without this step,
    // our array will only contain 1024 zeros.

    analyser.getByteFrequencyData(array);

    // 5. Let's edit anything using recieved(getting) data.
    // Let's edit our logo element.

    // Frequency 200
    let leftStarHeight200 = (array[200]);
    let leftStarWidth200 = (leftStarHeight200 / 100) * 77.6;
    let rightStarHeight200 = (leftStarHeight200 / 100) * 90.9;
    let rightStarWidth200 = (leftStarWidth200 / 100) * 90.9;

    starLeft200.style.minHeight = leftStarHeight200 + "px";
    starLeft200.style.width = leftStarWidth200 + "px";
    starRight200.style.minHeight = rightStarHeight200 + "px";
    starRight200.style.width = rightStarWidth200 + "px";

    // Frequency 600
    let leftStarHeight600 = (array[600]);
    let leftStarWidth600 = (leftStarHeight600 / 100) * 77.6;
    let rightStarHeight600 = (leftStarHeight600 / 100) * 90.9;
    let rightStarWidth600 = (leftStarWidth600 / 100) * 90.9;

    starLeft600.style.minHeight = leftStarHeight600 + "px";
    starLeft600.style.width = leftStarWidth600 + "px";
    starRight600.style.minHeight = rightStarHeight600 + "px";
    starRight600.style.width = rightStarWidth600 + "px";

    
    let percent = audio.currentTime / audio.duration;
    let part = Math.trunc(percent * 100);

    // Value to show playing time
    trackTimeDiv.innerHTML = displayTime(audio.currentTime);

    // Display playing time in progressba
    progressmeter.style.width = (percent * progressbarWidth) + "px";
    //let opacity = part === 10 ? 1 : part / 10;
    if (part > progressOfColor) {
        progressOfColor = part;
        tuneColor();
    }

    if (part === 95) {
        /*cover.opacity = 0;*/
    }

    // Frequency 700
    let leftStarHeight = (array[800]);
    
    if (part < 98 || leftStarHeight > 42.5) {
        let leftStarWidth = (leftStarHeight / 100) * 77.6;
        let rightStarHeight = (leftStarHeight / 100) * 90.9;
        let rightStarWidth = (leftStarWidth / 100) * 90.9;

        starLeft.style.minHeight = leftStarHeight + "px";
        starLeft.style.width = leftStarWidth + "px";
        starRight.style.minHeight = rightStarHeight + "px";
        starRight.style.width = rightStarWidth + "px";
    } else {
        starLeft.style.minHeight = 42.5 + "px";
        starLeft.style.width = 33 + "px";
        starRight.style.minHeight = 38.6 + "px";
        starRight.style.width = 30 + "px";
    }
}

function preparation() {
    // This context contains methods that allow you to control and change
    // the audio track. This is the wotking area for sound processing.
    // You can only create one audio context per page.
    context = new AudioContext();
    // The analyser accesses to the audio file data. For example, to sound 
    // frequencies of the audio waveform.
    analyser = context.createAnalyser();
    // Create an audio object
    src = context.createMediaElementSource(audio);
    // Now you can make sound changes
    // Connect to analizer
    src.connect(analyser);
    // Let's send the sound to the speakers
    analyser.connect(context.destination);
    // Let's create an update animation function
    loop();
}

function play() {
    if (!context) {
        // If the variable context defined then preparation not uses.
        preparation();
    }
    audio.play();
    // 10. Let's run the loop right after the audio track plays
    loop();

    trackDurationDiv.innerHTML = displayTime(audio.duration);
}

function pause() {
    audio.pause();
}

let playBtn = document.getElementById("s-ruka-play");
playBtn.onclick = play;
let pauseBtn = document.getElementById("s-ruka-pause");
pauseBtn.onclick = pause;