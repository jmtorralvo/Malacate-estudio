/* jshint esversion:6 */

import controller from './card.controller';

const CardComponent = {
    controller,
    bindings: {
        ngModel: '<',
        onChangeCard: '&'
    },
    templateUrl: 'app/cards/single-card/card.component.html'
};

export default CardComponent;
