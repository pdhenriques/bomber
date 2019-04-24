class bomb {

    constructor(pos , ttl) {
        this.pawn = this.createPawn();
        this.pawn.position.copy(pos);
        this.ttl = ttl;
        this.birth = Date.now();
        this.update();
        // console.log('bomb', this.ttl, this.birth );
    }

    update() {
        // console.log('bomb update');

        if (Date.now() - this.birth > this.ttl ) {
            this.explode();
        }
        if(this.pawn) {
            setTimeout( () => this.update() , 1000 );
        }
    }

    createPawn() {
        // console.log('bomb');
        let bombGeo = new THREE.SphereBufferGeometry( 20 );
        let bombMaterial = new THREE.MeshPhongMaterial( { color: 0xaa3333 } );
        return new THREE.Mesh( bombGeo, bombMaterial );
    }

    explode() {
        // console.log('bomb explode');
        scene.remove(this.pawn);
        delete this.pawn;
    }

}