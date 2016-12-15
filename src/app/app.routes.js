/* jshint esversion:6 */

function config($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            //We must tu pass $event argument to callback function if we use EventEmitter.
/*            template: `<bk-login on-user-modified="$ctrl.userModified($event);"></bk-login>`*/
            component: 'bkLogin' // toDo: How pass parent controller callback to a component in ui-routes
        })
    $urlRouterProvider.otherwise('/home'); 
}

export default config;
