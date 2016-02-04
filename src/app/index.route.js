export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/tood-quote',
      templateUrl: 'app/tood/main.html',
      controller: 'ToodMainController',
      controllerAs: 'main'
    });

  $urlRouterProvider.otherwise('/');
}
