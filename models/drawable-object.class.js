class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;



    loadImage(path) {
        this.img = new Image(); // this.img = document.getelementById('Image')
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * This function is only for checking the hitbox for movable Objects and is currently not in use. For use write in the if query instance of 'class'.
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    drawFrame(ctx) {
        if (0 == 1) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
 * Preloads images and stores them in the image cache.
 *
 * @param {string[]} arr - An array of image paths to be preloaded.
 */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}