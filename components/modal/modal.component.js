var modalController = function () {
  var ctrl = this;

  ctrl.finishEverything = function() {
    var overlay = document.querySelector('.overlay');
    overlay.style.display = "none";

    ctrl.prodsList = [];
    ctrl.refreshDataLocalStrorage();
    location.reload();
  };

  ctrl.refreshDataLocalStrorage = function () {
    var localStrProdslist = JSON.stringify(ctrl.prodsList);
    localStorage.setItem("prodsList", localStrProdslist);
  };
}

angular.module('imHungryApp').component('modal', {
  templateUrl: 'components/modal/modal.html',
  controller: modalController,
  bindings: {
    prodsList: '='
  }
});
