require("./app.component.scss");

import angular from 'angular';
import uiRouter from 'angular-ui-router'; 

import AppRoutesConfig from './app.routes.js';
import HeaderModule from './modules/header/header.module';


import AppComponent from './app.component'; 


const AppModule = angular
    .module('app', [HeaderModule, uiRouter])
    .component('malacateApp', AppComponent)
    .value('EventEmitter', payload => ({
        $event: payload
    }))
    .name;

export default AppModule;
