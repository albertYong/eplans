angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('tabsController.newProfile', {
    url: '/newProfile',
    cache: false,
    views: {
    'tab1': {
      templateUrl: 'templates/newProfile.html',
      controller: 'newProfileCtrl'
      }
    }
  })

  .state('tabsController.profile', {
    url: '/profile',
    cache: false,
    views: {
      'tab1': {
        templateUrl: 'templates/profile.html',
        controller: 'showProfileCtrl'
      }
    }
  })

  .state('tabsController.editProfile', {
    url: '/editProfile',
    cache:false,
    views: {
        'tab1': {
          templateUrl: 'templates/editProfile.html',
          controller: 'editProfileCtrl'
        }
      }
  })

  .state('tabsController.ePlans', {
    url: '/eplans',
    cache: false,
    views: {
      'tab4': {
        templateUrl: 'templates/ePlans.html',
        controller: 'ePlansCtrl',
      }

    }
  })

  .state('tabsController.ePlansDetail', {
    url: '/eplans/:pid',
    cache: false,
    views: {
      'tab4': {
        templateUrl: 'templates/ePlansDetail.html',
        controller: 'ePlansDetailCtrl'
      }
    }
  })

  .state('tabsController.ePlansDetailEdit', {
    url: '/eplans/:pid/edit',
    cache: false,
    views: {
      'tab4': {
        templateUrl: 'templates/ePlansDetailEdit.html',
        controller: 'ePlansDetailEditCtrl'
      }
    }
  })

  .state('tabsController.ePlansDetailAdd', {
    url: '/eplans/add',
    cache:false,
    views: {
      'tab4': {
        templateUrl: 'templates/ePlansDetailAdd.html',
        controller: 'ePlansDetailAddCtrl'
      }
    }
  })

  .state('tabsController.group', {
    url: '/group',
    cache:false,
    views: {
      'tab2': {
        templateUrl: 'templates/group.html',
        controller: 'groupCtrl'
      }
    }
  })

  .state('tabsController.groupDetail', {
    url: '/group/:gid',
    cache:false,
    views: {
      'tab2': {
        templateUrl: 'templates/groupdetail.html',
        controller: 'groupDetailCtrl'
      }
    }
  })

    .state('tabsController.groupAdd', {
    url: '/group/add',
    cache:false,
    views: {
      'tab2': {
        templateUrl: 'templates/newGroup.html',
        controller: 'groupAddCtrl'
      }
    }
  })

    .state('tabsController.groupMember', {
    url: '/groups/member/:gid',
    cache:false,
    views: {
      'tab2': {
        templateUrl: 'templates/groupMember.html',
        controller: 'groupMemberCtrl'
      }
    }
  })

    .state('tabsController.splanDetail', {
    url: '/groups/members/:pid',
    cache:false,
    views: {
      'tab2': {
        templateUrl: 'templates/splanDetail.html',
        controller: 'splanDetailCtrl'
      }
    }
  })


  .state('tabsController.settings', {
    url: '/settings',
    views: {
      'tab5': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })

  .state('tabsController.info', {
    url: '/info',
    views: {
      'tab3': {
        templateUrl: 'templates/info.html',
        controller: 'infoCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })



  .state('tabsController.login', {
    url: '/login',
    cache: false,
    views: {
    'tab1': {
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
      }
    }
  })


  .state('tabsController.logout', {
    url: '/logout',
    cache: false,
    views: {
      'tab1': {
        templateUrl: 'templates/login.html',
        controller: 'logoutCtrl'
      }
    }
  })




 $urlRouterProvider.otherwise('/page/login')



});
