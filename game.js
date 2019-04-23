class game {
    
    constructor() {
        console.log('Constructor: New game!');
        this.state = 'run';           // { setup, run, pause, over }
        
        this.player1 = new player();
        scene.add(this.player1.pawn);
        this.spawnWalls();
    }

    update() {
    
        // console.log("frame")
        if (game.state == 'run') {
            
        } else if (game.state == 'start') {
            
        } else if (game.state == 'over') {
            
        } else if (game.state == 'pause') {
            
        }
    
    }
    
    start() {
        console.log('run');
        this.state = 'run';
        
    }

    stop() {
        console.log('over');
        this.state = 'over';

    }

    togglePause() {
        console.log('pause');
        if (this.state == 'run') {
            this.state = 'pause';
            
        } else if (this.state == 'pause') {
            this.state = 'run';
            
        }
    }

    spawnWalls() {
        let wallGeo = new THREE.BoxBufferGeometry( tileSize, tileSize, tileSize );
        let wallMaterial = new THREE.MeshBasicMaterial( { color: 0xcccccc, opacity: 0.9, transparent: true } );
        
        for (let i = -10; i < 11; i++) {
            for (let j = -10; j < 11; j++) {
                if (Math.abs(i)==10 || Math.abs(j)==10 || (i%2==0 && j%2==0)) {
                    let wall = new THREE.Mesh( wallGeo, wallMaterial );
                    wall.position.x = i * tileSize;
                    wall.position.z = j * tileSize;
                    scene.add(wall);
                }
            }
        }
    }
}