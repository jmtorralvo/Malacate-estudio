import NavigationComponent from './navigation.component';

const NavigationModule = angular
    .module('navigation', [])
    .component('malacateNavigation', NavigationComponent)
    .value('EventEmitter', payload => ({
        $event: payload
    }))
    .name;

export default NavigationModule;