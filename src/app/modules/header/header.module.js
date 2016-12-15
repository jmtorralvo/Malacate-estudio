import HeaderComponent from './header.component';

const HeaderModule = angular
    .module('header', [])
    .component('malacateHeader', HeaderComponent)
    .value('EventEmitter', payload => ({
        $event: payload
    }))
    .name;

export default HeaderModule;