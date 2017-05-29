/*
* Controller of the product component
*/
var productController = function() {
  var ctrl = this;

  /*
  * Add a item into the bag, refreshing the data on localStorage and throws an css3 animation.
  * @param {Object} object - The product thats gonna me added in the bag
  */
  ctrl.addItem = function (object){
    for (var i = 0; i < ctrl.prodsList.length; i++) {
      if (ctrl.prodsList[i].id === object.id) {
        ctrl.prodsList[i].quantity++;
        ctrl.refreshDataLocalStrorage();
        ctrl.addIncrementAnimation();
        return;
      }
    }
    ctrl.prodsList.push(object);
    ctrl.refreshDataLocalStrorage();
    ctrl.addIncrementAnimation();
  };

  /*
  * Refresh the data on localStorage.
  */
  ctrl.refreshDataLocalStrorage = function () {
    var localStrProdslist = JSON.stringify(ctrl.prodsList);
    localStorage.setItem("prodsList", localStrProdslist);
  };

  /*
  * Throws an animation on the button thats open the bag.
  */
  ctrl.addIncrementAnimation = function(){
    var bagBtn = document.querySelector('.btn-open-bag');
    bagBtn.classList.add('inc-bag');
    setTimeout(function() {
      bagBtn.classList.remove('inc-bag');}
    , 400);
  };
};

angular.module('imHungryApp').component('product', {
  templateUrl: 'components/product/product.html',
  controller: productController,
  bindings: {
    data: '=',
    prodsList: '='
  }
});
