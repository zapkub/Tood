export class ToodMainController {
  constructor($timeout, toastr, $rootScope, TweenMax, THREE, quotes, $log) {
    'ngInject';
    // In your main controller
    this.quotes = quotes;
    this.log = $log.log;
    this.TweenMax = TweenMax;
    $rootScope.$on('animStart', ($event, element, speed) => {
      TweenMax.set('#main-tood', {
        opacity: 0,
        scale: 0.4
      })
    });

    $rootScope.$on('animEnd', ($event, element, speed) => {
      TweenMax.to('#main-tood', 0.8, {
        opacity: 1,
        scale: 1,
        ease: Elastic.easeOut.config(1, 0.3)
      })
    });
    this.init3d();
    $timeout(() => {
      this.splash()
    }, 1000)
  }
  init3d() {
    this.renderer = new THREE.WebGLRenderer({
      alpha: true
    });
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 3000);
    this.camera.position.z = 1000;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.domElement.style.position = "absolute";
    this.renderer.domElement.style.top = 0;
    this.renderer.domElement.style.left = 0;
    this.renderer.domElement.style.opacity = 0.3;
    window.addEventListener('resize', () => {
      let width = window.innerWidth;
      let height = window.innerHeight;
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    }, false);

    var ambientLight = new THREE.AmbientLight(0xffffff);
    this.scene.add(ambientLight);
    angular.element('#tood').append(this.renderer.domElement);


    //this.scene.add(this.camera);
    _.each(this.quotes, (item) => {
      let geometry = new THREE.PlaneGeometry(1200, 700);
      let material = new THREE.MeshLambertMaterial({
        color: 'white',
        side: THREE.DoubleSide,
        map: item
      });
      let mesh = new THREE.Mesh(geometry, material);

      mesh.scale.x = 0.3;
      mesh.scale.y = 0.3;
      this.scene.add(mesh);
    })
    this.clock = new THREE.Clock();
    var animate = () => {
      requestAnimationFrame(animate);
      if(!this.isStop)
        this.camera.rotation.z += 5 * Math.PI / 180 * this.clock.getDelta();;
      this.camera.updateProjectionMatrix();
      this.render();
    }
    animate();

  }
  render() {

    this.renderer.render(this.scene, this.camera);
  }
  stopRoll(){
    this.log('stop');
    this.isStop = true;
  }
  splash() {

    _.each(this.scene.children, (mesh) => {

      let x = Math.random() * 1500 - 750;
      let y = Math.random() * 1500 - 750;
      let z = Math.random() * 300;
      let degreez = Math.random() * 180 - 90;
      let degreex = Math.random() * 30 - 15;
      let duration = Math.random() * 2 + 2;

      TweenMax.to(mesh.rotation, duration, {
        z: degreez * Math.PI / 180,
        //  x: degreex * Math.PI / 180,
        ease: Elastic.easeOut.config(1, 0.3)
      })
      TweenMax.to(mesh.position, duration, {
        x: x,
        y: y,
        z: Math.random() * 400,
        ease: Power4.easeOut
      })
    })

  }
  startRandom() {
    TweenMax.to('#main-tood', 0.3, {
      opacity: 1,
      scale: 1.2,
      repeat: -1,
      yoyo: true,
      ease: Circ.easeInOut
    })
  }
}

export class ToodResultController {
  constructor($timeout, toastr, $rootScope, TweenMax) {
    'ngInject';
    // In your main controller


  }
}
