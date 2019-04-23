
if (WEBGL.isWebGLAvailable() === false) {
    document.body.appendChild(WEBGL.getWebGLErrorMessage());
}

// SETTINGS
const maxFrameRate = 30;
const tileSize = 50;
const boardWidth = 21;
const boardHeight = 11;

// Internal vars
var camera, scene, renderer;


// called by  <body onload="initCanvas();">
function initCanvas() {
    // camera, scene, renderer
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    // camera.position.set( boardWidth/2*tileSize, 1500, boardHeight*tileSize );
    // camera.lookAt(boardWidth/2*tileSize,0,boardHeight/2*tileSize);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x333333);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);

    // lights
    var ambientLight = new THREE.AmbientLight(0x606060);
    scene.add(ambientLight);
    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 0.75, 0.5).normalize();
    scene.add(directionalLight);

    // helper lines
    var gridHelper = new THREE.GridHelper( tileSize*Math.max(boardWidth,boardHeight), Math.max(boardWidth,boardHeight) );
    gridHelper.translateX(tileSize*(Math.max(boardWidth,boardHeight)-1)/2);
    gridHelper.translateY(-tileSize/2);
    gridHelper.translateZ(tileSize*(Math.max(boardWidth,boardHeight)-1)/2);
    scene.add( gridHelper );
    scene.add( drawLine(0, 0, 0, 1000,    0,    0, 0xff0000) );
    scene.add( drawLine(0, 0, 0,    0, 1000,    0, 0x0000ff) );
    scene.add( drawLine(0, 0, 0,    0,    0, 1000, 0x00ff00) );

    // INIT MANAGERS
    game = new game(boardWidth,boardHeight);          // Init Game Manager
    UI = new UI();              // Init UI Manager
    stats = new stats();        // Init Stats Manager
    backend = new backend();    // Init Backend Manager
    sound = new sound();        // Init Sound Manager
    inputs = new inputs();      // Init Inputs Manager

    // END OF INIT
    animationLoop();
}

function animationLoop() {
    setTimeout( function() {
        
        requestAnimationFrame( animationLoop );
        
    }, 1000 / maxFrameRate );
    
    game.update();
    UI.update();
    stats.update();
    backend.update();
    sound.update();
    inputs.update();
    render();
}

function render() {
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


/////////////////////////////////////////////////////////
/////              Helper Functions                //////
/////////////////////////////////////////////////////////


function drawLine(x1, y1, z1, x2, y2, z2, _color) {
    let lineGeometry = new THREE.Geometry();
    lineGeometry.vertices.push(new THREE.Vector3( x1, y1, z1 ),new THREE.Vector3( x2, y2, z2 ));
    let lineMaterial = new THREE.LineBasicMaterial({color: _color});
    return new THREE.Line( lineGeometry, lineMaterial );
}

function createBox(x, y, z, _color) {
    let boxGeo = new THREE.BoxBufferGeometry( x, y, z );
    let boxMaterial = new THREE.MeshBasicMaterial( { color: _color, opacity: 0.5, transparent: true } );
    return new THREE.Mesh( boxGeo, boxMaterial );
}