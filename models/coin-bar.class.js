class Coinbar extends DrawableObject {

    IMAGES_COINBAR = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_COINBAR);
        this.height = 50;
        this.width = 200;
        this.x = 40;
        this.y = 40;
        this.setPercentageCoin(0);
    }

    percentage = 0;

    setPercentageCoin(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_COINBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 0) {
            return 0;
        } else if (this.percentage == 1) {
            return 1;
        } else if (this.percentage == 2) {
            return 2;
        }
        else if (this.percentage == 3) {
            return 3;
        }
        else if (this.percentage == 4) {
            return 4;
        }
        else  if(this.percentage >= 5)
            return 5;
        
    }

}