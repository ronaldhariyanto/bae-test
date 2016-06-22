(function() {
  'use strict';

  angular.module('application', [
    'ui.router',
    'ngAnimate',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
  ])
    .controller('CountryCtrl', function($scope, $http, $sce){
        $scope = genericController($scope, $http, $sce);
    })
    .config(config)
    .run(run)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  function run() {
    FastClick.attach(document.body);
  }


  function genericController($scope, $http, $sce){

    $http.get('../location.json')
    .success(function(data) {

      $scope.countries = data;

      $scope.countries.forEach(function (country) {
        country.url = $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?key=AIzaSyCD-BC_rrhaP4_S52gpMsj7xgFsabueNo8&q="+country.lat+","+country.lng+"&zoom=16");
      });
      
    });

    return $scope;
  }

})();