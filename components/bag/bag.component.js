var bagController = function () {
  var ctrl = this;

  ctrl.prodsListSize = function() {
    var quantityTotal = 0;
    for (var i = 0; i < ctrl.prodsList.length; i++) {
      quantityTotal += ctrl.prodsList[i].quantity;
    }
    return quantityTotal;
  };

  ctrl.incrementItem = function(id) {
    ctrl.calcPricetotal();
    for (var i = 0; i < ctrl.prodsList.length; i++) {
      if (ctrl.prodsList[i].id === id) {
        ctrl.prodsList[i].quantity += 1;
        ctrl.refreshDataLocalStrorage();
      }
    };

  };

  // Decrement the quantity of a object in produs-list
  ctrl.decrementItem = function(id) {
    ctrl.calcPricetotal();
    for (var i = 0; i < ctrl.prodsList.length; i++) {
      if (ctrl.prodsList[i].id === id) {
        if (ctrl.prodsList[i].quantity === 1) {
          ctrl.prodsList.splice(i, 1);
          ctrl.refreshDataLocalStrorage();
          return;
        }
        ctrl.prodsList[i].quantity -= 1;
        ctrl.refreshDataLocalStrorage();
      }
    };
  };

  // Calculate the sum of the productsList
  ctrl.calcPricetotal = function() {
    var priceTotal = 0;
    for (var i = 0; i < ctrl.prodsList.length; i++) {
      priceTotal += ctrl.prodsList[i].price * ctrl.prodsList[i].quantity;
    }
    return priceTotal;
  }

  ctrl.refreshDataLocalStrorage = function () {
    var localStrProdslist = JSON.stringify(ctrl.prodsList);
    localStorage.setItem("prodsList", localStrProdslist);
  };

  ctrl.proceedToCheckout = function() {
    var overlay = document.querySelector('.overlay');
    overlay.style.display = "block";
  };

  ctrl.bagBtn = document.querySelector('.btn-open-bag');
  ctrl.bagFull = document.querySelector('.bag-full');
  ctrl.closeBag = document.querySelector('.close-bag');

  ctrl.bagBtn.addEventListener('click', function(){
    ctrl.bagFull.style.display = "table";
    ctrl.bagFull.classList.add('bag-full-anim-in');
    ctrl.bagBtn.style.display = "none";

    setTimeout(function(){
      ctrl.bagFull.classList.remove('bag-full-anim-in');
    }, 700);
  });

  ctrl.closeBag.addEventListener('click', function(){
    ctrl.bagFull.classList.add('bag-full-anim-out');

    setTimeout(function(){
      ctrl.bagBtn.style.display = "table";
      ctrl.bagBtn.classList.add('inc-bag');
    }, 950);

    setTimeout(function(){
      ctrl.bagFull.style.display = "none";
      ctrl.bagFull.classList.remove('bag-full-anim-out');
    }, 900);
  });
}

angular.module('imHungryApp').component('bag', {
  templateUrl: 'components/bag/bag.html',
  controller: bagController,
  bindings: {
    prodsList: '='
  }
});
