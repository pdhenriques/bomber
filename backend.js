// GameSparks stuff
class backend {

    constructor() {
        this.socket = this.setupWebSockets();
    }

    update() {

    }

    broadcast(obj) {
        this.socket.emit('event', obj);
    }

    setupWebSockets() {
        let socket = io.connect('https://node.automaticom.cloud:9091/');
        socket.on('connect', function () {
            console.log('Socket: New connection')
        });
        socket.on('disconnect', function () {
            console.log('Socket: Disconnected')
        });
        socket.on('event', function (data) {
            console.log('Socket event: ' + data)
        });
        socket.on('message', function (msg) {
            console.log('Socket message: ' + msg);
        });
        return socket;
    }
}