angular.module('imHungryApp').service('productService', function($http) {
  this.getProducts = function() {
    return $http.get('data/menu.json');
  };
});
