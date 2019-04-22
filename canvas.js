
if (WEBGL.isWebGLAvailable() === false) {
    document.body.appendChild(WEBGL.getWebGLErrorMessage());
}

// SETTINGS
const maxFrameRate = 30;
const tileSize = 50;

// Internal vars
var camera, scene, renderer;


// called by  <body onload="initCanvas();">
function initCanvas() {
    // camera, scene, renderer
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set( 0, 1000, 1000 );
    camera.lookAt(0,0,0);

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
    var gridHelper = new THREE.GridHelper( tileSize*20, 20 );
    scene.add( gridHelper );
    scene.add( drawLine(0, 0, 0, 1000,    0,    0, 0xff0000) );
    scene.add( drawLine(0, 0, 0,    0, 1000,    0, 0x0000ff) );
    scene.add( drawLine(0, 0, 0,    0,    0, 1000, 0x00ff00) );

    // INIT MANAGERS
    game = new game();          // Init Game Manager
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


function drawLine(x1, y, z1, x2, y2, z2, _color) {
    let lineGeometry = new THREE.Geometry();
    lineGeometry.vertices.push(new THREE.Vector3( x1, y, z1 ),new THREE.Vector3( x2, y2, z2 ));
    let lineMaterial = new THREE.LineBasicMaterial({color: _color});
    return new THREE.Line( lineGeometry, lineMaterial );
}

function createBox(x, y, z, _color) {
    let boxGeo = new THREE.BoxBufferGeometry( x, y, z );
    let boxMaterial = new THREE.MeshBasicMaterial( { color: _color, opacity: 0.5, transparent: true } );
    return new THREE.Mesh( boxGeo, boxMaterial );
}