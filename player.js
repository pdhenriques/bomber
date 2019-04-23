class player {

    constructor() {
        console.log('Constructor: New player!');
        this.position = new THREE.Vector3( 1, 0, 1 );
        this.pawn = createBox(tileSize,tileSize,tileSize,0x00ffff);
        this.updateWorldPosition();
    }

    update() {

    }

    move(x, y, z) {
        this.position.x += x;
        this.position.y += y;
        this.position.z += z;
        this.updateWorldPosition();
    }

    updateWorldPosition() {
        this.pawn.position.x = this.position.x * tileSize,
        this.pawn.position.y = this.position.y * tileSize,
        this.pawn.position.z = this.position.z * tileSize;
        this.pawn.position.divideScalar(tileSize).floor().multiplyScalar(tileSize);
    }

}