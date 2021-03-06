angular.module('app.directives', [])

.directive('blankDirective', [function(){

}])

.directive('hideTabs', function($rootScope, $ionicTabsDelegate) {
  return {
    restrict: 'A',
    link: function($scope, $el) {
      $scope.$on("$ionicView.beforeEnter", function () {
        $ionicTabsDelegate.showBar(false);

      });
      $scope.$on("$ionicView.beforeLeave", function () {
        $ionicTabsDelegate.showBar(true);
      });
    }
  };
});
