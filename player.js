class player {

    constructor(x, y, z) {
        console.log('Constructor: New player!');
        this.position = new THREE.Vector3( x, y, z );
        this.pawn = createBox(tileSize,tileSize,tileSize,0x00ffff);
        this.updateWorldPosition();
    }

    update() {

    }

    move(x, y, z) {
        if(game.board[this.position.z + z][this.position.x + x] === '.') {
            this.position.x += x;
            this.position.y += y;
            this.position.z += z;
            this.updateWorldPosition();
        }
    }

    updateWorldPosition() {
        this.pawn.position.x = this.position.x * tileSize,
        this.pawn.position.y = this.position.y * tileSize,
        this.pawn.position.z = this.position.z * tileSize;
        this.pawn.position.divideScalar(tileSize).floor().multiplyScalar(tileSize);
    }

}