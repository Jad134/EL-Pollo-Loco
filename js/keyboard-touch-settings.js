window.addEventListener('keydown', (e) => {

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

    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
        keyboard.lastKeyboardPress = new Date().getTime();
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
        keyboard.lastKeyboardPress = new Date().getTime();
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
        keyboard.lastKeyboardPress = new Date().getTime();
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
        keyboard.lastKeyboardPress = new Date().getTime();
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
        keyboard.lastKeyboardPress = new Date().getTime();
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
        keyboard.lastKeyboardPress = new Date().getTime();
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