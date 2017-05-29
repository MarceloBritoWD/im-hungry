angular.module('imHungryApp', []);

angular.module('imHungryApp').controller('MainCtrl', function MainCtrl(productService, $scope) {
  var vm = this;
  $scope.categories = ["chinese", "burgers", "salad", "cake", "pizza"];

  /*
  * Set the data off localStorage in the productList
  */
  var localStrProdslist = localStorage.getItem("prodsList");
  $scope.prodsList = JSON.parse(localStrProdslist);
  if ($scope.prodsList === null) {
    $scope.prodsList = [];
  }

  /*
  * Set the productList to filter.
  */
  $scope.selectedGroup = '';
  $scope.setGroup = function(group) {
    $scope.selectedGroup = group;
  }

  /*
  * Call the service of products and with the response, put in the scope products array.
  */
  productService.getProducts().then(function(response) {
    $scope.products = response.data.food;
  });
});


angular.module('imHungryApp').filter('productGroup', function(){
  return function(values, groupId) {
    if(!groupId || groupId === "all" ) {
      return values; // initially don't filter
    }
    return values.filter(function(value){// filter when we have a selected groupId
      return value.cuisine === groupId;
    })
  }
});
