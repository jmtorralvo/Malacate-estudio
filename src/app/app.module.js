// require("./app.component.css");
//require('!css-loader!resolve-url-loader!sass-loader?sourceMap!./app.component.scss');

import angular from 'angular';
import uiRouter from 'angular-ui-router';

import AppRoutesConfig from './app.routes.js';

import LoginModule from './login/login.module'
import CardsModule from './cards/cards.module';
import UserSrv from './shared/user.service';

import AppComponent from './app.component';


const AppModule = angular
    .module('app', [LoginModule, CardsModule, uiRouter])
    .config(AppRoutesConfig)
    .component('malacateApp', AppComponent)
    .service('UserSrv', UserSrv)
    .value('EventEmitter', payload => ({
        $event: payload
    }))
    .name;

export default AppModule;
