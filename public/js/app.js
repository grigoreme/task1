function dump(obj) { //debuging var_dump
    var out = '';
    for (var i in obj) {
        out += i + ": " + obj[i] + "\n";
    }

    //alert(out);

    // or, if you wanted to avoid alerts...

    var pre = document.createElement('pre');
    pre.innerHTML = out;
    document.body.appendChild(pre)
}

var app = angular.module("laboratory", ['ngRoute', 'ngAnimate','ngMessages','ngStorage'])
.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/home',{
      templateUrl: 'views/home.html',
      controller: 'rootCtrl'
  })
  .when('/Add',{
    templateUrl: 'views/add.html',
    controller: 'addCtrl'
  })
  .when('/Edit/:item',{
    templateUrl: 'views/add.html',
    controller: 'editCtrl'
  }).otherwise({
    redirectTo: '/home'
  });

}])
.controller("myCtrl", function($scope, $localStorage, $routeParams) {
  $scope.$storage = $localStorage.$default({
  experiments: []
  })
  this.myExperiment = {name:"test123"};
    $scope.removeItem = function (x) {
        $scope.errortext = "";
        $scope.$storage.experiments.splice(x, 1);
    }
}).controller('addCtrl', function($scope) {
    $scope.step="Insert";
    this.name = 'addCtrl';
  }).controller('editCtrl', function($scope,$routeParams) {
      //$scope.tval=$scope.$storage.experiments[$routeParams.item].Name; //tval = name of selected item
      $scope.step="Update";
      this.name = 'addCtrl';
      this.params = $routeParams;
    }).controller('experimentAdd', function($scope, $routeParams){
      $scope.myExperiment = {
      submit: function() {
          $scope.errortext = "";
          if (!$scope.myExperiment.name) {return;}

          if (!$scope.myExperiment.description) {return;}

          var date = new Date();
          date = date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear();

          //if($routeParams.item) if we have item (ID) argument
          if(!$routeParams.item){
            var temp = {
              "Index": $scope.$storage.experiments.Index+1,
              "Name" : $scope.myExperiment.name,
              "createDate": date,
              "lastUpdate": date,
              "Description" : $scope.myExperiment.description
            };

          $scope.$storage.experiments.push(temp);
        }else{
          var temp = {
            "Index": $scope.$storage.experiments[$routeParams.item].Name,
            "Name" : $scope.myExperiment.name,
            "createDate": $scope.$storage.experiments[$routeParams.item].createDate,
            "lastUpdate": date,
            "Description" : $scope.myExperiment.description
          };
          $scope.$storage.experiments[$routeParams.item] = temp;
        }
      }
    };
  });
