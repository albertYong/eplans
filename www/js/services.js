
angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

// handles getting and setting user data
.service('User', ['$location', '$state', function($location, $state){

  this.check = function(){
    //check localStorage
    if(!localStorage.getItem("user")) {
      //check firebase
      var auth_check = firebase.auth().currentUser;
      if(auth_check) {
        var uid = auth_check.uid;
        var user_data = firebase.database().ref('users/'+uid);
        user_data.on('value', function(data) {
          var user = data.val();
          console.log(user);
          user.uid = uid;
          localStorage.setItem("user", JSON.stringify(user));
          console.log('local' +angular.fromJson(localStorage.getItem("user")));
          $state.go('tabsController.profile');
          
        });

      } 
    } else {
      return true;
    }
  };

  this.get = function(){
    console.log('local'+localStorage.getItem("user"));
     return angular.fromJson(localStorage.getItem("user"));
    // return JSON.parse(localStorage.user);
  };

  this.refresh = function() {
    var uid = firebase.auth().currentUser.uid;
    if(uid) {
      var user_data = firebase.database().ref('users/'+uid);
      user_data.on('value', function(data) {
        var user = data.val();
        console.log(user);
        user.uid = uid;
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(user));
        console.log('local'+localStorage.getItem("user"));
      });
    }
  };

  this.logout = function() {
    var status = firebase.auth().signOut().then(function() {
      localStorage.removeItem("user");
      console.log('local'+localStorage.getItem("user"));
      $state.go('tabsController.login');
    }, function(error) {
      console.log(error);
    });
  };

}])

.service('ePlans', [function(){
  this.getData = function(){
  // {
  //   if(!localStorage.getItem("plans")) {
    console.log("epsssl");
      var user = angular.fromJson(localStorage.getItem("user"));
      var uid = user.uid;
      
      console.log(uid);
      // var user_data = firebase.database().ref('users/'+uid);
      //   user_data.on('value', function(data) {
      //     var user = data.val();
      //     user.uid = uid;
      //     localStorage.setItem("user", JSON.stringify(user));
      //     $state.go('tabsController.profile');
          
      //   });

      firebase.database().ref('plans').orderByChild("user/id").equalTo(uid).on('value', function(data) {
        console.log(data.val());
        localStorage.removeItem("plans");
        localStorage.setItem("plans", JSON.stringify(data.val()));
        console.log(angular.fromJson(localStorage.getItem("plans")));
        
      });
    
      
    // } else {
    //   console.log("lo eplan" + localStorage.getItem("ePlans"))
    //   return angular.fromJson(localStorage.getItem("plans"));
    // }
  };

  

  this.getLocal = function(){
    console.log("local");
    console.log(localStorage.getItem("plans"));
    console.log(angular.fromJson(localStorage.getItem("plans")));
    return angular.fromJson(localStorage.getItem("plans"));
  } 


  this.logout = function(){
    localStorage.removeItem("plans");
  }



}])


.service('Group', [function(){

  this.getData =function(){
    var user = angular.fromJson(localStorage.getItem("user"));
    var uid = user.uid;
    console.log(uid);

    firebase.database().ref('group').orderByChild("founder").equalTo(uid).on('value', function(data) {
      console.log(data.val());
      localStorage.removeItem("group");
      localStorage.setItem("group", JSON.stringify(data.val()));
      console.log(angular.fromJson(localStorage.getItem("group")));
        
    });
  }

  this.getLocal = function(){
    return angular.fromJson(localStorage.getItem("group"))

  }

  this.logout = function(){
    localStorage.removeItem("group");  
  }

}])


.service('Member', [function(){

  this.findGroup = function (gid) {

  firebase.database().ref('group/'+ gid).on('value', function(data) {

              localStorage.setItem("group[gid]", JSON.stringify(data.val()));
              console.log(angular.fromJson(localStorage.getItem("group[gid]")));
            })

  }

  this.getGroup = function(gid){
    return angular.fromJson(localStorage.getItem("group[gid]"));
  }

  this.logout = function () {
    localStorage.clear();
    }
}])
