angular.module('imHungryApp', []);

angular.module('imHungryApp').controller('MainCtrl', function MainCtrl(productService, $scope) {
  var vm = this;

  var localStrProdslist = localStorage.getItem("prodsList");
  $scope.prodsList = JSON.parse(localStrProdslist);
  if ($scope.prodsList === null) {
    $scope.prodsList = [];
  }

  $scope.categories = ["chinese", "burgers", "salad", "cake", "pizza"];

  $scope.selectedGroup = '';
  $scope.setGroup = function(group) {
    $scope.selectedGroup = group;
  }

  productService.getProducts().then(function(response) {
    $scope.products = response.data.food;
  });
});


angular.module('imHungryApp').filter('isArtGroup', function(){
  return function(values, groupId) {
    if(!groupId || groupId === "all" ) {
      return values; // initially don't filter
    }
    return values.filter(function(value){// filter when we have a selected groupId
      return value.cuisine === groupId;
    })
  }
});
