/*{
    id: XXXXXXXXXXXXXXXXXXX,
    name: 'Muad',
    position: { x, y, z },
    score: 0,
    color: 0x00FFFF
}*/

class player {

    constructor(x, y, z) {
        console.log('Constructor: New player!');
        this.id = '';
        this.name = '';
        this.position = new THREE.Vector3( x, y, z );
        this.pawn = this.createPawn(tileSize,tileSize,tileSize,0x00ffff);
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

    placeBomb() {
        let b = new bomb(this.pawn.position, 3000);
        scene.add(b.pawn);
    }

    createPawn(x, y, z, _color) {
        let pawnGeo = new THREE.BoxBufferGeometry( x, y, z );
        let pawnMaterial = new THREE.MeshPhongMaterial( { color: _color, opacity: 0.5, transparent: true, depthWrite: false } );
        return new THREE.Mesh( pawnGeo, pawnMaterial );
    }

    get() {
        return {
            id: this.id,
            name: this.name,
            position: { x: this.position.x, y: this.position.y, z: this.position.z },
            score: this.score,
            color: this.color
        }
    }
}