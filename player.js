class player {

    constructor() {
        console.log('Constructor: New player!');
        this.pawn = createBox(tileSize,tileSize,tileSize,0x00ffff);
        this.pawn.position.divideScalar(tileSize).floor().multiplyScalar(tileSize).addScalar(tileSize/2);
        this.position = this.pawn.position;
    }

    update() {

    }

    move(x, y, z, snap) {
        this.pawn.translateX(x);
        this.pawn.translateY(y);
        this.pawn.translateZ(z);
    }

}