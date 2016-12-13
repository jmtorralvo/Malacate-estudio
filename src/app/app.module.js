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
    .component('bkApp', AppComponent)
    .service('UserSrv', UserSrv)
    .value('EventEmitter', payload => ({
        $event: payload
    }))
    .name;

export default AppModule;
