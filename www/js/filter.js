angular.module('app.filter', [])

.filter('group', function(){
	return function(gid){
		  firebase.database().ref('group/'+ gid).on('value', function(data) {
		  	localStorage.setItem("filterG", JSON.stringify(data.val()));
		  	
            })
		  var filterG = angular.fromJson(localStorage.getItem("filterG"));
		  return filterG.name;
		
	}

})

.filter('founder', function(){
	return function(uid){
		  firebase.database().ref('users/'+ uid).on('value', function(data) {
		  	localStorage.setItem("filterf", JSON.stringify(data.val()));
		  	
            })
		  var filterf = angular.fromJson(localStorage.getItem("filterf"));
		  return filterf.fullname;
		
	}

})

.filter('planName', function(){
	return function(uid){
		  firebase.database().ref('plans/'+ uid).on('value', function(data) {
		  	localStorage.setItem("filterp", JSON.stringify(data.val()));
		  	
            })
		  var filterp = angular.fromJson(localStorage.getItem("filterp"));
		  return filterp.name;
		
	}

})

.filter('show', function(){
	return function(id) {
		return id;
		// body...
	}
})