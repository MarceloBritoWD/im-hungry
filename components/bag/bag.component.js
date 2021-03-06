/*
* Controller of the bag component
*/
var bagController = function () {
  var ctrl = this;

  /*
  * Calculate the quantity of items in the bag
  * @return {number} - The quantity total of items in the bag
  */
  ctrl.prodsListSize = function() {
    var quantityTotal = 0;
    for (var i = 0; i < ctrl.prodsList.length; i++) {
      quantityTotal += ctrl.prodsList[i].quantity;
    }
    return quantityTotal;
  };

  /*
  * Decrement the quantity of a item in the bag
  * @param {uuid} id - References to the object thats gonna be incremented
  */
  ctrl.incrementItem = function(id) {
    ctrl.calcPricetotal();
    for (var i = 0; i < ctrl.prodsList.length; i++) {
      if (ctrl.prodsList[i].id === id) {
        ctrl.prodsList[i].quantity += 1;
        ctrl.refreshDataLocalStrorage();
      }
    };

  };

  /*
  * Decrement the quantity of a item in the bag
  * @param {uuid} id - References to the object thats gonna be decremented
  */
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

  /*
  * Calculate the sum of the prices of the items in the bag
  * @return {number} - The sum of the prices
  */
  ctrl.calcPricetotal = function() {
    var priceTotal = 0;
    for (var i = 0; i < ctrl.prodsList.length; i++) {
      priceTotal += ctrl.prodsList[i].price * ctrl.prodsList[i].quantity;
    }
    return priceTotal;
  }

  /*
  * Refresh the data on localStorage.
  */
  ctrl.refreshDataLocalStrorage = function () {
    var localStrProdslist = JSON.stringify(ctrl.prodsList);
    localStorage.setItem("prodsList", localStrProdslist);
  };

  /*
  * Open the modal with the message of success
  */
  ctrl.proceedToCheckout = function() {
    var overlay = document.querySelector('.overlay');
    overlay.style.display = "block";
  };

  /*
  * Open the bagFull with all details of the purchase.
  */
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

  /*
  * Close the bagFull with all details of the purchase.
  */
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
