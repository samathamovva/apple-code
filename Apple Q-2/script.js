// Instantiate the app, the 'myApp' parameter must 
// match what is in ng-app
var myApp = angular.module('myApp', ['ngAnimate','ui.bootstrap','angular-confirm']);

// Create the controller, the 'buddies' parameter 
// must match an ng-controller directive
myApp.controller('buddies', function ($scope,$http,$confirm) {
            $scope.sort = {
              active: '',
              descending: undefined
            }//sort
            $scope.changeSorting = function(column) {
              var sort = $scope.sort;
              if (sort.active == column) {
                  sort.descending = !sort.descending;       
              } else {
                  sort.active = column;
                  sort.descending = false;
              }
            };
            $scope.getIcon = function(column) {                    
                var sort = $scope.sort;           
                if (sort.active == column) {
                  return sort.descending
                    ? 'glyphicon-chevron-up'
                    : 'glyphicon-chevron-down';
                }
                 
                return 'glyphicon-chevron-down';
            }


  // Define an array of Toddler objects
  $http.get('buddies.json').then(function(response){
    if(response.status =200 && response.data.buddies.length >0){
      $scope.buddies = response.data.buddies;     
       $scope.closeAllBuddies = []; // this is the array which holds the extra info
        for(i = 0 ; i < $scope.buddies.length;i++){
          $scope.closeAllBuddies[i] = false; 
        }
    }

  })
 

  //below function
  $scope.showMoreDetails=function(index,userName){
    //flushing put any previously exapanded data.
    for(i = 0 ; i < $scope.buddies.length;i++){
        $scope.closeAllBuddies[i] = false; 
      }
    
      //opening only selected data
      $scope.test =!$scope.test;
    $scope.closeAllBuddies[index+''+userName] = true;

  };

  $scope.deleteBuddy = function(index,userName){
    $confirm({
    text: "Are you sure you want to Delete ",
    title: "Delete it",
    ok: "Yes",
    cancel: "No"
    }).then(function () {
      angular.forEach($scope.buddies,function(buddyObj,buddyIndex){
      if(buddyObj.userName === userName){
        $scope.buddies.splice(buddyIndex, 1);
        return;
      }
    });
  });
    
  }

      
});