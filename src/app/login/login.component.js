/* jshint esversion:6 */
import controller from './login.controller';

const LoginComponent = {
  controller,
  templateUrl: 'app/login/login.component.html',
  bindings: {
      onUserModified: '&'
  }
};

export default LoginComponent;
