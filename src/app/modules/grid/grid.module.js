import GridComponent from './grid.component';

const GridModule = angular
    .module('grid', [])
    .component('malacateGrid', GridComponent)
    .value('EventEmitter', payload => ({
        $event: payload
    }))
    .name;

export default GridModule;