   init();
   render();

  function init(){
    scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xffffff );
	camera = new THREE.PerspectiveCamera(50, 500 / 400, 0.1, 1000);
    <!-- camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.001, 10 ); -->

    <!-- renderer = new THREE.WebGLRenderer({alpha: true, antialias: true}); -->
	renderer = new THREE.WebGLRenderer( { canvas: myCanvas } );
	renderer.setSize(300, 300);
    <!-- renderer.setSize( window.innerWidth, window.innerHeight ); -->
    <!-- document.getElementsByClassName('container')[0].appendChild( renderer.domElement ); -->

    // var loader = new THREE.JSONLoader()
    // loader.load('myo.json', function(geometry){
    //   var material = new THREE.MeshPhongMaterial( { color: 0x888899, shininess: 15, side: THREE.DoubleSide } );
		// 		mesh = new THREE.Mesh( geometry, material );
    //     mesh.rotation.x = 0.5;
    //     mesh.scale.set(0.5, 0.5, 0.5);
		// 		scene.add( mesh );
    // })

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshPhongMaterial({color: 0x888899, shininess: 15, side: THREE.DoubleSide });
    mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = 0.5;
    scene.add(mesh);

    var light = new THREE.HemisphereLight( 0xddddff, 0x808080, 0.7 );
  			light.position.set( 0, 1, 0 );
  			scene.add( light );

	var light = new THREE.DirectionalLight( 0xffffff, 0.6 );
		light.position.set( 1, 1, 1 );
		scene.add( light );

	var light = new THREE.DirectionalLight( 0xffffff, 0.4 );
		light.position.set( 1, -1, 1 );
		scene.add( light );

    camera.position.z = 5;
  }

  function render(){
      requestAnimationFrame(render);
	  mesh.rotation.x += 0.01;
	  mesh.rotation.y += 0.01;
      renderer.render(scene, camera);
  }