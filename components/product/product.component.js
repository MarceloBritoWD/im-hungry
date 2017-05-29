 var productController = function() {
  var ctrl = this;


  ctrl.addItem = function (objeto){
    for (var i = 0; i < ctrl.prodsList.length; i++) {
      if (ctrl.prodsList[i].id === objeto.id) {
        ctrl.prodsList[i].quantity++;
        ctrl.refreshDataLocalStrorage();
        ctrl.addIncrementAnimation();
        return;
      }
    }
    ctrl.prodsList.push(objeto);
    ctrl.refreshDataLocalStrorage();
    ctrl.addIncrementAnimation();
  };

  ctrl.refreshDataLocalStrorage = function () {
    var localStrProdslist = JSON.stringify(ctrl.prodsList);
    localStorage.setItem("prodsList", localStrProdslist);
  };

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
