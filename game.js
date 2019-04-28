class game {
    
    constructor(width, height) {
        console.log('Constructor: New game!');
        this.width = width;
        this.height = height;
        this.state = 'run';           // { setup, run, pause, over }
        this.board = this.createEmptyBoard(width, height);
        this.spawnWalls(width, height);
        this.player = new player({position: { x:1, y:0, z:1 }});
        scene.add(this.player.pawn);
        this.players = {};
        // this.print();
    }

    update() {
    
        // console.log("frame")
        if (this.state === 'run') {
            
            // for (let i = 0; i < this.height; i++) {
            //     for (let j = 0; j < this.width; j++) {
            //         if (this.board[i][j] == 'p' || this.board[i][j] == 'o') {
            //             this.board[i][j] = '.';
            //         }
            //     }
            // }
            // this.board[this.player.position.z][this.player.position.x] = 'p';
            
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

    move(x, y, z) {
        this.player.move(x, y, z);
        backend.broadcast('playerUpdate', this.player.get());
    }

    placeBomb() {
        this.player.placeBomb();
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

    addPlayer(data) {
        let id = data.id;
        let newPlayer = new player(data);
        this.players[id] = newPlayer;
        scene.add(newPlayer.pawn);
    }

    updatePlayer(data) {
        let updPlayer = this.players[data.id];
        updPlayer.set(data);
    }

    removePlayer(id) {
        let remPlayer = this.players[id];
        scene.remove(remPlayer.pawn);
        delete this.players[id]
    }
}