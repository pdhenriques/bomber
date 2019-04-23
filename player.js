class player {

    constructor(x, y, z) {
        console.log('Constructor: New player!');
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
        console.log('bomb');
        let bombGeo = new THREE.SphereBufferGeometry( 20 );
        let bombMaterial = new THREE.MeshPhongMaterial( { color: 0xaa3333 } );
        let bomb =  new THREE.Mesh( bombGeo, bombMaterial );
        bomb.position.copy(this.pawn.position);
        scene.add(bomb);
    }

    createPawn(x, y, z, _color) {
        let pawnGeo = new THREE.BoxBufferGeometry( x, y, z );
        let pawnMaterial = new THREE.MeshPhongMaterial( { color: _color, opacity: 0.5, transparent: true, depthWrite: false } );
        return new THREE.Mesh( pawnGeo, pawnMaterial );
    }
}