class game {
    
    constructor() {
        console.log('Constructor: New game!');
        this.state = 'run';           // { setup, run, pause, over }
        
        this.player1 = new player();
        scene.add(this.player1.pawn);
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

}