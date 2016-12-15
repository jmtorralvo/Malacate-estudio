/* jshint esversion:6 */

function config($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            //We must tu pass $event argument to callback function if we use EventEmitter.
            template: `<bk-login on-user-modified="$ctrl.userModified($event);"></bk-login>`
                //component: 'bkLogin' // toDo: How pass parent controller callback to a component in ui-routes
        })
        .state('cards', {
            url: '/cards',
            templateUrl: './app/cards/cards-main-view.html'
        });
    $urlRouterProvider.otherwise('/login'); 
}

export default config;
