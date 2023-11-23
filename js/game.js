let canvas;
let world;
let keyboard = new Keyboard();
main_song = new Audio('audio/main-song.mp3')
main_song.volume = 0.1;
let isMuted = false;
let gamePaused = false;




async function init() {
    await startLevel();
    await removeStartScreen();
    touchButtonEvents();
    playSong();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('Charcter is', world.character, world.enemies);
}

function mainMenu() {
    removeEndScreen()
    document.getElementById('start-screen').style.backgroundImage = 'url(img/9_intro_outro_screens/start/startscreen_2.png)'
    document.getElementById('start-btn').style = 'display: flex;'
    document.getElementById('pause-img').style = 'display: none'
    document.getElementById('settings').style = 'display: flex;'
    document.getElementById('touch-panels').style = 'z-index: 0;'
    main_song.pause();
    main_song.currentTime = 0;
}

async function startGame() {
    clearAllIntervals()
    await init();
    removeEndScreen();
    main_song.currentTime = 0;
    gamePaused = false;

}

function gameIsOverScreen() {
    let gameOverScreen = document.getElementById('game-over-title')
    let canvas = document.getElementById('canvas');
    document.getElementById('touch-panels').style = 'z-index: 0;'
    gameOverScreen.classList.add('active');
    canvas.classList.add('blur');
    setTimeout(() => {
        clearAllIntervals();
    }, 900);
}

function gameIsLostScreen() {
    let gameOverScreen = document.getElementById('game-loose-title')
    let canvas = document.getElementById('canvas');
    document.getElementById('touch-panels').style = 'z-index: 0;'
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
        document.getElementById('pause-img').style = 'display: block'
        document.getElementById('touch-panels').style = 'z-index: 99;'
    }, 200);

}

function removeEndScreen() {
    let canvas = document.getElementById('canvas');
    let gameOverScreen = document.getElementById('game-over-title');
    let gameLostScreen = document.getElementById('game-loose-title');
    let pauseScreen = document.getElementById('pause-screen');
    document.getElementById('settings').style = 'display: flex;'
    gameLostScreen.classList.remove('active');
    gameOverScreen.classList.remove('active');
    pauseScreen.classList.remove('active');
    canvas.classList.remove('blur');
}




function playSong() {
    main_song.play();
}


function toggleVolume() {
    let volumeImage = document.getElementById('volume');
    let menuVolume = document.getElementById('menu-volume')

    isMuted = !isMuted;
    if (isMuted) {
        volumeImage.src = 'img/downloads/volume-off.png';
        main_song.volume = 0;
        menuVolume.innerHTML = 'Off';
    } else {
        volumeImage.src = 'img/downloads/volume-on.png';
        main_song.volume = 0.1;
        menuVolume.innerHTML = 'On';

    }

}

function pauseGame() {
    let pauseScreen = document.getElementById('pause-screen');
    let settings = document.getElementById('settings');
    document.getElementById('touch-panels').style = 'z-index: 0;'
    pauseScreen.classList.add('active');
    settings.style = 'display: none;'
    canvas.classList.add('blur');
    gamePaused = true;
    main_song.pause();
}

function continueGame() {
    let pauseScreen = document.getElementById('pause-screen');
    let settings = document.getElementById('settings');
    document.getElementById('touch-panels').style = 'z-index: 99;'
    pauseScreen.classList.remove('active');
    settings.style = 'display: flex;'
    canvas.classList.remove('blur');
    main_song.play();
    gamePaused = false;
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

function touchButtonEvents() {
    let leftTouchBtn = document.getElementById('left-touch-btn');
    let rightTouchBtn = document.getElementById('right-touch-btn');
    let jumpTouchBtn = document.getElementById('jump-touch-btn');
    let throwTouchBtn = document.getElementById('throw-touch-btn');

    leftTouchBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    leftTouchBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    rightTouchBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    })

    rightTouchBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    })

    jumpTouchBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.UP = true;
    })

    jumpTouchBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.UP = false;
    })

    throwTouchBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    })

    throwTouchBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    })

}


