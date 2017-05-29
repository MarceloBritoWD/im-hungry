var modalController = function () {
  var ctrl = this;

  ctrl.finishEverything = function() {
    var overlay = document.querySelector('.overlay');
    overlay.style.display = "none";

    ctrl.prodsList = [];
    ctrl.refreshDataLocalStrorage();
    ctrl.closeBag();
  };


  ctrl.refreshDataLocalStrorage = function () {
    var localStrProdslist = JSON.stringify(ctrl.prodsList);
    localStorage.setItem("prodsList", localStrProdslist);
  };


  ctrl.closeBag = function() {
    ctrl.bagFull = document.querySelector('.bag-full');
    ctrl.bagBtn = document.querySelector('.btn-open-bag');

    ctrl.bagFull.classList.add('bag-full-anim-out');
    setTimeout(function(){
      ctrl.bagBtn.style.display = "table";
      ctrl.bagBtn.classList.add('inc-bag');
    }, 950);

    setTimeout(function(){
      ctrl.bagFull.style.display = "none";
      ctrl.bagFull.classList.remove('bag-full-anim-out');
    }, 900);
  };
}

angular.module('imHungryApp').component('modal', {
  templateUrl: 'components/modal/modal.html',
  controller: modalController,
  bindings: {
    prodsList: '='
  }
});
