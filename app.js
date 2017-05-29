angular.module('imHungryApp', []);

angular.module('imHungryApp').controller('MainCtrl', function MainCtrl(mainService, $scope) {
  var vm = this;

  var localStrProdslist = localStorage.getItem("prodsList");
  $scope.prodsList = JSON.parse(localStrProdslist);
  if ($scope.prodsList === null) {
    $scope.prodsList = [];
  }

  $scope.selectedGroup = '';
  $scope.setGroup = function(group) {
    $scope.selectedGroup = group;
  }

  mainService.getPosts().then(function(response) {
    $scope.products = response.data.food;
    console.log($scope.products);
  });
});


angular.module('imHungryApp').filter('isArtGroup', function(){
  return function(values, groupId) {
    console.log("values " + values)
    console.log("groupId " + groupId)
    if(!groupId) {
      return values; // initially don't filter
    }
    return values.filter(function(value){// filter when we have a selected groupId
      return value.cuisine === groupId;
    })
  }
})





angular.module('imHungryApp').service('mainService', function($http) {
  this.getPosts = function() {
    return $http.get('data/menu.json');
  };
});
