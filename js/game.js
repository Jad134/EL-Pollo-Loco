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

function mainMenu() {
    removeEndScreen()
    document.getElementById('start-screen').style.backgroundImage = 'url(img/9_intro_outro_screens/start/startscreen_2.png)'
    document.getElementById('start-btn').style = 'display: flex;'
    main_song.pause();
    main_song.currentTime = 0;
}

async function startGame() {
    await init();
    removeEndScreen();
    main_song.currentTime = 0;
    
}

function gameIsOverScreen() {
    let gameOverScreen = document.getElementById('game-over-title')
    let canvas = document.getElementById('canvas');
    gameOverScreen.classList.add('active');
    canvas.classList.add('blur');
    setTimeout(() => {
        clearAllIntervals();
    }, 900);
}

function gameIsLostScreen() {
    let gameOverScreen = document.getElementById('game-loose-title')
    let canvas = document.getElementById('canvas');
    gameOverScreen.classList.add('active');
    canvas.classList.add('blur');
    setTimeout(() => {
        clearAllIntervals();
    }, 900);
}

async function removeStartScreen() {
    setTimeout(() => {
        document.getElementById('start-screen').style.backgroundImage = 'none'
        document.getElementById('start-btn').style = 'display: none;'
    }, 200);

}

function removeEndScreen() {
    let canvas = document.getElementById('canvas');
    let gameOverScreen = document.getElementById('game-over-title');
    let gameLostScreen = document.getElementById('game-loose-title');
    gameLostScreen.classList.remove('active')
    gameOverScreen.classList.remove('active');
    canvas.classList.remove('blur');
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

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
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



