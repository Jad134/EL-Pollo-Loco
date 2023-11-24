let canvas;
let world;
let keyboard = new Keyboard();
main_song = new Audio('audio/main-song.mp3')
main_song.volume = 0.1;
let isMuted = false;
let gamePaused = false;
let isFullScreen = false;

async function init() {
    await startLevel();
    await removeStartScreen();
    automaticFullScreen()
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
    level1 = [];
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

    setTimeout(() => {
        clearAllIntervals();
    }, 900);
}

function gameIsLostScreen() {
    let gameOverScreen = document.getElementById('game-loose-title')
    let canvas = document.getElementById('canvas');
    document.getElementById('touch-panels').style = 'z-index: 0;'
    gameOverScreen.classList.add('active');

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
    gamePaused = true;
    main_song.pause();
    
}


function continueGame() {
    let pauseScreen = document.getElementById('pause-screen');
    let settings = document.getElementById('settings');
    document.getElementById('touch-panels').style = 'z-index: 99;'
    pauseScreen.classList.remove('active');
    settings.style = 'display: flex;'
    main_song.play();
    gamePaused = false;
}


function showKeyboardAssignments() {
    let assignmentscreen = document.getElementById('assignment-screen');
    let settings = document.getElementById('settings');
    document.getElementById('touch-panels').style = 'z-index: 0;'
    assignmentscreen.classList.add('active');
    settings.style = 'display: none;'
    gamePaused = true;
    main_song.pause();
}


function closeAssignments() {
    let assignmentscreen = document.getElementById('assignment-screen');
    let settings = document.getElementById('settings');
    document.getElementById('touch-panels').style = 'z-index: 99;'
    assignmentscreen.classList.remove('active');
    settings.style = 'display: flex;'
    continueGame();
}


function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function fullScreen() {
    let gameContainer = document.getElementById('game-container');
    let canvas = document.getElementById('canvas');
    let screenSizeInfo = document.getElementById('screen-size-info');

    if(!isFullScreen) {
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        screenSizeInfo.innerHTML = 'FullScreen'
        enterFullscreen(gameContainer);
        
        isFullScreen = true;
    } else {
        canvas.style.width = '720px';
        canvas.style.height = '480px';
        screenSizeInfo.innerHTML = 'Normal'
        exitFullscreen();
        isFullScreen = false;
    }
}


function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}


function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

  function automaticFullScreen(){
    let h = parseInt(window.innerHeight);

    if(h < 500){
        fullScreen();
    }
  }
  
