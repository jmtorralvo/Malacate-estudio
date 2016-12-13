/* jshint esversion:6 */
import angular from 'angular';
import LoginComponent from './login.component';
import LoginSrv from './login.service';

const LoginModule = angular
  .module('login', [])
  .component('bkLogin', LoginComponent)
  .service('LoginSrv', LoginSrv)
  .name;

export default LoginModule;
