/*
let data = {
    id: XXXXXXX,
    name: 'player0',
    position: { x: x, y: y, z: z },
    score: 0,
    color: 0x00FFFF
}
*/

class player {

    constructor( data ) {
        console.log('Constructor: New player!');
        this.id = data.id || 0;
        this.name = data.name || 'player' + rand(100);
        this.position = new THREE.Vector3( data.position.x, data.position.y, data.position.z );
        this.score = data.score || 0;
        this.color = data.color || 0x00ffff;
        this.pawn = this.createPawn(tileSize,tileSize,tileSize, this.color);
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

    set(data) {
        this.id = data.id || this.id;
        this.name = data.name || this.name;
        this.position.x = data.position.x || this.position.x;
        this.position.y = data.position.y || this.position.y;
        this.position.z = data.position.z || this.position.z;
        this.score = data.score || this.score;
        this.color = data.color || this.color;
        this.updateWorldPosition();
    }
}