class Rock extends DrawableObject{
    constructor(){
        super();
        this.loadImage('img/downloads/canyon_rock.png')
        this.x = 5870
        this.y = 125
        this.height = 300;
        this.width = 300;
    }

    /**
     * This class is only used to indicate the end of the map
     */
}