/* jshint esversion:6 */

function config($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: './app/sections/home.html'
        })
        .state('works', {
            url: '/works',
            templateUrl: './app/sections/works.html'
        })
    $urlRouterProvider.otherwise('/home'); 
}

export default config;
