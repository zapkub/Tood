export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    // .state('tood', {
    //   url: '/tood-quote',
    //   templateUrl: 'app/tood/main.html',
    //   controller: 'ToodMainController',
    //   controllerAs: 'main',
    //   resolve:{
    //     quotes:($q,THREE,$log)=>{
    //       let loader = new THREE.TextureLoader();
    //       let imagePromise = [ ];
    //       for(var i = 1 ; i<=15 ;i++){
    //         let deferred = $q.defer();
    //         loader.load('assets/images/tood/APP_'+i+'.jpg',
    //         (texture)=>{
    //           deferred.resolve(texture);
    //         })
    //         imagePromise.push(deferred.promise);
    //       }
    //       return $q.all(imagePromise);
    //     }
    //   }
    // })
    // .state('tood-result',{
    //   url:'/tood-result',
    //   templateUrl: 'app/tood/result.html',
    //   controller:"ToodResultController",
    //   controllerAs:'result',
    //   resolve:{
    //     random:($q,$timeout)=>{
    //       let deferred = $q.defer();
    //       $timeout(()=>{
    //         deferred.resolve();
    //       },5000);
    //       return deferred.promise;
    //     }
    //   }
    //
    // })
    .state('soohuk', {
      url: '/',
      templateUrl: 'app/soohuk/main.html',
      controller: 'MainController',
      controllerAs: 'main',
      resolve:{
        bgImage:($q)=>{
          let deferred = $q.defer();


            let image = new Image();
            image.onload = ()=>{
              deferred.resolve(image);
            }
            image.src = "assets/images/soohuk/share-thumbnail-bg.jpg";
          return deferred.promise;
        }
      }
    });
    ;

   $urlRouterProvider.otherwise('/');
}
