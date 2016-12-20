require("./app.component.scss");

import angular from 'angular';
import uiRouter from 'angular-ui-router'; 

import AppRoutesConfig from './app.routes.js';
import NavigationModule from './modules/navigation/navigation.module';
import HeaderModule from './modules/header/header.module';


import AppComponent from './app.component'; 


const AppModule = angular
    .module('app', [NavigationModule, HeaderModule, uiRouter])
    .component('malacateApp', AppComponent)
    .value('EventEmitter', payload => ({
        $event: payload
    }))
    .name;

export default AppModule;
