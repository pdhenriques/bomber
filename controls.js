class inputs {
    
    constructor() {
        console.log('Constructor: New controls!');

        // Binding Input Events
        document.addEventListener('mousemove', this.onDocumentMouseMove, false);
        document.addEventListener('mousedown', this.onDocumentMouseDown, false);
        document.addEventListener('mouseup', this.onDocumentMouseUp, false);
        document.addEventListener('keydown', this.onDocumentKeyDown, false);
        document.addEventListener('keyup', this.onDocumentKeyUp, false);
    
        // Orbit Controls setup
        this.orbit = new THREE.OrbitControls( camera, renderer.domElement );
        this.orbit.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        this.orbit.dampingFactor = 0.15;
        this.orbit.screenSpacePanning = false;
        this.orbit.minDistance = 100;
        this.orbit.maxDistance = 9000;
        this.orbit.maxPolarAngle = Math.PI / 2;
        this.orbit.target.set(0, 0, 0);
        this.orbit.rotateSpeed = 0.15;
        this.orbit.zoomSpeed   = 0.15;
        this.orbit.panSpeed    = 0.15;
    }

    update() {
        this.orbit.update();
    }

    // MOUSE STUFF

    onDocumentMouseDown(event) {
        if (game.state == 'run') {
            event.preventDefault();
            
        }
    }

    onDocumentMouseUp(event) {
        if (game.state == 'run') {
            event.preventDefault();
            
        }
    }

    onDocumentMouseMove(event) {
        if (game.state == 'run') {
            event.preventDefault();
            
        }
    }

    // KEYBOARD STUFF

    onDocumentKeyDown(event) {
        // console.log('keydown:', event.keyCode);
        if (game.state == 'run' || game.state == 'pause') {
            switch (event.keyCode) {
                case 80: game.togglePause(); break; // p
                case 87: game.player1.move(0, 0, -tileSize, tileSize); break; // w
                case 83: game.player1.move(0, 0, tileSize, tileSize); break; // s
                case 65: game.player1.move(-tileSize, 0, 0, tileSize); break; // a
                case 68: game.player1.move(tileSize, 0, 0, tileSize); break; // d
            }
        }
    }

    onDocumentKeyUp(event) {
        // console.log(event.keyCode);
        if (game.state == 'run') {
            switch (event.keyCode) {
                
            }
        }
    }

}
