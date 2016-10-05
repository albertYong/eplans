angular.module('app.controllers', [])

.controller('newProfileCtrl', function($scope, $location, $state, $stateParams, $ionicHistory, User) {
  $ionicHistory.nextViewOptions({
    disableBack: true
  });
  console.log('man was here');
  $state.params.uid = firebase.auth().currentUser.uid;
  console.log($state.params.uid);
  var email = firebase.auth().currentUser.email;

  $scope.uploadPro1 = function(){
    var Fullname = document.getElementById("fullname").value;
    var Dob = document.getElementById("DOB").value;
    var Address = document.getElementById("Address").value;
    var PhoneNumber = document.getElementById("Phone Number").value;
    var Company = document.getElementById("Company").value;
    var Department = document.getElementById("Department").value;
    var Position = document.getElementById("Position").value;

    firebase.database().ref('users/' + $state.params.uid).set({
      fullname: Fullname,
      dob: Dob,
      address: Address,
      phonenumber: PhoneNumber,
      company: Company,
      department: Department,
      position: Position,
      email : email,

    });
    User.refresh();
    $state.go('tabsController.profile');

  }

})


.controller('showProfileCtrl',function ($scope, $stateParams, $state, $location, $ionicHistory, User, ePlans, Group) {
  console.log('showprofile');
  console.log(User.check());

    var data = User.get();
    ePlans.getData();
    Group.getData();
    console.log("lo"+data.address);
  $scope.fullname = data.fullname;
  $scope.dob = data.dob;
  $scope.address = data.address;
  $scope.phonenumber = data.phonenumber;
  $scope.company = data.company;
  $scope.department = data.department;
  $scope.position = data.position;

  $scope.edit_profile = function(){
    $state.go('tabsController.editProfile');
  }

})

.controller('editProfileCtrl', function($scope, $location, $state, $stateParams, User) {

  var data = User.get();
  var uid = data.uid;
  $scope.fullname = data.fullname;
  $scope.dob = data.dob,
  $scope.address = data.address,
  $scope.phonenumber = data.phonenumber,
  $scope.company = data.company;
  $scope.department = data.department;
  $scope.position = data.position;


    $scope.uploadPro = function(){
      var Fullname = document.getElementById("fullname").value;
      var Dob = document.getElementById("DOB").value;
      var Address = document.getElementById("Address").value;
      var PhoneNumber = document.getElementById("Phone Number").value;
      var Company = document.getElementById("Company").value;
      var Department = document.getElementById("Department").value;
      var Position = document.getElementById("Position").value;
        console.log(Address);
        console.log(data.uid);

      firebase.database().ref('users/' + data.uid).update({
      fullname: Fullname,
      dob: Dob,
      address: Address,
      phonenumber: PhoneNumber,
      company: Company,
      department: Department,
      position: Position,



    });
      User.refresh();
      $state.go('tabsController.profile');
    }

})



.controller('ePlansCtrl', function ($scope, $state, $stateParams, User, ePlans) {
  
  $scope.plans = ePlans.getLocal();
  console.log($scope.plans);
  $scope.plan = [];
  angular.forEach($scope.plans, function(value, key) {
    this.push(value.id);
  }, $scope.plan);

  console.log($scope.plan);

  $scope.redirect1 = function (epid) {
    $state.go('tabsController.ePlansDetail',{epid:epid})
    // body...
  }

  $scope.addNew = function(){
  $state.go('tabsController.ePlansDetailAdd');
  }
})
  

.controller('ePlansDetailAddCtrl', function ($scope, $state, $stateParams, User, ePlans) {
console.log("hi");



$scope.submit = function(){
  var data = User.get();
  var uid = data.uid;

  var newPid = firebase.database().ref('plans').push().key;

  firebase.database().ref('plans/'+ newPid).update({
    name: document.getElementById("name").value,
    description: document.getElementById("desc").value,
    content: document.getElementById("content").value,
    id: newPid,
    user:{id: uid}
    
  });
  ePlans.getData();
  $state.go('tabsController.ePlans');


}

})

.controller('ePlansDetailCtrl', function ($scope, $state, $stateParams, ePlans) {
console.log("hi");
$scope.plans = ePlans.getLocal();
console.log($scope.plans);
console.log($state.params.epid);
var pid = $state.params.epid;
// $scope.plan = $scope.plans.$state.params.pid;
$scope.plan = $scope.plans[pid];
$scope.name = $scope.plan.name;
$scope.desc = $scope.plan.description;
$scope.content = $scope.plan.content;
console.log($scope.plan);

$scope.edit_plan = function(){
  $state.go('tabsController.ePlansDetailEdit',{pid: pid});
}

})

.controller('ePlansDetailEditCtrl', function ($scope, $state, $stateParams, ePlans) {
console.log("hi");
var pid = $state.params.pid;
$scope.plans = ePlans.getLocal();
$scope.plan = $scope.plans[pid];
$scope.name = $scope.plan.name;
$scope.desc = $scope.plan.description;
$scope.content = $scope.plan.content;

$scope.submit = function(){
  console.log(pid);
firebase.database().ref('plans/' + pid).update({
    name: document.getElementById("name").value,
    description: document.getElementById("desc").value,
    content: document.getElementById("content").value,  
  });
ePlans.getData();
console.log(ePlans.getData());
$state.go('tabsController.ePlansDetail',{pid : pid});


}

}) 
.controller('loginCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $location, $ionicHistory, User) {

//use the User serice to check if logged in
    if(User.check() == true){
      $state.go("tabsController.profile");
    }

  $ionicHistory.nextViewOptions({
    disableBack: true
  });

  //console.log(userr.allergies);

  $scope.loginmenu = true;
  $scope.signup_btn = true;
  $scope.login_back= false;
  $scope.signupmenu = false;

    $scope.show_login = function(){
      $scope.loginmenu = true;
      $scope.signup_btn = true;
      $scope.login_back= false;
      $scope.signupmenu = false;
      document.getElementById("messmess").innerHTML = '';
    }
  $scope.show_signup = function(){
      $scope.loginmenu = false;
      $scope.signup_btn = false;
    $scope.login_back= true;
      $scope.signupmenu = true;
      document.getElementById("messmess").innerHTML = '';
  }

  $scope.login = function(){

    //get username and pass from field
    var email = document.getElementById("lemail").value;
    var password = document.getElementById("lpass").value;

    if(email.length <= 5 && password.length <= 6) {
      document.getElementById("messmess").innerHTML = "Enter info please";
    }
    else{
    //sign into the app using firebase
          firebase.auth().signInWithEmailAndPassword(email, password).then(function(result) {
                console.log('result', result);

                User.check();

          }).catch(function(error) {
            document.getElementById("messmess").innerHTML = error.message;
            console.log('ERRER', error);
            var errorCode = error.code;
            var errorMessage = error.message;
           });
        }
      }
    


  $scope.signup = function(){

    //get username and pass from field
      var email = document.getElementById("semail").value;
      var password = document.getElementById("spassword").value;
      var verify = document.getElementById("sreenter").value;

      if(email.length <= 5 && password.length <= 6) {
        document.getElementById("messmess").innerHTML = "Enter info please";
      } else if(verify !== password) {
        // verify that the password and reenter are the same, also for both this and login we need to make sure there werent any errors thrown before redirecting to the next place
        document.getElementById("messmess").innerHTML = "Passwords are not the same";
      }else{
        //create a new user in the firebase system
      firebase.auth().createUserWithEmailAndPassword(email, password).then(function(result) {

        console.log('result',result);
        //var uid = angular.toJson(result.uid); obj use json function
        //$location.path('/page1/profile');


        $state.go('tabsController.newProfile');

      }).catch(function(error) {
          // Handle Errors here.
          document.getElementById("messmess").innerHTML = error.message;
          console.log('ERRER', error);
          var errorCode = error.code;
          var errorMessage = error.message;
       });

      }

  }

})


// .controller('ePlansCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// // You can include any angular dependencies as parameters for this function
// // TIP: Access Route Parameters for your page via $stateParams.parameterName
// function ($scope, $stateParams) {
//
//
// }])

.controller('groupCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
  function ($scope, $state, $stateParams, User, Group) {
  
  $scope.user = User.get();
  
  $scope.groups = Group.getLocal();
  
  
  $scope.group = [];
  angular.forEach($scope.groups, function(value, key) {
    this.push(value.gid);
  }, $scope.group);
 

  $scope.createGroup = function () {
    $state.go('tabsController.groupAdd');
  }

  $scope.redirect = function(gpid) {
    $state.go('tabsController.groupDetail',{gpid: gpid});
  }

  $scope.redirectM = function(mGid) {
    $state.go('tabsController.groupMember',{gid: mGid});
  }
})

.controller('groupAddCtrl',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
  function ($scope, $state, $stateParams, User, ePlans, Group) {
  console.log("add");
  $scope.eplans = ePlans.getLocal();

  $scope.create = function(){
    var data = User.get();
    var uid = data.uid;

    var newgid = firebase.database().ref('group').push().key;

    firebase.database().ref('group/'+ newgid).set({
      name: document.getElementById("name").value,
      description: document.getElementById("desc").value,
      gid: newgid,
      founder: uid
      
    });
    var inputElems = document.getElementsByTagName("input");
    var checkedElems = [];
    for(var i = 2; i < inputElems.length; i++){
      if(inputElems[i].checked == true ){
        checkedElems.push(inputElems[i].value);
      }
    }
    console.log(checkedElems);
    firebase.database().ref('group/' + newgid).update(
      {sharep:checkedElems}  
    );
    Group.getData();
    $state.go('tabsController.group');

  }


})

.controller('groupDetailCtrl',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
  function ($scope, $state, $stateParams, User, ePlans, Group, $ionicPopup, $timeout) {

  $scope.user = User.get();
  console.log($scope.user);
  console.log($stateParams.gpid);
  $scope.eplans = ePlans.getLocal();
  $scope.groups = Group.getLocal();
  $scope.group = $scope.groups[$stateParams.gpid];
  $scope.sharep = $scope.groups[$stateParams.gpid].sharep;
  $scope.name = $scope.group.name;
  console.log($scope.sharep);
  console.log($scope.name);
  console.log($scope.group);

    $scope.delete =function() {
    console.log($stateParams.gpid);
    firebase.database().ref('group/' + $stateParams.gpid).remove();

    Group.getData();
    $state.go('tabsController.group');
    
  }

  $scope.save = function(){
    var inputElems = document.getElementsByTagName("input");
    console.log(inputElems.length);
    var checkedElems = [];
    for(var i = 0; i < inputElems.length; i++){
      if(inputElems[i].checked == true ){
        checkedElems.push(inputElems[i].value);
      }
    }
    console.log(checkedElems);
    firebase.database().ref('group/' + $stateParams.gpid).update(
      {sharep:checkedElems}  
    );
    Group.getData();
    $state.go('tabsController.group')
  }

  $scope.showPopup = function() {
  $scope.data1 = {};

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: '<input type="email" ng-model="data1.email">',
    title: 'Enter the email address of the person',
    subTitle: 'you want to add to your group',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Add</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data1.email) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            return $scope.data1.email;
          }
        }
      }
    ]
  });

  myPopup.then(function(res) {
    console.log('Tapped!', res);
      firebase.database().ref('users').orderByChild("email").equalTo(res).once('value').then(function(data) {
        console.log(data.val());
        var data = data.val();
        var newmem = Object.keys(data)[0];
        console.log(Object.keys(data)[0]);
        if($scope.group.member == null ){
          var memUpdate = [];
        memUpdate.push(Object.keys(data)[0]);

        console.log(memUpdate);
            firebase.database().ref('group/' + $stateParams.gpid).update({
            member:memUpdate

          }); 
        }
        else{
          var memUpdate = $scope.group.member;
          memUpdate.push(Object.keys(data)[0]);
                    firebase.database().ref('group/' + $stateParams.gpid).update({
            member:memUpdate

        }); 
        }

      });
      firebase.database().ref('users').orderByChild("email").equalTo(res).once('value').then(function(data) {
                console.log(data.val());
        var data = data.val();
              if(data[Object.keys(data)[0]].memberof == null){
            var memOfUpdate = [];
            memOfUpdate.push($stateParams.gpid);
            console.log(memOfUpdate);
          firebase.database().ref('users/' + Object.keys(data)[0]).update({
            memberof:memOfUpdate
          });
        }

      else{
          
          var memOfUpdate = data[Object.keys(data)[0]].memberof;
          
          console.log("here");
          memOfUpdate.push($stateParams.gpid);
          console.log(memOfUpdate);
          firebase.database().ref('users/' + Object.keys(data)[0]).update({
            memberof:memOfUpdate

        });
      }
    });
  


        Group.getData();
        $state.go('tabsController.group');

  });

  $timeout(function() {
     myPopup.close(); //close the popup after 3 seconds for some reason
  }, 30000);
 };


})


.controller('groupMemberCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$state, $stateParams, Member) {

console.log($stateParams.gid);

Member.findGroup($stateParams.gid);
$scope.group = Member.getGroup($stateParams.gid);
console.log($scope.group);

$scope.redirect = function (pid) {
  // body...
  $state.go('tabsController.splanDetail',{pid:pid})
}

})


.controller('splanDetailCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

console.log($stateParams.pid);
  firebase.database().ref('plans/'+ $stateParams.pid).on('value', function(data) {
              $scope.plan = data.val();
            })


}])


.controller('settingsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('infoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])



.controller('logoutCtrl', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $location, User, ePlans, Group, Member) {
  User.logout();
  ePlans.logout();
  Group.logout();
  Member.logout();
  

  })
