class game {
    
    constructor(width, height) {
        console.log('Constructor: New game!');
        this.state = 'run';           // { setup, run, pause, over }
        this.board = this.createEmptyBoard(width, height);
        this.player1 = new player();
        scene.add(this.player1.pawn);
        this.spawnWalls(width, height);
        this.print();
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

    spawnWalls(width, height) {
        let wallGeo = new THREE.BoxBufferGeometry( tileSize, tileSize, tileSize );
        let wallMaterial = new THREE.MeshBasicMaterial( { color: 0xcccccc, opacity: 0.9, transparent: true } );
        
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                if (i==0 || j==0 || i==width-1 || j==height-1 || (i%2==0 && j%2==0)) {
                    let wall = new THREE.Mesh( wallGeo, wallMaterial );
                    wall.position.x = i * tileSize;
                    wall.position.z = j * tileSize;
                    scene.add(wall);
                    this.board[i][j] = 'W';
                }
            }
        }
    }

    createEmptyBoard(width, height) {
        let board = [];
        for (let i = 0; i < width; i++) {
            let row = []
            for (let j = 0; j < height; j++) {
                row.push('.');
            }
            board.push(row);
        }
        return board;
    }

    print() {
        let str = '';
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                str += this.board[i][j];
            }
            str += '\n';
        }
        console.log(str);
    }
}