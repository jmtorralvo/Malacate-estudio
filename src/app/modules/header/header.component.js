//require('./header.component.scss');
import controller from './header.controller';

const HeaderComponent = {
    controller,
    bindings : {
        open: '=',
        onChangeNav : '&'
    },
    templateUrl: './app/modules/header/header.component.html'
};


export default HeaderComponent;
