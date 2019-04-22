class game {
    
    constructor() {
        console.log('new game!');
        this.state = 'setup';           // { setup, run, pause, over }
        
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