import angular from 'angular';
import uiRouter from 'angular-ui-router'; 

import AppRoutesConfig from './app.routes';
import NavigationModule from './modules/navigation/navigation.module';
import HeaderModule from './modules/header/header.module';
import GridModule from './modules/grid/grid.module';


import AppComponent from './app.component'; 

/** @ngInject */
const AppModule = angular

    .module('app', [NavigationModule, HeaderModule, GridModule, uiRouter])
    .config(AppRoutesConfig)
    .component('malacateApp', AppComponent)
    .value('EventEmitter', payload => ({
        $event: payload
    }))
    .name;

export default AppModule;
