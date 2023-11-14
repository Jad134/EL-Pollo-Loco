let canvas;
let world;
let keyboard = new Keyboard();
main_song = new Audio('audio/main-song.mp3')
main_song.volume = 0.1;

function init() {
    startLevel()
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    playSong()

    console.log('Charcter is', world.character, world.enemies);
}


function startGame() {
    document.getElementById('start-screen').style.backgroundImage = 'none'
    document.getElementById('start-btn').style = 'display: none;'

}


function playSong() {
    main_song.play();  
}


function muteSong(){
    if(main_song.volume == 0){
        main_song.volume = 0.1;
    }else if(main_song.volume == 0.1){
        main_song.volume = 0;
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

