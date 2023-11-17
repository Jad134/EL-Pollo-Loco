let canvas;
let world;
let keyboard = new Keyboard();
main_song = new Audio('audio/main-song.mp3')
main_song.volume = 0.1;
let isMuted = false;


async function init() {
    await startLevel();
    await removeStartScreen();
    playSong();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('Charcter is', world.character, world.enemies);
}


async function startGame() {
    await init();
}


async function removeStartScreen() {
    setTimeout(() => {
        document.getElementById('start-screen').style.backgroundImage = 'none'
        document.getElementById('start-btn').style = 'display: none;'
    }, 200);

}


function playSong() {
    main_song.play();
}


function toggleVolume() {
    let volumeImage = document.getElementById('volume');

    isMuted = !isMuted;
    if (isMuted) {
        volumeImage.src = 'img/downloads/volume-off.png';
        main_song.volume = 0;
    } else {
        volumeImage.src = 'img/downloads/volume-on.png';
        main_song.volume = 0.1;
    }

}


window.addEventListener('keydown', (e) => {
    // console.log(event['key'])

    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }

});

window.addEventListener('keyup', (e) => {
    // console.log(event['key'])

    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }

});

