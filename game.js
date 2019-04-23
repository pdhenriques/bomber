class game {
    
    constructor(width, height) {
        console.log('Constructor: New game!');
        this.width = width;
        this.height = height;
        this.state = 'run';           // { setup, run, pause, over }
        this.board = this.createEmptyBoard(width, height);
        this.player1 = new player(1, 0, 1);
        scene.add(this.player1.pawn);
        this.player2 = new player(width-2, 0, height-2);
        scene.add(this.player2.pawn);
        this.spawnWalls(width, height);
        this.print();
    }

    update() {
    
        // console.log("frame")
        if (this.state === 'run') {
            
            for (let i = 0; i < this.height; i++) {
                for (let j = 0; j < this.width; j++) {
                    if (this.board[i][j] == 'p1' || this.board[i][j] == 'p2') {
                        this.board[i][j] = '.';
                    }
                }
            }
            this.board[this.player1.position.z][this.player1.position.x] = 'p1';
            this.board[this.player2.position.z][this.player2.position.x] = 'p2';
            
        } else if (this.state === 'start') {
            
        } else if (this.state === 'over') {
            
        } else if (this.state === 'pause') {
            
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

    move(player, x, y, z) {
        if ( player == 1 ) {
            this.player1.move(x, y, z);
        } else
        if ( player == 2 ) {
            this.player2.move(x, y, z);
        }
    }

    placeBomb(player) {
        if ( player == 1 ) {
            this.player1.placeBomb();
        } else
        if ( player == 2 ) {
            this.player2.placeBomb();
        }
    }

    spawnWalls(width, height) {
        let wallGeo = new THREE.BoxBufferGeometry( tileSize, tileSize, tileSize );
        let wallMaterial = new THREE.MeshBasicMaterial( { color: 0xcccccc, opacity: 0.9, transparent: true } );
        
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (i==0 || j==0 || i==height-1 || j==width-1 || (i%2==0 && j%2==0)) {
                    let wall = new THREE.Mesh( wallGeo, wallMaterial );
                    wall.position.x = j * tileSize;
                    wall.position.z = i * tileSize;
                    scene.add(wall);
                    this.board[i][j] = 'W';
                }
            }
        }
    }

    createEmptyBoard(width, height) {
        let board = [];
        for (let i = 0; i < height; i++) {
            let row = []
            for (let j = 0; j < width; j++) {
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