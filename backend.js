// GameSparks stuff
class backend {

    constructor() {
        this.socket = this.setupWebSockets();
    }

    update() {

    }

    broadcast(event, data) {
        this.socket.emit(event, JSON.stringify(data));
    }

    setupWebSockets() {
        let self = this;
        let socket = io.connect('https://node.automaticom.cloud:9091/');
        socket.on('connect', function () {
            console.log('Socket: New connection', socket.id, game.player.name)
            game.player.id = socket.id;
            self.broadcast('playerJoined', game.player.get());
        });
        socket.on('disconnect', function () {
            console.log('Socket: Disconnected')
            self.broadcast('playerLeft', game.player.get());
            game.player.id = 0;
        });
        socket.on('event', function (data) {
            console.log('Socket event: ' + data)
        });
        socket.on('message', function (msg) {
            console.log('Socket message: ' + msg);
        });

        // Custom Events
        socket.on('playerJoined', function (data) {
            let dataObj = JSON.parse(data);
            console.log('Socket playerJoined: ' + dataObj.name);
            game.addPlayer(dataObj);
            let data2 = game.player.get();
            data2.targetID = dataObj.id;
            self.broadcast('playerPresent', data2);
        });
        socket.on('playerPresent', function (data) {
            let dataObj = JSON.parse(data);
            console.log('Socket playerPresent: ' + dataObj.name)
            game.addPlayer(dataObj);
        });
        socket.on('playerUpdate', function (data) {
            let dataObj = JSON.parse(data);
            console.log('Socket playerUpdate: ' + data)
            game.updatePlayer(dataObj);
        });
        socket.on('playerLeft', function (id) {
            console.log('Socket playerLeft: ' + id)
            game.removePlayer(id);
        });


        return socket;
    }
}